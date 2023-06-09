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


def update_user(id, data):
    """ This function updates a user's data in the database.

    Args:
        id (str): The user's id.
        data (dicr): A dictionary containing the data to be updated.

    Returns:
        dict: A dictionary containing the updated user's data is successful.
    """
    user_dict = storage.set_user_data(id, data)
    if user_dict:
        print('Updated successfully')
        return user_dict
    else:
        print('Update failed')
        return {}


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
    err_res = make_response(jsonify({'msg': 'failed'}), 404)
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
        user = update_user(user_id, waka_data)
        print(user)
        if not user:
            return err_res
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
        res = err_res
    return res
