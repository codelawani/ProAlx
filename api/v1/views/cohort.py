from api.v1.views import app_views
from flask import jsonify, abort


@app_views.route('/cohorts', strict_slashes=False)
def get_cohorts():
    cohorts = storage.all(Cohort).values()
    return jsonify([cohort for cohort in cohorts.to_dict()])


@app_views.route('/cohort/<id>', strict_slashes=False)
def get_cohort(id):
    cohort = storage.get(Cohort, id)
    if not cohort:
        abort(404)
    return jsonify(cohort.to_dict())


@app_views.route('/cohort/<id>', methods=['DELETE'], strict_slashes=False)
def delete_cohort(id):
    cohort = storage.get(Cohort, id)
    if not cohort:
        abort(404)
    storage.delete(cohort)
    storage.save()
    return jsonify({}), 200


@app_views.route('/cohort', methods=['POST'], strict_slashes=False)
def post_cohort():
    if not request.get_json():
        abort(400, description="Not a JSON")
    data = request.get_json()
    instance = Cohort(**data)
    instance.save()
    return jsonify(instance.to_dict()), 201


@app_views.route('/cohort/<number>', methods=['PUT'], strict_slashes=False)
def put_cohort(number):
    if not request.get_json():
        abort(400, description="Not a JSON")
    cohort = storage.get(Cohort, number)
    if not cohort:
        abort(404)
    data = request.get_json()
    if 'number' in data:
        setattr(cohort, 'number', data['number'])
    cohort.save()
    return jsonify(cohort.to_dict()), 200
