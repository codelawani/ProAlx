from api.v1.views import app_views
from flask import Flask, make_response, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from os import getenv
from dotenv import load_dotenv, find_dotenv
from datetime import timedelta
from models import storage
load_dotenv(find_dotenv())
app = Flask(__name__)
app.register_blueprint(app_views)
CORS(app, resources={
     r"/*": {"origins": ["http://localhost:5173", "https://www.proalx.live", "https://proalx.live"]}})
app.config['JWT_SECRET_KEY'] = getenv('JWT_SECRET_KEY')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=30)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)
app.config['JWT_ALGORITHM'] = 'HS256'
jwt = JWTManager(app)


def print_urls():
    urls = []
    for rule in app.url_map.iter_rules():
        # Exclude the default static route
        if "static" not in str(rule.endpoint):
            urls.append(str(rule))
    print("Registered URLs:")
    for url in urls:
        print(url)


@app.route('/')
def index():
    return 'Home'


@app.teardown_appcontext
def close_db(e):
    """Close storage"""
    storage.close()


@app.errorhandler(404)
def not_found(error):
    """ 404 Error
    ---
    responses:
      404:
        description: a resource was not found
    """
    return make_response(jsonify({'error': "Not found"}), 404)


if __name__ == "__main__":
    """ Main Function """
    print_urls()
    host = getenv('API_HOST') or '0.0.0.0'
    port = getenv('API_PORT') or 5000
    app.run(host=host, port=port, threaded=True, debug=1)
