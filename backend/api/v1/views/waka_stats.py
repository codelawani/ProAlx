import requests
from api.v1.views import app_views
import json
import os
from flask import jsonify
import requests as rq
from dotenv import load_dotenv
from models import storage
load_dotenv('/home/nico/Documents/xcode/ProAlx/.env')
alx_repos = ['AirBnB_clone', 'AirBnB_clone_v2', 'AirBnB_clone_v3',
             'AirBnB_clone_v4',
             'alx-higher_level_programming', 'alx-low_level_programming',
             'alx-system_engineering-devops', 'simple_shell',
             'binary_trees', 'sorting_algorithms', 'alx-zero_day',
             'monty', 'RSA-Factoring-Challenge']
API = 'http://localhost:5000/api/v1'


@app_views.route('/user/<id>/waka_stats')
def get_daily_logs(id, n=7):
    """
    Get the daily wakatime log for each date.
    Filtered by Alx repositories only
    Returns:
        dict: A dictionary where the keys are dates and the values are the
        corresponding logs.
    """
    user = storage.get('User', id)
    if user:
        token = user.wk_access_token
        return get_waka_data(n, token, user)
    else:
        return jsonify({'error': 'User not found'}), 404


def get_waka_data(n, token, user):
    """
    Fetches the WakaTime data for the specified number of days.

    Args:
        n (int): Number of days for which to fetch the data.
        token (str): WakaTime API token.
        username (str): WakaTime username.

    Returns:
        dict: A dictionary containing the daily logs of WakaTime data.
        Example:
        {
            "2023-05-18": {
                "repo1": 1200,
                "repo2": 800
            },
            "2023-05-19": {
                "repo1": 900,
                "repo3": 1500
            },
            ...
        }
        If the token or username is missing, returns an error dictionary:
        {
            "error": "WakaTime token not found"
        }
    """
    if not token:
        return {'error': 'wakaTime token Not found'}
    waka_summaries_api = (
        f'https://wakatime.com/api/v1/users/'
        f'current/summaries?range=last_{n}_days'
    )
    headers = {
        'Authorization': f'Bearer {token}'
    }
    response = requests.get(waka_summaries_api, headers=headers)
    data = response.json()
    daily_logs = {}
    if not data:
        return []
    try:
        user_data = {
            'waka_week_total_seconds': int(data['cumulative_total']['seconds']),
            'waka_week_daily_average': int(data['daily_average']['seconds'])
        }
        res = requests.put(f'{API}/user/{user.id}', json=user_data)
        if res.ok:
            print('User waka stats updated successfully')
        else:
            print('Failed to update user waka stats')
        for day in data['data']:
            date = day['range']['date']
            projects = day['projects']
            project_info = {project['name']: project['total_seconds']
                            for project in projects if project['name'] in alx_repos}
            daily_logs[date] = project_info
    except KeyError:
        return jsonify({'err': 'Unexpected data format'}), 500

    return daily_logs
