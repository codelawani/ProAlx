from models.user import User
from models.cohort import Cohort
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session, Session
from models.base_model import Base, BaseModel
from models import DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME, DB_ENV

classes = {"User": User, "Cohort": Cohort}


# Construct the database URI
DATABASE_URI = "mysql+mysqlconnector://{}:{}@{}/{}".format(DB_USERNAME,
                                                           DB_PASSWORD,
                                                           DB_HOST,
                                                           DB_NAME
                                                           )


class DBStorage:
    def __init__(self):
        """Initialize the database storage engine"""
        self.engine = create_engine(DATABASE_URI)
        self.session = sessionmaker(bind=self.engine)
        Base.metadata.create_all(self.engine)

        if DB_ENV == 'test':
            Base.metadata.drop_all(self.engine)

    def all(self, cls=None):
        """Returns all objects in the database"""
        result = {}
        for model in classes.values():
            if cls and model != cls:
                continue
            query_result = self.session.query(model).all()
            for obj in query_result:
                key = f"{obj.__class__.__name__}.{obj.id}"
                result[key] = obj
        return result

    def new(self, obj):
        """Create a new object in the database"""
        try:
            self.session.add(obj)
            self.session.commit()
        except Exception as e:
            print(f"Error occurred while adding object: {e}")
            self.session.rollback()

    def delete(self, obj=None):
        """Delete an object from the database"""
        if obj:
            self.session.delete(obj)
            self.session.commit()

    def reload(self):
        """Reloads the database"""
        Base.metadata.create_all(self.engine)
        session_factory = sessionmaker(
            bind=self.engine, expire_on_commit=False)
        self.session = scoped_session(session_factory)()

    def save(self):
        """Commit all changes of the current db session"""
        self.session.commit()

    def close(self):
        """Close the working SQLAlchemy session"""
        self.session.remove()

    def get(self, model, id):
        """Retrieve an object of the specified model by its ID"""
        return self.session.get(model, id)

    def count(self, model):
        """Return the count of objects in the specified model"""
        return len(self.all(model))
