from api.v1.views import app_views
from flask import jsonify, request, abort, make_response
from models.cohort import Cohort
from models.user import User
from models import storage
import requests

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
    # get github data
    all_users = storage.all(User).values()
    all_users_commits = [user.get_github_data for user in all_users]
    return all_users_commits

@app_views.route('/users/<user_id>/daily_commits', strict_slashes=False)
def get_user_daily_commits(user_id):
    user = storage.get(User, user_id)
    return user.get_github_data

@app_views.route('/users/<id>', strict_slashes=False)
def get_user(id):
    """ Retrieves an user """
    user = storage.get(User, user_id)
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
def post_user():
    """
    Creates a user
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    data = request.get_json()
    instance = User(**data)
    instance.save()
    return jsonify(instance.to_dict()), 201


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
