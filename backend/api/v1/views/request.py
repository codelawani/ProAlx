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


@app_views.route('/user/request_partners', strict_slashes=False, methods=['PUT'])
@jwt_required()
def create_user_request():
    """
    Updates the number of partners a user requests
    """
    try:
        data = request.get_json()
        user = storage.get(User, get_jwt_identity())
        user_dict = user.create_user_request(data)
        return jsonify(user_dict), 201
    except DatabaseException as e:
        return error_handler(e)
