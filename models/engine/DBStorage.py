import models
from models.user import User
from models.cohort import Cohort
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from models.base_model import Base

db_username = os.getenv('DB_USERNAME')
db_password = os.getenv('DB_PASSWORD')
db_host = os.getenv('DB_HOST')
db_name = os.getenv('DB_NAME')
db_env = os.getenv('DB_ENV')

classes = {"User": User, "Cohort": Cohort} 


# Construct the database URI
DATABASE_URI = "mysql+mysqlconnector://{username}:{password}@{host}/{database}".format(username=db_username,
                                                                                        password=db_password,
                                                                                        host=db_host,
                                                                                        database=db_name
                                                                                    )

class DBStorage:
    def __init__(self):
        self.engine = create_engine(DATABASE_URI)
        self.Session = sessionmaker(bind=self.engine)
        self.session = self.Session()

        # Create the database tables if they do not exist
        Base.metadata.create_all(self.engine)

        if db_env == 'test':
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
        try:
            self.session.add(obj)
            self.session.commit()
        except Exception as e:
            print(f"Error occurred while adding object: {e}")
            self.session.rollback()

    def delete(self, obj=None):
        if obj:
            self.session.delete(obj)
            self.session.commit()

    def reload(self):
        """Reloads the database"""
        Base.metadata.create_all(self.engine)
        session_factory = sessionmaker(bind=self.engine, expire_on_commit=False)
        self.session = scoped_session(session_factory)()

    def save(self):
        """Commit all changes of the current db session"""
        self.session.commit()

    def close(self):
        """Close the working SQLAlchemy session"""
        self.session.close()

    def get(self, model, id):
        """Retrieve an object of the specified model by its ID"""
        return self.session.query(model).get(id)
    
    def count(self, model):
        """Return the count of objects in the specified model"""
        return self.session.query(model).count()