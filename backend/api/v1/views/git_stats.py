from datetime import datetime, timedelta
import jwt
from flask import jsonify
from dotenv import load_dotenv
from api.v1.views import app_views
import requests
from models import storage
load_dotenv()
alx_repos = ['AirBnB_clone', 'AirBnB_clone_v2', 'AirBnB_clone_v3',
             'AirBnB_clone_v4',
             'alx-higher_level_programming', 'alx-low_level_programming',
             'alx-system_engineering-devops', 'simple_shell',
             'binary_trees', 'sorting_algorithms', 'alx-zero_day',
             'monty', 'RSA-Factoring-Challenge']
api = 'http://localhost:5000/api/v1'


@app_views.route('/users/<id>/git_stats', strict_slashes=False)
def get_daily_commits(id, n=7):
    """
    Calculate the daily commit count for each date based on the commit data.

    Returns:
        dict: A dictionary containing the commit counts per day and repository.
    """
    user = storage.get('User', id)
    if user:
        token = user.gh_access_token
        username = user.github_login
        return get_commits(token, username, n)
    else:
        return jsonify({'error': 'User not found'}), 404


def verify_token(token, secret_key):
    """
    Given a token and a secret key, this function decodes the token using the HS256 algorithm and returns the decoded token. If the token is invalid, it returns None. 

    :param token: A string representing the token to be verified.
    :param secret_key: A string representing the secret key used to sign the token.
    :return: Returns the decoded token if it is valid, otherwise None.
    """
    try:
        decoded_token = jwt.decode(token, secret_key, algorithms=['HS256'])
        return decoded_token
    except (jwt.InvalidTokenError):
        return None


def fetch_commits(url, headers):
    """
    Fetches commit history from the given URL using the provided headers.

    :param url: The URL to fetch commit history from.
    :type url: str
    :param headers: The headers to use in the GET request.
    :type headers: dict
    :return: A list of commits as JSON objects, empty list if there was an error.
    :rtype: list
    """
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json().get("items", [])
    else:
        print(f"Error fetching commits: {response.status_code}")
        return []


def process_commits(commits, username):
    """
    Processes a list of commits and returns a dictionary containing the count of
    commits made to different repositories on different dates. The function takes
    in two parameters:
    
    - commits: A list of dictionaries representing commits to repositories. Each
      dictionary contains information such as the name of the repository, the date
      of the commit, etc.
    - username: A string representing the username of the user whose commits are
      being processed.
    
    The function returns a dictionary where the keys are dates in the format "YYYY-MM-DD"
    representing the dates of the commits and the values are dictionaries containing
    the count of commits made to different repositories on that date. The keys of the
    inner dictionary are the names of the repositories and the values are the count of
    commits made to that repository on that date.
    """
    commit_counts = {}
    for commit in commits:
        repo_name = commit["repository"]["full_name"]
        if username in repo_name:
            repo_name = repo_name.replace(f'{username}/', '')
        if repo_name in alx_repos:  # Check if the repository is in the allowed repos
            commit_date = commit["commit"]["author"]["date"][:10]
            if commit_date in commit_counts:
                if repo_name in commit_counts[commit_date]:
                    commit_counts[commit_date][repo_name] += 1
                else:
                    commit_counts[commit_date][repo_name] = 1
            else:
                commit_counts[commit_date] = {repo_name: 1}
    return commit_counts


def get_commits(token, username, n=7, page_size=100):
    """
    Retrieves the number of commits authored by a given username in a specified time range.
    
    :param token: The GitHub personal access token.
    :type token: str
    :param username: The username of the author whose commits are to be fetched.
    :type username: str
    :param n: The number of days to go back in time from today, defaults to 7.
    :type n: int
    :param page_size: The number of commits to fetch per page, defaults to 100.
    :type page_size: int
    :return: A dictionary with the number of commits for each repository the author has committed to.
    :rtype: dict
    """
    today = datetime.now().date()
    week_ago = today - timedelta(days=n)
    today_str = today.isoformat()
    week_ago_str = week_ago.isoformat()
    url = (
        f"https://api.github.com/search/commits?q=author:{username}"
        f"+author-date:{week_ago_str}..{today_str}"
    )
    headers = {"Authorization": f"token {token}"}
    total_pages = (n + page_size - 1) // page_size
    commit_counts = {}

    for page in range(total_pages):
        page_url = f"{url}&per_page={page_size}&page={page + 1}"
        retries = 3
        while retries > 0:
            commits = fetch_commits(page_url, headers)
            if commits:
                page_counts = process_commits(commits, username)
                commit_counts.update(page_counts)
                break
            else:
                retries -= 1
                print("Retrying...")
    print(commit_counts)
    return commit_counts
