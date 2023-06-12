from api.v1.views import app_views
from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity as jwt_id
from models.user import User
from models import storage
from api.v1 import error_handler
API = 'http://localhost:5000/api/v1'


@app_views.route('/user/request_partners', strict_slashes=False, methods=['PUT'])
@jwt_required()
@error_handler
def create_user_request():
    """
    Updates the number of partners a user requests
    """
    data = request.get_json()
    user = storage.get(User, jwt_id())
    if not user:
        return jsonify({'error': 'User not found'}), 404
    result = storage.update_user_request(user, data)
    print(result)
    return jsonify(result), 201
