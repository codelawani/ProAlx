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


def get_daily_logs(n, token, username):
    """
    Get the daily wakatime log for each date.

    Returns:
        dict: A dictionary where the keys are dates and the values are the
        corresponding logs.
    """
    if not token or not username:
        return {'error': 'wakaTime token/username Not found'}
    days = get_waka_data(n, token, username)
    print(days['data'][0]['range'])
    daily_logs = {}
    for day in days['data']:
        date = day['range']['date']
        project_info = {}
        for project in day['projects']:
            name = project['name']
            if name in alx_repos:
                seconds = project['total_seconds']
                project_info[name] = seconds
        daily_logs[date] = project_info
    return jsonify(daily_logs)


waka_file_path = 'waka.json'


def get_waka_data(n, token, username):
    if not check_file(waka_file_path):
        waka_summaries_api = f'https://wakatime.com/api/v1/users/{username}/summaries?range=last_{n}_days'
        headers = {
            'Authorization': f'Bearer {token}'
        }
        response = requests.get(waka_summaries_api, headers=headers)
        data = response.json()

        with open(waka_file_path, 'w') as f:
            json.dump(data, f)
    else:
        with open(waka_file_path) as f:
            data = json.load(f)

    return data


def check_file(waka_file_path):
    if (os.path.exists(waka_file_path) and
            os.path.getsize(waka_file_path)) > 0:
        return True
    else:
        return False
