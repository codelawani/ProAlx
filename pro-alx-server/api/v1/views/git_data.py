# from api.v1.views import app_views
import os
from datetime import datetime, timedelta
from flask import Flask
from github import Github
from dotenv import load_dotenv
load_dotenv()
token = os.getenv('GIT_TOKEN')
username = os.getenv('GIT_USERNAME')
app = Flask(__name__)

repos = ['AirBnB_clone', 'AirBnB_clone_v2', 'AirBnB_clone_v3',
         'AirBnB_clone_v4',
         'alx-higher_level_programming', 'alx-low_level_programming',
         'alx-system_engineering-devops', 'simple_shell',
         'binary_trees', 'sorting_algorithms', 'alx-zero_day',
         'monty', 'RSA-Factoring-Challenge']
repos = [f'{username}/{repo}' for repo in repos]
# @app_views.route('/github/commit_count/last_14_days')


@app.route('/github/daily_commits/last_<n>_days')
def get_daily_commits(n):
    """
    Calculate the daily commit count for each date based on the commit data.

    Returns:
        dict: A dictionary where the keys are dates and the values are the
        corresponding commit counts.
    """
    commit_data = get_commit_data(n)
    daily_commits = {}
    for date, repos in commit_data.items():
        commit_count = sum([len(repo.get('commit_messages', []))
                           for repo in repos])
        daily_commits[str(date)] = commit_count
    return daily_commits


def get_commit_data(n):
    """
    Retrieves commit data for a specified number of days.

    Returns:
        commit_data (dict): A dictionary containing commit data
                organized by date.
            Each key in the dictionary represents a date,
            and the corresponding value is a list of repos
            Each repo contains a list of commit msgs.
            The commit data is represented as a dictionary
            with the following structure:
            {   # Date of the commits
                'date': event_date:
                [{'repository': event.repo.name, # List of repository(ies)
                'commit_messages': []},...]      # List of commit messages
            }
    """
    num_days = int(n)  # Default number of days

    if token is None or username is None:
        print("Please set the environment variables TOKEN and USERNAME.")
        exit()

    g = Github(token)
    user = g.get_user(username)

    last_n_days = datetime.now() - timedelta(days=num_days)
    last_n_days = last_n_days.date()  # Get only the date portion

    commit_data = {}

    for event in user.get_events():
        event_date = event.created_at.date()  # Get only the date portion

        # Check if the event is a commit event and within the last n days
        # Filter non- alx repos out
        if (event.type == 'PushEvent' and event_date >= last_n_days
                and event.repo.name in repos):

            if event_date not in commit_data:
                commit_data[event_date] = []

            commit_info = {
                'repository': event.repo.name,
                'commit_messages': []
            }

            for commit in event.payload['commits']:
                commit_info['commit_messages'].append(commit['message'])
            commit_data[event_date].append(commit_info)
    return commit_data


if __name__ == '__main__':
    app.run(debug=1)
