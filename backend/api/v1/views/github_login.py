#!/usr/bin/python3
"""
This module contains a basic view for the github login route
"""
from os import getenv
from urllib.parse import parse_qs
from models import storage
import jwt
import requests
from api.v1.views import app_views
from dotenv import find_dotenv, load_dotenv
from flask import jsonify, make_response, request, abort
from flask_jwt_extended import (create_access_token, get_jwt_identity,
                                jwt_required)
from jwt.exceptions import DecodeError, ExpiredSignatureError, InvalidTokenError

load_dotenv(find_dotenv())
CLIENT_ID = getenv("GITHUB_ID")
CLIENT_SECRET = getenv("GITHUB_SECRET")
TOKEN_ENDPOINT = "https://github.com/login/oauth/access_token"
USER_ENDPOINT = "https://api.github.com/user"
key = getenv('JWT_SECRET_KEY')
api = 'http://localhost:5000/api/v1'

# just gonna leave this here 🙃
@app_views.route('github/status', strict_slashes=False)
@jwt_required()
def check_login_status():
    authorization_header = request.headers.get('Authorization')
    token = authorization_header.split(' ')[1]
    current_user_id = decode_jwt_token(token)
    print(current_user_id)
    if current_user_id:
        return jsonify({'user_id': current_user_id}), 200
    else:
        return jsonify({'msg': 'failed'}), 401


def get_github_user_data(token):
    """Retrieve GitHub user data using the provided access token"""
    headers = {'Authorization': f"token {token}"}
    res = requests.get(USER_ENDPOINT, headers=headers)
    if res.ok:
        print('successfull got user github data')
        return res.json()
    else:
        res.raise_for_status()  # Raise an exception for non-2xx status codes
        # abort(404)
        print('user github data not found')


def create_user(user_data):
    """Create a new user if not exists using the provided user data"""
    user_id = storage.github_uid_exists(user_data.get('github_uid'))
    print(user_id)
    if user_id:
        user_data.update({'id': user_id})
        print(user_data)
        return user_data
    res = requests.post(f'{api}/users', json=user_data)
    if res.ok:
        return res.json()
    else:
        res.raise_for_status()
        print('create user failed')


@app_views.route('/github/login', strict_slashes=False)
def login():
    code = request.args.get('code')
    res = requests.post(
        TOKEN_ENDPOINT,
        data=dict(
            client_id=CLIENT_ID,
            client_secret=CLIENT_SECRET,
            code=code,
        )
    )
    try:
        res.raise_for_status()
        parsed_res = parse_qs(res.content.decode('utf-8'))
        token = parsed_res['access_token'][0]
        user = get_github_user_data(token)
        # print(user)
        user_data = {
            'github_login': user.get('login'),
            'github_uid': user.get('id'),
            'name': user.get('name'),
            'photo_url': user.get('avatar_url'),
            'twitter_username': user.get('twitter_username'),
            'gh_access_token': token,
            'github_session': True
        }
        # Create a new user if one doesn't already exist
        print(user_data)
        created_user = create_user(user_data)
        public_user_data = {
            'name': created_user.get('name'),
            'photo_url': created_user.get('photo_url'),
            'github_login': created_user.get('github_login'),
        }
        access_token = create_access_token(
            identity=created_user['id'],
            additional_claims={'user_data': public_user_data}
        )
        res = make_response({'access_token': access_token}, 200)
        return res
    except requests.exceptions.RequestException as e:
        print('Request Exception:', e)
        return jsonify({'msg': 'Internal server error'}), 500
    except KeyError as e:
        print('KeyError:', e)
        return jsonify({'msg': 'External server error'}), 500
    except Exception as e:
        print('Exception:', e)
        return jsonify({'msg': 'Unexpected server error'}), 500

@app_views.route('/github/logout', strict_slashes=False)
@jwt_required()
def logout():
    """Logout user"""
    user = get_jwt_identity()
    storage.clear_github_session(user)
    return make_response({'msg': 'Logout Successful'})


def decode_jwt_token(token):
    """" Decode JWT token"""
    try:
        decoded_token = jwt.decode(token, key=key, algorithms=['HS256'])
        user_id = decoded_token.get('sub')
        return user_id
    except (InvalidTokenError, ExpiredSignatureError, DecodeError) as e:
        print(e)
        return None
