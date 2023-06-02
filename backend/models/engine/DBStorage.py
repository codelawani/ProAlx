from sqlalchemy.exc import SQLAlchemyError
from models.user import User
from models.cohort import Cohort
from flask import jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from models.base_model import Base
from models import DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME, DB_ENV
from sqlalchemy.orm import defer, load_only
from mysql.connector.errors import DataError, DatabaseError
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
        try:
            print('='*30)
            self.session.commit()
        except SQLAlchemyError as e:
            self.session.rollback()
            error_message = "Database error: " + str(e.__class__.__name__)
            print(error_message)
            raise SQLAlchemyError(error_message)
        except DataError as e:
            print('Data error', e)
            raise DataError(e)
        except DatabaseError as e:
            print(e)
            raise DatabaseError(e)

    def close(self):
        """Close the working SQLAlchemy session"""
        self.session.close()

    def get(self, model, id):
        """Retrieve an object of the specified model by its ID"""
        if model in classes:
            model = classes[model]
        return self.session.get(model, id)

    def count(self, model):
        """Return the count of objects in the specified model"""
        return len(self.all(model))

    def github_uid_exists(self, g_uid):
        """Check if a github uid exists in the database"""
        query = self.session.query(User).filter(User.github_uid == g_uid)
        user = query.first()
        return user.id

    def clear_github_session(self, id):
        """clear github session"""
        user = self.get(User, id)
        user.github_session = False
        user.save()

    def filter_necessary_data(method):
        def wrapper(self, *args, **kwargs):
            query = method(self, *args, **kwargs)
            # attributes = ['gh_access_token',
            #               'wk_access_token', 'wk_refresh_token',]
            # for attribute in attributes:
            # query = query.options(defer(attribute))
            entities = (User.id, User.name, User.cohort_number,
                        User.photo_url, User.requested_partners)
            query = query.options(load_only(*entities))
            users = query.all()
            users_dict = [user.to_dict() for user in users if user is not None]
            return users_dict
        return wrapper

    @filter_necessary_data
    def get_users_by_cohort(self, cohort_number):
        """Get users by cohort"""
        try:
            query = self.session.query(User).filter(
                User.cohort_number == cohort_number)
            return query
        except Exception as e:
            print(f"An error occurred while retrieving users: {e}")
            return []

    @filter_necessary_data
    def get_users_who_needs_partners(self):
        """Get users who need partners"""
        try:
            query = self.session.query(User).filter(
                User.requested_partners > 0)
            return query
        except Exception as e:
            print(
                f"An error occurred while retrieving users who need partners: {e}")
            return []

    @filter_necessary_data
    def get_users_who_need_partners_by_cohort(self, cohort_number):
        """Get users who need partners by cohort"""
        try:
            query = self.session.query(User).filter(
                User.requested_partners > 0, User.cohort_number == cohort_number)
            return query
        except Exception as e:
            print(
                f"An error occurred while retrieving"
                f"users who need partners by cohort: {e}")
            return []
