from os import getenv
from dotenv import load_dotenv, find_dotenv
import time
load_dotenv(find_dotenv())
API = getenv('API', 'http://localhost:5000/api/v1')
DB_ENV = getenv('DB_ENV', 'dev')  # dev is default
DB = "postgresql+psycopg2"
print('Current DB_ENV:', DB_ENV)
print('Initialising Database...')
time.sleep(3)
if DB_ENV == 'test':
    DB_USERNAME = getenv('TEST_DB_USERNAME')
    DB_PASSWORD = getenv('TEST_DB_PASSWORD')
    DB_NAME = getenv('TEST_DB_NAME')
    DB_HOST = getenv('TEST_DB_HOST')
else:
    DB_USERNAME = getenv('DB_USERNAME')
    DB_PASSWORD = getenv('DB_PASSWORD')
    DB_NAME = getenv('DB_NAME')
    DB_HOST = getenv('DB_HOST')
    DB_URI = getenv('DB_URI')

storage_type = getenv('STORAGE_TYPE', 'db')
# db storage is default
if storage_type == 'db':
    from models.engine.DBStorage import DBStorage
    storage = DBStorage()
    storage.reload()
