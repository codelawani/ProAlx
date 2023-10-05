from api.v1.views import app_views
from flask import jsonify, abort, request
from models import storage
from models.cohort import Cohort
from models.engine.DBExceptions import DatabaseException


def error_handler(e, msg=None):
    """
    This function handles errors and returns a JSON response with an error message and code.

    :param e: An exception object.
    :type e: Exception

    :param msg: A custom error message to be included in the response body. Default is None.
    :type msg: str

    :return: A JSON response with an error message and code.
    :rtype: tuple
    """
    if not msg:
        msg = e.client_msg
    return jsonify({'error': msg}), e.code


@app_views.route('/cohorts', strict_slashes=False)
def get_cohorts():
    """
    Retrieves all cohorts and returns them as a JSON response.

    Returns:
        A JSON response containing a list of dictionaries representing each cohort.
    """
    try:
        cohorts = storage.all(Cohort).values()
        return jsonify([cohort.to_dict() for cohort in cohorts])
    except DatabaseException as e:
        return error_handler(e)


@app_views.route('/cohort/<id>', strict_slashes=False)
def get_cohort(id):
    """
    Get a cohort by id.

    Args:
        id (str): The id of the cohort to retrieve.

    Returns:
        If successful, the cohort as a JSON object.
        If the cohort does not exist, returns a 404 error.
        If there was a problem with the database, an error is returned.
    """
    try:
        cohort = storage.get(Cohort, id)
        if not cohort:
            abort(404)
        return jsonify(cohort)
    except DatabaseException as e:
        return error_handler(e)


@app_views.route('/cohort/<id>', methods=['DELETE'], strict_slashes=False)
def delete_cohort(id):
    """
    Deletes a Cohort object based on its id.
    Args:
        id (int): The id of the Cohort to delete.
    Returns:
        A JSON response and status code.
    Raises:
        404 error if the Cohort with id does not exist.
    """
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
    """
    Creates a new cohort instance with the data provided in the request body. 
    Expects a JSON format.

    Args:
        None

    Returns:
        A JSON response with the newly created cohort instance in dictionary form and
        a 201 status code if successful. If unsuccessful, an error response with the
        corresponding status code and description will be returned.
    """
    try:
        if not request.get_json():
            abort(400, description="Not a JSON")
        data = request.get_json()
        print(data)
        instance = Cohort(**data)
        storage.new(instance)
        return jsonify(instance.to_dict()), 201
    except DatabaseException as e:
        return error_handler(e)


@app_views.route('/cohort/<id>', methods=['PUT'], strict_slashes=False)
def put_cohort(id):
    """
    Update a Cohort object.

    Args:
        id (str): The cohort id.

    Returns:
        A JSON representation of the updated Cohort object and a status code of 200.

    Raises:
        400: If the request is not a JSON.
        404: If the Cohort object with the given id is not found.
    """
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
    Route that retrieves all users that belong to a given cohort.

    Args:
        c_number (str): The number associated with the cohort.

    Returns:
        Flask Response: A JSON object containing information about all users within the given cohort.

    Raises:
        DatabaseException: If there was an error in the database.
    """
    try:
        cohort_users = storage.get_users_by_cohort(c_number)
        return jsonify(cohort_users)
    except DatabaseException as e:
        return error_handler(e)


@app_views.route('cohorts/<c_number>/needs_partners', strict_slashes=False)
def get_users_who_need_partners_by_cohort(c_number):
    """
    Returns a JSON representation of the list of users who need partners for a given cohort.

    Args:
        c_number (str): The cohort number.

    Returns:
        Flask.Response: A Flask response object containing a JSON representation of the list of users.

    Raises:
        DatabaseException: If there was an error retrieving the data from the database.
    """
    try:
        cohort_users = storage.get_users_who_need_partners_by_cohort(c_number)
        return jsonify(cohort_users)
    except DatabaseException as e:
        return error_handler(e)


@app_views.route('cohorts/<c_number>/leaderboard', strict_slashes=False)
def get_cohort_leaderboard(c_number):
    """
    Retrieves the leaderboard for a given cohort, identified by its c_number.

    Args:
        c_number (str): The cohort number.

    Returns:
        Response: The JSON representation of the leaderboard for the given cohort.

    Raises:
        DatabaseException: If there's an error retrieving the leaderboard.
    """
    try:
        cohort_users = storage.get_cohort_leaderboard(c_number)
        return jsonify(cohort_users)
    except DatabaseException as e:
        return error_handler(e)
