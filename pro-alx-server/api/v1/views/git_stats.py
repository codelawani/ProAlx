from api.v1.views import app_views
import os
from datetime import datetime, timedelta
from github import Github
from flask import jsonify
from dotenv import load_dotenv
import requests
load_dotenv()
token = os.getenv('GIT_TOKEN')
username = os.getenv('GIT_USERNAME')

alx_repos = ['AirBnB_clone', 'AirBnB_clone_v2', 'AirBnB_clone_v3',
             'AirBnB_clone_v4',
             'alx-higher_level_programming', 'alx-low_level_programming',
             'alx-system_engineering-devops', 'simple_shell',
             'binary_trees', 'sorting_algorithms', 'alx-zero_day',
             'monty', 'RSA-Factoring-Challenge']
alx_repos = [f'{username}/{repo}' for repo in alx_repos]


@app_views.route('/github/daily_commits/last_<n>_days')
def get_daily_commits(n):
    """
    Calculate the daily commit count for each date based on the commit data.

    Returns:
        dict: A dictionary where the keys are dates and the values are the
        corresponding commit counts.
    """
    commit_data = get_commits(token, username)
    return jsonify(commit_data)
    # if not commit_data:
    #     return jsonify({'msg': 'Github data Not Found'})
    # daily_commits = {}
    # for date, alx_repos in commit_data.items():
    #     commit_count = sum([len(repo.get('commit_messages', []))
    #                        for repo in alx_repos])
    #     daily_commits[str(date)] = commit_count
    # return jsonify(daily_commits)


# def get_commit_data(n, token, username):
#     """
#     Retrieves commit data for a specified number of days.

#     Returns:
#         commit_data (dict): A dictionary containing commit data
#                 organized by date.
#             Each key in the dictionary represents a date,
#             and the corresponding value is a list of alx_repos
#             Each repo contains a list of commit msgs.
#             The commit data is represented as a dictionary
#             with the following structure:
#             {   # Date of the commits
#                 'date': event_date:
#                 [{'repository': event.repo.name, # List of repository(ies)
#                 'commit_messages': []},...]      # List of commit messages
#             }
#     """
#     num_days = int(n)  # Default number of days

#     if token is None or username is None:
#         print("No github data for user")
#         return None

#     g = Github(token)
#     user = g.get_user(username)

#     last_n_days = datetime.now() - timedelta(days=num_days)
#     last_n_days = last_n_days.date()  # Get only the date portion

#     commit_data = {}

#     for event in user.get_events():
#         event_date = event.created_at.date()  # Get only the date portion

#         # Check if the event is a commit event and within the last n days
#         # Filter non-alx_repos out
#         if (event.type == 'PushEvent' and event_date >= last_n_days
#                 ):

#             if event_date not in commit_data:
#                 commit_data[str(event_date)] = []

#             commit_info = {
#                 'repository': event.repo.name,
#                 'commit_messages': []
#             }

#             for commit in event.payload['commits']:
#                 print(commit)
#                 commit_info['commit_messages'].append(commit['message'])
#             commit_data[str(event_date)].append(commit_info)
#     return commit_data

def get_commit_data(n, token, username):
    """
    Retrieves commit data for a specified number of days.

    Returns:
        commit_data (dict): A dictionary containing commit data
                organized by date.
            Each key in the dictionary represents a date,
            and the corresponding value is a list of repositories.
            Each repository contains a dictionary with the commit count.
            The commit data is represented as a dictionary
            with the following structure:
            {
                'date': event_date,           # Date of the commits
                'repositories': [
                    {
                        'name': repository_name,
                        'commit_count': count      # Commit count for the repository
                    },
                    ...
                ]
            }
    """
    num_days = int(n)  # Default number of days

    if token is None or username is None:
        print("No GitHub data for user")
        return None

    g = Github(token)
    user = g.get_user(username)

    last_n_days = datetime.now() - timedelta(days=num_days)
    last_n_days = last_n_days.date()  # Get only the date portion

    commit_data = {}

    for event in user.get_events():
        event_date = event.created_at.date()  # Get only the date portion

        # Check if the event is a commit event and within the last n days
        # Filter non-alx_repos out
        if event.type == 'PushEvent' and event_date >= last_n_days:
            if event_date not in commit_data:
                commit_data[str(event_date)] = {
                    'date': event_date, 'repositories': []}

            commit_data[str(event_date)]['repositories'].append({
                'name': event.repo.name,
                'commit_count': event.payload['size']
            })

    return commit_data


