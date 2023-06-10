import requests
from flask import jsonify

alx_repos = ['AirBnB_clone', 'AirBnB_clone_v2', 'AirBnB_clone_v3',
             'AirBnB_clone_v4',
             'alx-higher_level_programming', 'alx-low_level_programming',
             'alx-system_engineering-devops', 'simple_shell',
             'binary_trees', 'sorting_algorithms', 'alx-zero_day',
             'monty', 'RSA-Factoring-Challenge']


# @app_views.route('/users/<id>/waka_stats')
def get_daily_logs(id, n=7):
    """
    Get the daily wakatime log for each date.
    Filtered by Alx repositories only
    Returns:
        dict: A dictionary where the keys are dates and the values are the
        corresponding logs.
    """
    from models import storage

    user = storage.get('User', id)
    if user:
        token = user.wk_access_token
        return get_waka_data(n, token, user)
    else:
        return jsonify({'error': 'User not found'}), 404


def get_waka_data(n, token, user, process=True):
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
    if not data:
        return []
    save_waka_weekly_stats(data, user)
    if process:
        return process_data(data)


def save_waka_weekly_stats(data, user):
    """ Saves the weekly wakatime stats to the database."""
    from models import storage
    user_data = {
        'waka_week_total_seconds': int(data['cumulative_total']['seconds']),
        'waka_week_daily_average': int(data['daily_average']['seconds'])
    }
    user_dict = storage.set_user_data(user, user_data)
    if user_dict:
        print('User waka stats updated successfully')
        print(user_dict)
    else:
        print('Failed to update user waka stats')


def process_data(data):
    """ Processes the data returned by the WakaTime API."""
    daily_logs = {}
    try:
        for day in data['data']:
            date = day['range']['date']
            projects = day['projects']
            project_info = {project['name']: project['total_seconds']
                            for project in projects if project['name'] in alx_repos}
            daily_logs[date] = project_info
        return daily_logs
    except KeyError:
        return jsonify({'err': 'Unexpected data format'}), 500


def update_waka_weekly_stats_for_all_users():
    """ Updates the weekly wakatime stats for all users."""
    from models import storage
    users = storage.all('User').values()
    for user in users:
        token = user.wk_access_token
        get_waka_data(7, token, user, process=False)


if __name__ == '__main__':
    import sys
    import os
    # Get the absolute path of the "backend" directory
    backend_path = os.path.abspath(os.path.join(
        os.path.dirname(__file__), "../../../../backend"))
    sys.path.append(backend_path)
    update_waka_weekly_stats_for_all_users()
