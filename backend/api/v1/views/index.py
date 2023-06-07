#!/usr/bin/python3
"""Index view"""
from flask import jsonify
from api.v1.views import app_views


@app_views.route('/status')
def status():
    """
    Route function that returns a JSON response with the status code 200.
    """
    return jsonify({'status': 200})


@app_views.route('/stats', methods=['GET'], strict_slashes=False)
def number_objects():
    """
    Returns a JSON representation of the number of objects in the database for each of the following
    models: Cohort, User.
    The function accepts GET requests to the /stats endpoint of the app_views
    blueprint.
    No parameters are required. The JSON response contains two key-value pairs for each of
    the models, indicating the number of instances of each in the database.
    Returns:
    - A JSON object with two key-value pairs, representing the number of Cohort and User instances
      in the database, respectively.
    """
    from models.cohort import Cohort
    from models.user import User
    from models import storage
    num_objs = {
        'cohorts': storage.count(Cohort),
        'users': storage.count(User),
    }

    return jsonify(num_objs)
