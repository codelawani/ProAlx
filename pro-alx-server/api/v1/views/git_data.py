# from api.v1.views import app_views
import os
from datetime import datetime, timedelta
from github import Github
from dotenv import load_dotenv
load_dotenv()
token = os.getenv('GIT_TOKEN')
username = os.getenv('GIT_USERNAME')
repos = ['AirBnB_clone', 'AirBnB_clone_v2', 'AirBnB_clone_v3', 'AirBnB_clone_v4',
         'alx-higher_level_programming', 'alx-low_level_programming',
         'alx-system_engineering-devops', 'simple_shell',
         'binary_trees', 'sorting_algorithms', 'alx-zero_day',
         'monty', 'RSA-Factoring-Challenge']
repos = [f'{username}/{repo}' for repo in repos]
# @app_views.route('/github/commit_count/last_14_days')


def get_commit_data():
    """
    Retrieves commit data for a specified number of days.

    Returns:
        commit_data (dict): A dictionary containing commit data organized by date.
            Each key in the dictionary represents a date, and the corresponding value is a list of commit information.
            The commit information is represented as a dictionary with the following structure:
            {
                'date': event_date:                 # Date of the commits
                [{'repository': event.repo.name,      # Name of the repository
                'commit_messages': []},...]               # List of commit messages
            }

    Description:
        This function retrieves commit data for a specified number of days from the current date.
        It utilizes the GitHub API to fetch the user's events and filters out the PushEvent events within the specified timeframe.
        For each PushEvent, the function captures the repository name and commit messages.
        The commit data is organized by date, with each date having a list of commit information.

    Usage:
        - Ensure the environment variables 'TOKEN' and 'USERNAME' are set with the appropriate GitHub credentials.
        - Call the function 'get_commit_data()' to retrieve the commit data.

    Note:
        - The default number of days is set to 14 if not explicitly provided.
        - The function assumes the availability of the 'token' and 'username' variables from the environment.
        - The 'token' should contain a valid GitHub Personal Access Token (PAT) with the necessary permissions.
        - The 'username' should correspond to the GitHub username for which the commit data is fetched.
        - The function requires the 'python-dateutil' library to be installed for date manipulation.
    """
    num_days = 21  # Default number of days

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
        if event.type == 'PushEvent' and event_date >= last_n_days:
            if event_date not in commit_data:
                commit_data[event_date] = []

            commit_info = {
                'repository': event.repo.name,
                'commit_messages': []
            }

            for commit in event.payload['commits']:
                commit_info['commit_messages'].append(commit['message'])
            print(commit_info)
            commit_data[event_date].append(commit_info)
    return commit_data


commits = get_commit_data()
for k, v in commits.items():
    print(f'{k}: {v}')


def github_commits():
    commit_data = {}
    for key, value in commits.items():
        count = sum([len(v.get('commit_messages', [])) for v in value])
        commit_data[key] = count
    return commit_data


print(github_commits())
