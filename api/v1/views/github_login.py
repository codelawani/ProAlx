#!/usr/bin/python3
"""
This module contains a basic view for the github login route
"""
from flask import jsonify, abort, redirect, request
from api.v1.views import app_views
from os import getenv
import requests
from urllib.parse import parse_qs
from dotenv import load_dotenv, find_dotenv
import json
from uuid import uuid4
import secrets
load_dotenv(find_dotenv())
CLIENT_ID = getenv("GITHUB_ID")
CLIENT_SECRET = getenv("GITHUB_SECRET")
TOKEN_ENDPOINT = "https://github.com/login/oauth/access_token"
USER_ENDPOINT = "https://api.github.com/user"
# app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "*"}})


# @app_views.route('/', strict_slashes=False)
# def index():
#     return jsonify({'msg': 'success'})


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
        token = res['access_token'][0]
        res = requests.get(USER_ENDPOINT, headers=dict(
            Authorization=f"token {token}"))
        user = res.json()
        old_user_data = reload_user()
        # Check if user already exists
        print(old_user_data)
        print(user.get('id'))
        if user.get('id') == old_user_data.get('gh_id'):
            user_data = {
                'access_token': token,
                'session_token': secrets.token_hex(16)
            }
            old_user_data.update(user_data)
            save_user(old_user_data)
            print(user_data)
            print('old_user')
        else:
            print(user)
            print('new_user')
            user_data = {
                'id': str(uuid4()),
                'login': user.get('login'),
                'gh_id': user.get('id'),
                'name': user.get('name'),
                'access_token': token,
                'session_token': secrets.token_hex(16)
            }
            save_user(user_data)
        res = jsonify({'session': user_data['session_token']})
    else:
        print('response is', res.text)
        res = jsonify({'msg': 'Failed'})
    res.headers.add('Access-Control-Allow-Origin', '*')
    return res


@app_views.route('/github/logout', strict_slashes=False, methods=['POST'])
def logout():
    auth = request.headers.get('Authorization')
    token = auth.split(' ')[1]
    print(token)
    user_data = reload_user()
    if token == user_data.get('session_token'):
        user_data.pop('session_token')
        save_user(user_data)
        return jsonify({'msg': 'success'}), 200
    else:
        return jsonify({'msg': 'failed'}), 401


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


# if __name__ == '__main__':
#     app.run(debug=1, port=5000)
