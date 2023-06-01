from datetime import datetime, timedelta
import jwt
from flask_jwt_extended import get_jwt_identity, jwt_required
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


@app_views.route('/user/daily_commits', strict_slashes=False)
@jwt_required()
def get_daily_commits(n=7):
    """
    Calculate the daily commit count for each date based on the commit data.

    Returns:
        dict: A dictionary containing the commit counts per day and repository.
    """
    user_id = get_jwt_identity()
    user = storage.get('User', user_id)
    token = user.gh_access_token
    username = user.github_login
    return get_commits(token, username, n)


def verify_token(token, secret_key):
    try:
        decoded_token = jwt.decode(token, secret_key, algorithms=['HS256'])
        return decoded_token
    except (jwt.InvalidTokenError):
        return None


def fetch_commits(url, headers):
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json().get("items", [])
    else:
        print(f"Error fetching commits: {response.status_code}")
        return []


def process_commits(commits, username):
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
