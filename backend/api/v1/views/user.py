from api.v1.views import app_views
from flask import jsonify, request, abort
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from models.user import User
from models import storage
from models.engine.DBExceptions import DatabaseException
import requests
from logs import logger
API = 'http://localhost:5000/api/v1'


def error_handler(e, msg=None):
    """
    A function to handle errors in the application.

    Parameters:
    - e (Exception): The exception to be handled.
    - msg (str): The error message to be returned. If None, it defaults to e.client_msg.

    Returns:
    - A JSON object with the error message (str) and the status code (int).
    """
    if not msg:
        msg = e.client_msg
    return jsonify({'error': msg}), e.code


@app_views.route('/users', strict_slashes=False)
def get_users():
    """
    Retrieves all users from storage and returns them in JSON format.
    Returns:
        A JSON representation of a list of dictionaries, each representing a user.
    """
    try:
        all_users = storage.all(User).values()
        list_users = []
        for user in all_users:
            list_users.append(user.to_dict())
        return jsonify(list_users)
    except DatabaseException as e:
        return error_handler(e)


@app_views.route('/user/daily_commits', strict_slashes=False)
@jwt_required()
def get_users_daily_commits():
    """
    This function retrieves the daily commit statistics of a user from the GitHub API.
    It requires a valid JWT token to be passed in the request headers for authentication.

    Args:
        None

    Returns:
        If successful, a JSON object containing the daily commit statistics of the user.
        Otherwise, a JSON object with an error message and a 404 status code.
    """
    user_id = get_jwt_identity()
    res = requests.get(f'{API}/users/{user_id}/git_stats')
    if res.ok:
        return res.json()
    else:
        return jsonify({'err': 'unable to fetch user github stats'}), 404


@app_views.route('/users/<id>/details', strict_slashes=False)
def get_user(id):
    """
    Retrieves the public data of a user with the given id.

    Args:
        id (int): the id of the user to retrieve data for.

    Returns:
        JSON: the public data of the user as a JSON object.

    Raises:
        404 Error: if no user with the given id exists.
        DatabaseException: if there is an error retrieving the data from the database.
    """
    try:
        user = storage.get_user_public_data(id)
        print(user)
        if not user:
            abort(404)
        return jsonify(user)
    except DatabaseException as e:
        return error_handler(e)


@app_views.route('/users/<user_id>', methods=['DELETE'], strict_slashes=False)
def delete_user(user_id):
    """
    Deletes a user from the system.

    Args:
        user_id (int): The ID of the user to be deleted.

    Returns:
        A tuple containing an empty JSON object and a status code of 200 on success.
        Otherwise, it returns the result of the error_handler function.
    """
    try:
        user = storage.get(User, user_id)

        if not user:
            abort(404)

        user.delete()

        return jsonify({}), 200
    except DatabaseException as e:
        return error_handler(e)


@app_views.route('/user/profile', strict_slashes=False)
@jwt_required()
def get_user_profile():
    return jsonify(storage.get_user_public_data(get_jwt_identity()))


@app_views.route('/users', methods=['POST'], strict_slashes=False)
def create_user():
    """
    Creates a user
    user_data = {
            'github_login': user.get('login'),
            'github_uid': user.get('id'),
            'name': user.get('name'),
            'photo_url': user.get('avatar_url'),
            'twitter_username': user.get('twitter_username'),
            'gh_access_token': token,
            'github_session': True
        }
    """
    if not request.is_json:
        return jsonify({'error': 'Invalid JSON format'}), 400

    data = request.get_json()
    expected_gh_keys = [
        'github_login',
        'github_uid',
        'gh_access_token',
        'name',
        'photo_url',
        'twitter_username',
        'github_session'
    ]
    if not all(key in data for key in expected_gh_keys):
        return jsonify({'error': 'Incomplete data'}), 400

    instance = User(**data)
    instance_dict = instance.to_dict()

    try:
        storage.new(instance)
        return jsonify(instance_dict), 201
    except DatabaseException as e:
        return error_handler(e)


