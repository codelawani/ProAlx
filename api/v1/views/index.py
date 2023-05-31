#!/usr/bin/python3
"""Index view"""
from flask import jsonify
from api.v1.views import app_views


@app_views.route('/status')
def status():
    return jsonify({'status': 200})


@app_views.route('/stats', methods=['GET'], strict_slashes=False)
def number_objects():
    """ Retrieves the number of each objects by type """
    from models.cohort import Cohort
    from models.user import User
    from models import storage
    num_objs = {
        'cohorts': storage.count(Cohort),
        'users': storage.count(User),
    }

    return jsonify(num_objs)
