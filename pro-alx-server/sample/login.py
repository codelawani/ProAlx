#!/usr/bin/python3
"""
This module contains a basic view for the login route
"""
from flask import jsonify, abort, request
from api.v1.views import app_views
#from models import storage
from os import getenv
import requests
from urllib.parse import urlencode
wakatime_url = "https://wakatime.com/api/v1/"

CLIENT_ID =  getenv("CLIENT_ID")
CLIENT_SECRET = getenv("CLIENT_SECRET")

@app_views.route('/user/login', strict_slashes=False)
def login():
    url = "https://wakatime.com/oauth/token"
    code = request.args.get('code');
    data = {
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'code': code ,
        'redirect_uri' : "http://localhost:5174/",
        'grant_type' : "authorization_code",
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
        h = {
            'Authorization' : f'Bearer {user.get("access_token")}'
        }
        # re = requests.get(f"{waka}users/current/all_time_since_today", headers=h)
        # re = re.json()
        res = jsonify(user)
    else:
        # Request failed
        print('POST request failed')
        print(f'response is {response.text}')
        #abort(404)
        res = jsonify({'status': "failed"})

    # Print the response content  
    res.headers.add('Access-Control-Allow-Origin', '*')
    return res