# @app_views.route('/users/<user_id>', methods=['PUT'], strict_slashes=False)
# @jwt_required()
# def update_user(user_id):
#     """
#     Updates an existing user in the database.

#     :param user_id: The ID of the user to update.
#     :type user_id: str
#     :return: A JSON object containing the updated user information if the
#         update was successful, or an error message otherwise.
#     :rtype: json
#     """
#     if user_id != get_jwt_identity():
#         return jsonify(error="Unauthorized"), 401
#     user = storage.get(User, user_id)
#     if not user:
#         return jsonify(error="User not found"), 404
#     if not request.is_json:
#         return jsonify(error="Invalid JSON"), 400
#     data = request.get_json()
#     user_dict = storage.set_user_data(user, data)
#     if not user_dict:
#         return jsonify(error="Invalid data"), 400
#     try:
#         return jsonify(user_dict), 200
#     except DatabaseException as e:
#         return error_handler(e)


@app_views.route('/user', methods=['PUT'], strict_slashes=False)
@jwt_required()
def put_user():
    """
    Updates an existing user in the database.

    :return: A JSON object containing the updated user information if the
        update was successful, or an error message otherwise.
    :rtype: json
    """
    user = storage.get(User, get_jwt_identity())
    if not user:
        return jsonify(error="User not found"), 404
    if not request.is_json:
        return jsonify(error="Invalid JSON"), 400
    data = request.get_json()
    user_dict = storage.set_user_data(user, data)
    if not user_dict:
        return jsonify(error="Invalid data"), 400
    try:
        return jsonify(user_dict), 200
    except DatabaseException as e:
        return error_handler(e)


@app_views.route('/user/cohort', methods=['PUT'], strict_slashes=False)
@jwt_required()
def update_user_cohort():
    """
    Updates the cohort of a user.
    Args:
        user_id (int): The ID of the user to update.
        cohort_id (int): The ID of the cohort to update the user to.
    Returns:
        A tuple containing a JSON object with the updated user information and a status code of 200 on success.
        Otherwise, it returns the result of the error_handler function.
    """
    user = storage.get(User, get_jwt_identity())
    if not user:
        return jsonify(error="User not found"), 404
    if not request.is_json:
        return jsonify(error="Invalid JSON"), 400
    data = request.get_json()
    c_number = data.get('cohort_number')
    print(c_number)
    if not c_number or c_number < 8:
        return jsonify(error="Invalid data"), 400
    c_number = storage.create_new_cohort_if_not_exists(c_number)
    setattr(user, 'cohort_number', int(c_number))
    try:
        user.save()
        public_data = {
            'name': user.name,
            'photo_url': user.photo_url,
            'github_login': user.github_login,
            'waka': user.waka_connected,
            'cohort': user.cohort_number,
        }
        print(public_data)
        token = create_access_token(
            identity=user.id, additional_claims={'user_data': (public_data)})
        return jsonify({'access_token': token}), 201
    except DatabaseException as e:
        return error_handler(e)


@app_views.route('/users/needs_partners', strict_slashes=False)
def get_users_who_needs_partners():
    """
    Retrieves the list of all users that need partners
    Returns:
        list of users(empty list if no users need partners)
    """
    try:
        users = storage.get_users_who_needs_partners()
        return jsonify(users)
    except DatabaseException as e:
        return error_handler(e)


@app_views.route('users/leaderboard', strict_slashes=False)
def get_overall_leaderboard():
    """
    Retrieves the overall leaderboard of users.

    :return: A JSON object containing the user leaderboard information.
    :raises DatabaseException: If there is an issue with retrieving the leaderboard from the database.
    """
    try:
        users = storage.get_overall_leaderboard()
        return jsonify(users)
    except DatabaseException as e:
        return error_handler(e)
