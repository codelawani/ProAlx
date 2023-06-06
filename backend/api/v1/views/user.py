import traceback
from api.v1.views import app_views
from flask import jsonify, request, abort
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.user import User
from models import storage
from datetime import datetime
from models.engine.DBExceptions import DatabaseException
import requests
from logs import logger
API = 'http://localhost:5000/api/v1'


def error_handler(e, msg=None):
    """Returns an error message and status code"""
    if not msg:
        msg = e.client_msg
    return jsonify({'error': msg}), e.code


@app_views.route('/users', strict_slashes=False)
def get_users():
    """
    Retrieves the list of all user objects
    or a specific user
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
    """This route <was created for convenience🥲
    It fetches github stats for a user based on their token"""
    user_id = get_jwt_identity()
    res = requests.get(f'{API}/users/{user_id}/git_stats')
    if res.ok:
        return res.json()
    else:
        return jsonify({'err': 'unable to fetch user github stats'}), 404


@app_views.route('/users/<id>/details', strict_slashes=False)
def get_user(id):
    """ Retrieves a user's details"""
    try:
        user = storage.get_user_public_data(id)
        print(user)
        if not user:
            abort(404)
        return jsonify(user.to_dict())
    except DatabaseException as e:
        return error_handler(e)


@app_views.route('/users/<user_id>', methods=['DELETE'], strict_slashes=False)
def delete_user(user_id):
    """
    Deletes a user Object
    """
    try:
        user = storage.get(User, user_id)

        if not user:
            abort(404)

        user.delete()

        return jsonify({}), 200
    except DatabaseException as e:
        return error_handler(e)


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
    instance_dict.pop('gh_access_token', None)
    instance_dict.pop('wk_access_token', None)

    try:
        storage.new(instance)
        return jsonify(instance_dict), 201
    except DatabaseException as e:
        return error_handler(e)


@app_views.route('/users/<user_id>', methods=['PUT'], strict_slashes=False)
@jwt_required()
def update_user(user_id):
    """
    Updates a user
    """
    if user_id != get_jwt_identity():
        return jsonify(error="Unauthorized"), 401
    user = storage.get(User, user_id)
    if not user:
        return jsonify(error="User not found"), 404

    if not request.is_json:
        return jsonify(error="Invalid JSON"), 400
    update_err_msg = "An error occurred during user update"
    data = request.get_json()
    for key, value in data.items():
        if key in ['id', 'created_at', 'updated_at']:
            continue
        if key == 'waka_token_expires':
            value = datetime.strptime(value, '%Y-%m-%dT%H:%M:%SZ')
        if key == 'requested_partners':
            if not hasattr(user, 'requested_partners'):
                logger.exception(
                    "User does not have requested_partners attribute")
                return jsonify(error=update_err_msg), 500
            user.requested_partners.number = value
            continue
        setattr(user, key, value)
    try:
        user.save()
        return jsonify(user.to_dict()), 200
    except DatabaseException as e:
        error_handler(e)
    return jsonify(message="User updated successfully"), 200


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
    Retrieves overall leaderboard
    """
    try:
        users = storage.get_overall_leaderboard()
        return jsonify(users)
    except DatabaseException as e:
        return error_handler(e)
