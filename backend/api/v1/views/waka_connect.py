#!/usr/bin/python3
"""
This module contains a basic view for the login route
"""
from flask import jsonify, abort, redirect, request, Flask, make_response
from api.v1.views import app_views
from os import getenv
import requests
from urllib.parse import urlencode
from dotenv import load_dotenv, find_dotenv
import json
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import storage
from datetime import datetime
from secrets import token_hex
load_dotenv(find_dotenv())
wakatime_url = "https://wakatime.com/api/v1/"

CLIENT_ID = getenv("WAKATIME_ID")
CLIENT_SECRET = getenv("WAKATIME_SECRET")
print('c', CLIENT_ID)
print('cs', CLIENT_SECRET)
app = Flask(__name__)
api = 'http://localhost:5000/api/v1'


@app_views.route('/waka/status', strict_slashes=False)
def index():
    return jsonify({'msg': 'success'})


def update_user(id, data):
    """Updates user in database"""
    res = requests.put(f'{api}/users/{id}', json=data)
    if res.ok:
        print('Updated successfully')
        return res.json()
    else:
        res.raise_for_status()
        return res.text


@app_views.route('/waka/authorize', strict_slashes=False)
@jwt_required()
def authorize():
    url = "https://wakatime.com/oauth/token"
    code = request.args.get('code')
    data = {
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'code': code,
        'redirect_uri': "http://localhost:5173/dashboard",
        'grant_type': "authorization_code",
    }

    headers = {
        'Content-Type': "application/x-www-form-urlencoded",
        'Accept': 'application/json',
    }
    encoded_data = urlencode(data)
    response = requests.post(url,  data=encoded_data, headers=headers)
    if response.status_code == 200:
        # Request was successful
        print('POST request succeeded')
        user = response.json()
        # expiration_string = user.get('expires_at')
        # expiration_datetime = datetime.strptime(
            # expiration_string, '%Y-%m-%dT%H:%M:%SZ')
        waka_data = {
            'wk_access_token': user.get('access_token'),
            'wk_refresh_token': user.get('refresh_token'),
            'waka_connected': True,
            'wakatime_uid': user.get('uid'),
            'waka_token_expires': user.get('expires_at')
        }
        user_id = get_jwt_identity()
        user = update_user(user_id, waka_data)
        # with open('user.json', 'w') as f:
        #     json.dump(user, f, indent=2)
        print(user)
        h = {
            'Authorization': f'Bearer {user.get("access_token")}'
        }
        # re = requests.get(f"{waka}users/current/all_time_since_today", headers=h)
        # re = re.json()
        res = jsonify(user)
    else:
        # Request failed
        print('POST request failed')
        print(f'response is {response.text}')
        # abort(404)
        res = make_response(jsonify({'msg': "failed"}), 404)
    return res

# not in use


@app.route('/waka/login')
def login():
    waka_auth_url = 'https://wakatime.com/oauth/authorize'
    params = {
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'response_type': 'code',
        'scope': 'read_stats, read_logged_time',
        'redirect_uri': 'http://localhost:5000/waka/authorize'
    }
    encoded_params = urlencode(params)
    redirect_url = f"{waka_auth_url}?{encoded_params}"
    return redirect(redirect_url)


if __name__ == '__main__':
    app.run(debug=1)
