from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, DateTime
import uuid
from datetime import datetime
from . import storage_type
from models.engine.DBExceptions import DatabaseException
from logs import logger

if storage_type == 'db':
    Base = declarative_base()
else:
    Base = object


class BaseModel(Base):
    __abstract__ = True

    id = Column(String(60), primary_key=True, default=uuid.uuid4)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)

    def __init__(self, *args, **kwargs):
        """Initializes a new BaseModel"""
        self.id = str(uuid.uuid4())
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        if kwargs:
            for key, value in kwargs.items():
                if key in ['created_at', 'updated_at']:
                    value = datetime.strptime(value, '%Y-%m-%dT%H:%M:%S.%f')
                if key != '__class__':
                    setattr(self, key, value)

    def to_dict(self):
        """Returns a dictionary containing all keys/values of the object"""
        dictionary = self.__dict__.copy()
        dictionary.pop('_sa_instance_state', None)
        for key, value in dictionary.items():
            if isinstance(value, datetime):
                dictionary[key] = value.strftime('%Y-%m-%dT%H:%M:%S.%f')
        return dictionary

    def save(self):
        """Updates updated_at with current time when instance is changed"""
        from . import storage
        self.updated_at = datetime.now()
        try:
            storage.save()
        except DatabaseException as e:
            logger.error(f"An error occurred while saving the object: {e}")
            raise DatabaseException('Failed to save object')

    def delete(self):
        """Deletes the object from the database"""
        from . import storage
        try:
            storage.delete(self)
        except DatabaseException as e:
            logger.error(f"An error occurred while deleting the object: {e}")
            raise DatabaseException('Failed to delete object')

    def __str__(self):
        """Returns a string representation of the instance"""
        return '[{}] ({}) {}'.format(
            self.__class__.__name__, self.id, self.to_dict())