def get_commits(token, username):

    # Calculate the date range for the last 7 days
    today = datetime.now().date()
    week_ago = today - timedelta(days=30)

    # Format the date strings
    today_str = today.isoformat()
    week_ago_str = week_ago.isoformat()

    # Make the API request to get the contributions
    url = f"https://api.github.com/search/commits?q=author:{username}+author-date:{week_ago_str}..{today_str}"
    headers = {"Authorization": f"token {token}"}
    response = requests.get(url, headers=headers)
    data = response.json()

    # Process the response
    contributions = data["items"]

    # Create a dictionary to store the commit counts per day and repository
    commit_counts = {}

    # Iterate over the contributions
    for contribution in contributions:
        repo_name = contribution["repository"]["full_name"]
        # Extract the date part only
        commit_date = contribution["commit"]["author"]["date"][:10]

        # Check if the commit date is already in the dictionary
        if commit_date in commit_counts:
            # Check if the repository is already in the commit counts for the given date
            if repo_name in commit_counts[commit_date]:
                # Increment the commit count for the repository
                commit_counts[commit_date][repo_name] += 1
            else:
                # Add the repository to the commit counts for the given date
                commit_counts[commit_date][repo_name] = 1
        else:
            # Add the commit date and repository to the commit counts dictionary
            commit_counts[commit_date] = {repo_name: 1}

    # Print the commit counts per day and repository
    for date, repo_counts in commit_counts.items():
        print(f"Date: {date}")
        for repo, count in repo_counts.items():
            print(f"Repo: {repo}, Commits: {count}")
    return commit_counts


def get_longer_stats():
    # Calculate the date range for the last 30 days
    today = datetime.now().date()
    week_ago = today - timedelta(days=30)

    # Format the date strings
    today_str = today.isoformat()
    week_ago_str = week_ago.isoformat()

    # Make the initial API request to get the first page of contributions
    url = f"https://api.github.com/search/commits?q=author:{username}+author-date:{week_ago_str}..{today_str}&per_page=100"
    headers = {"Authorization": f"token {token}"}
    response = requests.get(url, headers=headers)
    data = response.json()

    # Process the initial response
    contributions = data["items"]

    # Handle pagination if there are more than 100 commits
    while "next" in response.links:
        url = response.links["next"]["url"]
        response = requests.get(url, headers=headers)
        data = response.json()
        contributions.extend(data["items"])

    # Create a dictionary to store the commit counts per day and repository
    commit_counts = {}

    # Iterate over the contributions
    for contribution in contributions:
        repo_name = contribution["repository"]["full_name"]
        if repo_name in alx_repos:
            # Extract the date part only
            commit_date = contribution["commit"]["author"]["date"][:10]

            # Check if the commit date is already in the dictionary
            if commit_date in commit_counts:
                # Check if the repository is already in the commit counts for the given date
                if repo_name in commit_counts[commit_date]:
                    # Increment the commit count for the repository
                    commit_counts[commit_date][repo_name] += 1
                else:
                    # Add the repository to the commit counts for the given date
                    commit_counts[commit_date][repo_name] = 1
            else:
                # Add the commit date and repository to the commit counts dictionary
                commit_counts[commit_date] = {repo_name: 1}

        # Print the commit counts per day and repository
        for date, repo_counts in commit_counts.items():
            print(f"Date: {date}")
            for repo, count in repo_counts.items():
                print(f"Repo: {repo}, Commits: {count}")
    return commit_counts
