#!/usr/bin/python3
"""
This module contains a basic view for the wakatime login route
"""
from flask import make_response, jsonify, request
from api.v1.views import app_views
from os import getenv
import requests
from urllib.parse import parse_qs
from dotenv import load_dotenv, find_dotenv
import json
import secrets
load_dotenv(find_dotenv())
CLIENT_ID = getenv("WAKATIME_ID")
CLIENT_SECRET = getenv("WAKATIME_SECRET")
TOKEN_ENDPOINT = "https://wakatime.com/oauth/token"
# USER_ENDPOINT = "https://api.wakatime.com/users/"


@app_views.route('/wakatime/status', strict_slashes=False)
def check_wk_status():
    wk_session = request.cookies.get('wk_session')
    if wk_session:
        return jsonify({'msg': 'connected'})
    else:
        return jsonify({'msg': 'disconnected'}), 401


@app_views.route('/wakatime/connect', strict_slashes=False)
def wk_connect():
    code = request.args.get('code')
    print(code)
    res = requests.post(
        TOKEN_ENDPOINT,
        data=dict(
            client_id=CLIENT_ID,
            client_secret=CLIENT_SECRET,
            grant_type='authorization_code',
            redirect_uri='http://localhost:5173/dashboard',
            code=code,
        )
    )
    if res.ok:
        res = parse_qs(res.content.decode('utf-8'))
        print(res)
        print('-'*20)
        token = res['access_token'][0]
        # new_res = requests.get(USER_ENDPOINT, headers=dict(
        #     Authorization=f"token {token}"))
        # data = new_res.json()
        user = reload_user()
        user.update({
            'wk_access_token': token,
            'wk_expires_in': res['expires_in'][0],
            'wk_refresh_token': res['refresh_token'][0],
            'wk_id': res['uid'][0],
            'wk_session': secrets.token_hex(16)
        })
        save_user(user)
        res = make_response({'msg': 'success'})
        res.set_cookie('wk_session', user['wk_session'])
    else:
        print('response is', res.text)
        res = jsonify({'msg': 'Failed'})
    return res


@app_views.route('/wakatime/disconnect', strict_slashes=False, methods=['POST'])
def wk_disconnect():
    wk_session = request.cookies.get('wk_session')
    user_data = reload_user()
    if wk_session == user_data.get('wk_session'):
        # user_data.pop('wk_session')
        save_user(user_data)
        res = make_response({'msg': 'success'})
        res.delete_cookie('wk_session')
        return res
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
