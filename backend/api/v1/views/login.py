#!/usr/bin/python3
"""
This module contains a basic view for the login route
"""
from flask import jsonify, abort, redirect, request, Flask
# from api.v1.views import app_views
from os import getenv
import requests
from urllib.parse import urlencode
from dotenv import load_dotenv
import json
load_dotenv('/home/nico/Documents/xcode/ProAlx/.env')
wakatime_url = "https://wakatime.com/api/v1/"

CLIENT_ID = getenv("WAKA_CLIENT_ID")
CLIENT_SECRET = getenv("WAKA_CLIENT_SECRET")
# print('c', CLIENT_ID)
# print('cs', CLIENT_SECRET)
app = Flask(__name__)


@app.route('/', strict_slashes=False)
def index():
    """
    Defines a route to the root of the application.

    :return: A JSON object with a success message.
    """
    return jsonify({'msg': 'success'})


@app.route('/waka/authorize', strict_slashes=False)
def authorize():
    """
    Authorizes the user's access to the WakaTime API using OAuth2.0.

    Returns:
        A JSON response containing the user's credentials if authorization is successful, 
        or an error message if authorization fails.
    """
    url = "https://wakatime.com/oauth/token"
    code = request.args.get('code')
    data = {
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'code': code,
        'redirect_uri': "http://localhost:5000/waka/authorize",
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
        with open('user.json', 'w') as f:
            json.dump(user, f)
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
        res = jsonify({'msg': "failed"})

    # Print the response content
    res.headers.add('Access-Control-Allow-Origin', '*')
    return res


@app.route('/waka/login')
def login():
    """
    Decorator for the '/waka/login' route. When accessed, generates a url for 
    waka api authentication with the specified parameters and redirects the 
    user to that url.
    
    Args:
        None
    
    Returns:
        A redirect response to the generated url.
    """
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
