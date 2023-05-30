import requests
from api.v1.views import app_views
import json
import os
from flask import jsonify
import requests as rq
from dotenv import load_dotenv
load_dotenv('/home/nico/Documents/xcode/ProAlx/.env')
token = os.getenv('WAKA_TOKEN')
username = os.getenv('WAKA_USERNAME')
alx_repos = ['AirBnB_clone', 'AirBnB_clone_v2', 'AirBnB_clone_v3',
             'AirBnB_clone_v4',
             'alx-higher_level_programming', 'alx-low_level_programming',
             'alx-system_engineering-devops', 'simple_shell',
             'binary_trees', 'sorting_algorithms', 'alx-zero_day',
             'monty', 'RSA-Factoring-Challenge']


@app_views.route('/wakatime/daily_logs/last_<n>_days')
def get_daily_logs(n=7):
    """
    Get the daily wakatime log for each date.

    Returns:
        dict: A dictionary where the keys are dates and the values are the
        corresponding logs.
    """
    return get_waka_data(n, token, username)


def get_waka_data(n, token, username):
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
            "error": "WakaTime token/username not found"
        }
    """
    if not token or not username:
        return {'error': 'wakaTime token/username Not found'}
    waka_summaries_api = (
        f'https://wakatime.com/api/v1/users/'
        f'{username}/summaries?range=last_{n}_days'
    )
    headers = {
        'Authorization': f'Bearer {token}'
    }
    response = requests.get(waka_summaries_api, headers=headers)
    data = response.json()
    daily_logs = {}
    for day in data['data']:
        date = day['range']['date']
        projects = day['projects']
        project_info = {project['name']: project['total_seconds']
                        for project in projects if project['name'] in alx_repos}
        daily_logs[date] = project_info

    return daily_logs

# soon to be deleted


def check_file(waka_file_path):
    if (os.path.exists(waka_file_path) and
            os.path.getsize(waka_file_path)) > 0:
        return True
    else:
        return False
