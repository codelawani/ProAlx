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
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from models import storage
from datetime import datetime
from secrets import token_hex
load_dotenv(find_dotenv())
wakatime_url = "https://wakatime.com/api/v1/"

CLIENT_ID = getenv("WAKATIME_ID")
CLIENT_SECRET = getenv("WAKATIME_SECRET")
app = Flask(__name__)
api = 'http://localhost:5000/api/v1'


def update_user(id, data, token):
    """
    Sends a PUT request to update a user's data in the API using the provided user ID, data, and authentication token.

    :param id: The ID of the user to be updated.
    :type id: int
    :param data: The updated data for the user.
    :type data: dict
    :param token: The authentication token for the API.
    :type token: str
    :return: The JSON response from the API if the update was successful, otherwise raises an HTTPError or returns the error response.
    :rtype: dict or str
    """
    res = requests.put(f'{api}/users/{id}', json=data, headers={
        'Authorization': f'Bearer {token}'}
    )
    if res.ok:
        print('Updated successfully')
        return res.json()
    else:
        res.raise_for_status()
        return res.text


@app_views.route('/waka/authorize', strict_slashes=False)
@jwt_required()
def authorize():
    """
    This function authorizes a user using OAuth with Wakatime. The user's code is received as a request parameter and is used to get an access token from Wakatime using the OAuth 2.0 authorization code flow. The access token is then used to update the user's data with Wakatime information and create a new JWT access token with the user's data for future use. The function returns a JSON response containing the new access token or an error message if the request fails.

    Args:
        None

    Returns:
        A Flask JSON response object containing an access token or an error message.
    """
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
        waka_data = {
            'wk_access_token': user.get('access_token'),
            'wk_refresh_token': user.get('refresh_token'),
            'waka_connected': True,
            'wakatime_uid': user.get('uid'),
            'waka_token_expires': user.get('expires_at')
        }
        user_id = get_jwt_identity()
        authorization_header = request.headers.get('Authorization')
        token = authorization_header.split(' ')[1]
        user = update_user(user_id, waka_data, token)
        print(user)
        public_user_data = {
            'name': user.get('name', ''),
            'cohort': user.get('cohort_number', 0),
            'photo_url': user.get('photo_url', ''),
            'github_login': user.get('github_login', ''),
            'waka': user.get('waka_connected', False)
        }
        access_token = create_access_token(
            identity=user_id,
            additional_claims={'user_data': public_user_data}
        )
        res = jsonify({'access_token': access_token})
    else:
        # Request failed
        print('POST request failed')
        print(f'response is {response.text}')
        # abort(404)
        res = make_response(jsonify({'msg': "failed"}), 404)
    return res
