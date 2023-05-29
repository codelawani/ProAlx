import os

storage_type = os.getenv('STORAGE_TYPE')

if storage_type == 'db':
    from models.engine.DBStorage import DBStorage
    storage = DBStorage()
storage.reload()