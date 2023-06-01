from api.v1.views import app_views
from flask import jsonify, request, abort
from models.user import User
from models import storage


@app_views.route('/users', strict_slashes=False)
def get_users():
    """
    Retrieves the list of all user objects
    or a specific user
    """
    all_users = storage.all(User).values()
    list_users = []
    for user in all_users:
        list_users.append(user.to_dict())
    return jsonify(list_users)


@app_views.route('/users/daily_commits', strict_slashes=False)
def get_users_daily_commits():
    all_users = storage.all(User).values()
    all_users_commits = [user.get_github_data for user in all_users]
    return all_users_commits


# @jwt_required
# @app_views.route('/users/<user_id>/daily_commits', strict_slashes=False)
# def get_user_daily_commits(user_id):
#     current_user_id = get_jwt_identity()
#     if current_user_id != user_id:
#         abort(401)
#     user = storage.get(User, user_id)
#     return user.get_github_data


@app_views.route('/users/<id>', strict_slashes=False)
def get_user(id):
    """ Retrieves an user """
    user = storage.get(User, id)
    user_dict = user.to_dict()
    user_dict.pop('gh_access_token', None)
    user_dict.pop('github_session', None)
    user_dict.pop('wk_access_token', None)
    if not user:
        abort(404)

    return jsonify(user_dict)


@app_views.route('/users/<user_id>', methods=['DELETE'], strict_slashes=False)
def delete_user(user_id):
    """
    Deletes a user Object
    """

    user = storage.get(User, user_id)

    if not user:
        abort(404)

    storage.delete(user)
    storage.save()

    return jsonify({}), 200


@app_views.route('/users', methods=['POST'], strict_slashes=False)
def create_user():
    """
    Creates a user
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    data = request.get_json()
    expected_gh_keys = [
        'github_login',
        'gh_access_token',
        'name',
        'photo_url',
        'twitter_username',
        'github_session'
    ]
    # Check if the request contains GitHub login data
    if all(key in data for key in expected_gh_keys):
        instance = User(
            github_login=data['github_login'],
            gh_access_token=data['gh_access_token'],
            name=data.get('name'),
            photo_url=data.get('photo_url'),
            twitter_username=data.get('twitter_username'),
            github_session=data.get('github_session')
        )
    else:
        instance = User(**data)
    instance_dict = instance.to_dict()
    instance_dict.pop('gh_access_token', None)
    instance_dict.pop('github_session', None)
    instance.save()
    return jsonify(instance_dict), 201


@app_views.route('/users/<user_id>', methods=['PUT'], strict_slashes=False)
def put_user(user_id):
    """
    Updates a user
    """
    user = storage.get(User, user_id)

    if not user:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a JSON")

    ignore = ['id', 'created_at', 'updated_at']

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(user, key, value)
    storage.save()
    return jsonify(user.to_dict()), 200


@app_views.route('/users/needs_partners', strict_slashes=False)
def get_users_who_needs_partners():
    """
    Retrieves the list of all users that need partners
    Returns:
        list of users(empty list if no users need partners)
    """
    users = storage.get_users_who_need_partners()
    return jsonify(users)
