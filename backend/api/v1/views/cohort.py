from api.v1.views import app_views
from flask import jsonify, abort, request
from models import storage
from models.cohort import Cohort
from models.engine.DBExceptions import DatabaseException


def error_handler(e, msg=None):
    """Returns an error message and status code"""
    if not msg:
        msg = e.client_msg
    return jsonify({'error': msg}), e.code


@app_views.route('/cohorts', strict_slashes=False)
def get_cohorts():
    try:
        cohorts = storage.all(Cohort).values()
        return jsonify([cohort.to_dict() for cohort in cohorts])
    except DatabaseException as e:
        return error_handler(e)


@app_views.route('/cohort/<id>', strict_slashes=False)
def get_cohort(id):
    try:
        cohort = storage.get(Cohort, id)
        if not cohort:
            abort(404)
        return jsonify(cohort)
    except DatabaseException as e:
        return error_handler(e)


@app_views.route('/cohort/<id>', methods=['DELETE'], strict_slashes=False)
def delete_cohort(id):
    try:
        cohort = storage.get(Cohort, id)
        if not cohort:
            abort(404)
        cohort.delete()
        return jsonify({}), 200
    except DatabaseException as e:
        return error_handler(e)


@app_views.route('/cohorts', methods=['POST'], strict_slashes=False)
def post_cohort():
    try:
        if not request.get_json():
            abort(400, description="Not a JSON")
        data = request.get_json()
        instance = Cohort(**data)
        storage.new(instance)
        return jsonify(instance.to_dict()), 201
    except DatabaseException as e:
        return error_handler(e)


@app_views.route('/cohort/<id>', methods=['PUT'], strict_slashes=False)
def put_cohort(id):
    if not request.get_json():
        abort(400, description="Not a JSON")
    cohort = storage.get(Cohort, id)
    if not cohort:
        abort(404)
    data = request.get_json()
    if 'number' in data:
        setattr(cohort, 'number', data['number'])
    try:
        cohort.save()
    except DatabaseException as e:
        return error_handler(e)
    return jsonify(cohort.to_dict()), 200


@app_views.route('cohorts/<c_number>', strict_slashes=False)
def get_users_by_cohort(c_number):
    """
    Retrieves all users in a cohort
    """
    try:
        cohort_users = storage.get_users_by_cohort(c_number)
        return jsonify(cohort_users)
    except DatabaseException as e:
        return error_handler(e)


@app_views.route('cohorts/<c_number>/needs_partners', strict_slashes=False)
def get_users_who_need_partners_by_cohort(c_number):
    """
    Retrieves all users in a cohort who need partners
    """
    try:
        cohort_users = storage.get_users_who_need_partners_by_cohort(c_number)
        return jsonify(cohort_users)
    except DatabaseException as e:
        return error_handler(e)


@app_views.route('cohorts/<c_number>/leaderboard', strict_slashes=False)
def get_cohort_leaderboard(c_number):
    """
    Retrieves all users in a cohort who need partners
    """
    try:
        cohort_users = storage.get_cohort_leaderboard(c_number)
        return jsonify(cohort_users)
    except DatabaseException as e:
        return error_handler(e)
