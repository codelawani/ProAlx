#!/usr/bin/python3
"""
This module contains a basic view for the github login route
"""
from os import getenv
from urllib.parse import parse_qs
import json
from models import storage
import requests
from api.v1.views import app_views
from dotenv import find_dotenv, load_dotenv
from flask import jsonify, make_response, request, url_for
from flask_jwt_extended import (create_access_token)

load_dotenv(find_dotenv())
CLIENT_ID = getenv("GITHUB_ID")
CLIENT_SECRET = getenv("GITHUB_SECRET")
TOKEN_ENDPOINT = "https://github.com/login/oauth/access_token"
USER_ENDPOINT = "https://api.github.com/user"
key = getenv('JWT_SECRET_KEY')
users_api = url_for('users')


def get_github_user_data(token):
    """
    Sends a GET request to the GitHub API's user endpoint to retrieve data for the authenticated user.

    Args:
        token (str): A valid GitHub access token.

    Returns:
        dict: A dictionary containing the user data in JSON format.

    Raises:
        HTTPError: If a non-2xx status code is returned by the API.
    """
    headers = {'Authorization': f"token {token}"}
    res = requests.get(USER_ENDPOINT, headers=headers)
    if res.ok:
        print('successfully got user github data')
        return res.json()
    else:
        res.raise_for_status()  # Raise an exception for non-2xx status codes
        print('user github data not found')


def create_user(user_data):
    """
    Creates a new user with the given user_data.

    Args:
        user_data (dict): A dictionary containing the user's data including their
            GitHub UID.

    Returns:
        dict: A dictionary containing the user's data if the user was successfully
            created. Otherwise, raises an HTTPError.

    Raises:
        HTTPError: If an unsuccessful response is received from the API.

    """
    user = storage.github_uid_exists(user_data.get('github_uid'))
    print(user)
    if user:
        user_data.update({'id': user.id, })
        print(user_data)
        return user.to_dict()
    res = requests.post(users_api, json=user_data)
    if res.ok:
        return res.json()
    else:
        res.raise_for_status()
        print('create user failed')


@app_views.route('/github/login', strict_slashes=False)
def login():
    """
    Route for GitHub login. Retrieves the access token by sending a POST request 
    with the client ID, client secret, and code. Parses and saves user data to a 
    JSON file. Creates a new user if one doesn't already exist, and creates an 
    access token with the user's ID and additional claims. Returns a response 
    with the access token. Raises RequestException if there's an issue with the 
    request, KeyError if the parsed response doesn't contain the expected data, 
    and Exception for any unexpected errors.
    :return: Flask response object with the access token
    """
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
        with open('user.json', 'w') as f:
            json.dump(user, f)
        user_data = {
            'github_login': user.get('login'),
            'github_uid': user.get('id'),
            'name': user.get('name'),
            'email': user.get('email'),
            'photo_url': user.get('avatar_url'),
            'twitter_username': user.get('twitter_username'),
            'gh_access_token': token,
            'github_session': True
        }
        # Create a new user if one doesn't already exist
        print(user_data)
        created_user = create_user(user_data)
        public_user_data = {
            'name': created_user.get('name', ''),
            'photo_url': created_user.get('photo_url', ''),
            'github_login': created_user.get('github_login', ''),
            'waka': created_user.get('waka_connected', False),
            'cohort': created_user.get('cohort_number', 0),
        }
        access_token = create_access_token(
            identity=created_user['id'],
            additional_claims={'user_data': (public_user_data)}
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
