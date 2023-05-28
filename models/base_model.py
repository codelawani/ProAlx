from sqlalchemy import Column, Integer, DateTime
from sqlalchemy.ext.declarative import declarative_base
import uuid
from datetime import datetime

Base = declarative_base()


class BaseModel(Base):
    __abstract__ = True

    id = Column(Integer, primary_key=True, autoincrement=True)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow)

    def __init__(self, *args, **kwargs):
        """Initializes a new BaseModel"""
        self.id = str(uuid.uuid4())
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        if kwargs:
            for key, value in kwargs.items():
                if key == 'created_at' or key == 'updated_at':
                    value = datetime.strptime(value, '%Y-%m-%dT%H:%M:%S.%f')
                if key != '__class__':
                    setattr(self, key, value)

    def to_dict(self):
        """Returns a dictionary containing all keys/values of the object"""
        dictionary = {}
        for column in self.__table__.columns:
            dictionary[column.name] = getattr(self, column.name)
        dictionary['updated_at'] = self.updated_at
        return dictionary

    def save(self):
        """Saves the object to the database"""
        from . import storage
        self.updated_at = datetime.now()
        storage.new(self)
        storage.save()

    def delete(self):
        """Deletes the object from the database"""
        from . import storage
        storage.delete(self)

    def __str__(self):
        return f"{self.__class__.__name__}({self.__dict__})"