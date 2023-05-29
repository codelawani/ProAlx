#!/usr/bin/python3
"""
This module contains a basic view for the github login route
"""
from flask import make_response, jsonify, request
from flask_jwt_extended import create_access_token
from api.v1.views import app_views
from os import getenv
import requests
from urllib.parse import parse_qs
from dotenv import load_dotenv, find_dotenv
import json
from uuid import uuid4
import secrets
from datetime import datetime, timedelta
load_dotenv(find_dotenv())
CLIENT_ID = getenv("GITHUB_ID")
CLIENT_SECRET = getenv("GITHUB_SECRET")
TOKEN_ENDPOINT = "https://github.com/login/oauth/access_token"
USER_ENDPOINT = "https://api.github.com/user"


@app_views.route('github/status', strict_slashes=False)
def check_login_status():
    session = request.cookies.get('github_session')
    print(request.cookies)
    print(session)
    if session:
        return jsonify({'name': 'Nico'}), 200
    else:
        return jsonify({'msg': 'failed'}), 401


@app_views.route('/github/login', strict_slashes=False)
def login():
    code = request.args.get('code')
    print(code)
    res = requests.post(
        TOKEN_ENDPOINT,
        data=dict(
            client_id=CLIENT_ID,
            client_secret=CLIENT_SECRET,
            code=code,
        )
    )
    if res.ok:
        res = parse_qs(res.content.decode('utf-8'))
        print(res)
        token = res['access_token'][0]
        res = requests.get(USER_ENDPOINT, headers=dict(
            Authorization=f"token {token}"))
        user = res.json()
        old_user_data = reload_user()
        # Check if user already exists
        # print(old_user_data)
        print(user.get('id'))
        if user.get('id') == old_user_data.get('gh_id'):
            user_data = {
                'access_token': token,
                'github_session': secrets.token_hex(16)
            }
            old_user_data.update(user_data)
            save_user(old_user_data)
            print('old_user')
        else:
            print('new_user')
            user_data = {
                'id': str(uuid4()),
                'login': user.get('login'),
                'gh_id': user.get('id'),
                'name': user.get('name'),
                'access_token': token,
                'github_session': secrets.token_hex(16)
            }
            save_user(user_data)
        print('gs', user_data['github_session'])
        access_token = create_access_token(identity=user_data['github_session'],
                                           expires_delta=timedelta(days=90))
        res = make_response({
            'access_token': access_token,
            'name': user['name']})
    else:
        print('response is', res.text)
        res = make_response({'msg': 'Login Failed'})
        res.status_code = 401
    return res


@app_views.route('/github/logout', strict_slashes=False, methods=['POST'])
def logout():
    """Logout user"""
    if 'access_token' not in request.headers:
        return jsonify({'msg': 'Missing Authorization Header'}), 401
    res = make_response({'msg': 'Logout Successful'})
    return res


file = 'User.json'


def save_user(data):
    with open(file, 'w') as f:
        json.dump(data, f, indent=2)


def reload_user():
    try:
        with open(file) as f:
            data = json.load(f)
    except FileNotFoundError:
        data = {}
    return data
