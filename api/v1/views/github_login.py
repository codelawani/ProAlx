#!/usr/bin/python3
"""
This module contains a basic view for the github login route
"""
from flask import jsonify, abort, redirect, request, Flask
# from api.v1.views import app_views
from flask_cors import CORS
from os import getenv
import requests
from urllib.parse import urlencode, parse_qs
from dotenv import load_dotenv, find_dotenv
import json
import secrets
load_dotenv(find_dotenv())
CLIENT_ID = getenv("GITHUB_ID")
CLIENT_SECRET = getenv("GITHUB_SECRET")
TOKEN_ENDPOINT = "https://github.com/login/oauth/access_token"
USER_ENDPOINT = "https://api.github.com/user"
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/', strict_slashes=False)
def index():
    return jsonify({'msg': 'success'})


@app.route('/github/login', strict_slashes=False)
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
        print(user)
        with open('user.json', 'w') as f:
            json.dump(user, f)
        session = secrets.token_hex(16)
        res = jsonify({'session': session})
    else:
        print('response is', res.text)
        res = jsonify({'msg': 'Failed'})
    res.headers.add('Access-Control-Allow-Origin', '*')
    return res


@app.route('/github/logout', strict_slashes=False)
def logout():
    data = request.headers
    print(data)
    return 'hi'


if __name__ == '__main__':
    app.run(debug=1, port=5000)
