from api.v1.views import app_views
from flask import jsonify, request, abort
from models.user import User
from models import storage
from datetime import datetime
from sqlalchemy.exc import SQLAlchemyError


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


@app_views.route('/users/<id>/details', strict_slashes=False)
def get_user(id):
    """ Retrieves a user's details"""
    user = storage.get_user_public_data(id)
    print(user)
    if not user:
        abort(404)
    return jsonify(user.to_dict())


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
    if not request.get_json():
        abort(400, description="Not a JSON")

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
    # Check if the request contains GitHub login data
    if all(key in data for key in expected_gh_keys):
        instance = User(**data)
    else:
        return jsonify({'err': 'incomplete data'}), 401
    instance_dict = instance.to_dict()
    instance_dict.pop('gh_access_token', None)
    instance_dict.pop('wk_access_token', None)
    instance.save()
    return jsonify(instance_dict), 201


@app_views.route('/users/<user_id>', methods=['PUT'], strict_slashes=False)
def put_user(user_id):
    """
    Updates a user
    """
    user = storage.get(User, user_id)
    if not user:
        abort(404, description="User not found")

    if not request.is_json:
        abort(400, description="Invalid JSON")

    try:
        data = request.get_json()
        for key, value in data.items():
            if key not in ['id', 'created_at', 'updated_at']:
                if key == 'waka_token_expires':
                    value = datetime.strptime(value, '%Y-%m-%dT%H:%M:%SZ')
                print(value)
                setattr(user, key, value)

        storage.save()

    except ValueError as e:
        abort(400, description="Invalid data format: " + str(e))

    except SQLAlchemyError as e:
        storage.session.rollback()
        error_message = "Database error: " + str(e.__class__.__name__)
        abort(500, description=error_message)
    except Exception as e:
        error_message = 'Unknown error occured' + str(e)
        print(error_message)
        abort(500, description=error_message)

    return jsonify(user.to_dict()), 200


@app_views.route('/users/needs_partners', strict_slashes=False)
def get_users_who_needs_partners():
    """
    Retrieves the list of all users that need partners
    Returns:
        list of users(empty list if no users need partners)
    """
    users = storage.get_users_who_needs_partners()
    return jsonify(users)


@app_views.route('users/leaderboard', strict_slashes=False)
def get_overall_leaderboard():
    """
    Retrieves overall leaderboard
    """
    users = storage.get_overall_leaderboard()
    return jsonify(users)
