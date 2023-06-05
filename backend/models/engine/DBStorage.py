import logging
from sqlalchemy.orm.exc import NoResultFound
from sqlalchemy.exc import SQLAlchemyError
from models.user import User
from models.cohort import Cohort
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from models.base_model import Base
from models import DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME, DB_ENV
from sqlalchemy.orm import defer, load_only
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from .DBExceptions import DatabaseException
classes = {"User": User, "Cohort": Cohort}

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

log_file = "errors.log"
file_handler = logging.FileHandler(log_file)
file_handler.setLevel(logging.DEBUG)

formatter = logging.Formatter(
    "%(asctime)s - %(name)s - %(levelname)s - %(message)s")
file_handler.setFormatter(formatter)

logger.addHandler(file_handler)

# Construct the database URI
DATABASE_URI = "mysql+mysqlconnector://{}:{}@{}/{}".format(DB_USERNAME,
                                                           DB_PASSWORD,
                                                           DB_HOST,
                                                           DB_NAME
                                                           )


class DBStorage:
    def __init__(self):
        """Initialize the database storage engine"""
        self.engine = None
        self.session = None

    def create_all(self):
        """Create all database tables"""
        try:
            Base.metadata.create_all(self.engine)
        except SQLAlchemyError as e:
            error_message = "An error occurred while creating the database tables: " + \
                str(e.__class__.__name__)
            logging.exception(error_message)
            raise DatabaseException(error_message)

    def drop_all(self):
        """Drop all database tables"""
        try:
            Base.metadata.drop_all(self.engine)
        except SQLAlchemyError as e:
            error_message = "An error occurred while dropping the database tables: " + \
                str(e.__class__.__name__)
            logging.exception(error_message)
            raise DatabaseException(error_message)

    def all(self, cls=None):
        """Returns all objects in the database"""
        try:
            result = {}
            for model in classes.values():
                if cls and model != cls:
                    continue
                query_result = self.session.query(model).all()
                for obj in query_result:
                    key = f"{obj.__class__.__name__}.{obj.id}"
                    result[key] = obj
            return result
        except SQLAlchemyError as e:
            error_message = "An error occurred while retrieving objects: " + \
                str(e.__class__.__name__)
            logging.exception(error_message)
            raise DatabaseException(error_message)

    def new(self, obj):
        """Create a new object in the database
        Returns:
            True if successful, False otherwise"""
        try:
            self.session.add(obj)
            self.session.commit()
            return True
        except IntegrityError as e:
            self.session.rollback()
            error_message = f"Integrity error occurred while adding object: {obj.__class__.__name__}"
            # logging.exception(error_message)
            raise DatabaseException(error_message)
        except SQLAlchemyError as e:
            self.session.rollback()
            error_message = f"{e.__class__.__name__} occurred while adding object: {obj.__class__.__name__}"
            logging.exception(error_message)
            raise DatabaseException(error_message)
        except Exception as e:
            self.session.rollback()
            error_message = f"{e.__class__.__name__} occurred while adding object: {obj.__class__.__name__}"
            logging.exception(error_message)
            raise DatabaseException(error_message)

    def delete(self, obj=None):
        """Deletes the cohort from the database"""
        if obj:
            try:
                # Detach the object from the current session
                self.session.expunge(obj)
                self.session.delete(obj)
                self.session.commit()
            except SQLAlchemyError as e:
                self.session.rollback()
                error_message = "An error occurred while deleting the object: " + \
                    str(e)
                logging.exception(error_message)
                raise DatabaseException(error_message)

    def reload(self):
        """Reloads the database"""
        try:
            self.engine = create_engine(DATABASE_URI)
            Base.metadata.create_all(self.engine)
            session_factory = sessionmaker(
                bind=self.engine, expire_on_commit=False)
            self.session = scoped_session(session_factory)()
        except SQLAlchemyError as e:
            error_message = "An error occurred while reloading the database: " + \
                str(e.__class__.__name__)
            logging.exception(error_message)
            raise DatabaseException(error_message)

    def save(self):
        """Commit all changes of the current db session
        Returns:
            True if successful, False otherwise"""
        try:
            self.session.commit()
            return True
        except SQLAlchemyError as e:
            self.session.rollback()
            error_message = "Database error: " + str(e.__class__.__name__)
            logging.exception(error_message)
            raise DatabaseException(error_message)

    def close(self):
        """Close the working SQLAlchemy session"""
        try:
            self.session.close()
        except Exception as e:
            msg = "An error occurred while closing the session: " + \
                str(e.__class__.__name__)
            logging.exception(msg)
            raise DatabaseException(msg)

    def get(self, model, id):
        """Retrieve an object of the specified model by its ID"""
        try:
            if model in classes:
                model = classes[model]
            return self.session.get(model, id)
        except Exception as e:
            msg = "An error occurred while retrieving the object: " + \
                str(e.__class__.__name__)
            logging.exception(msg)
            raise DatabaseException(msg)

    def count(self, model):
        """Return the count of objects in the specified model"""
        try:
            return self.session.query(model).count()
        except Exception as e:
            msg = "An error occurred while counting the objects" + \
                str(e.__class__.__name__)
            logger.exception(msg)
            raise DatabaseException(msg)

    def get_user_public_data(self, id):
        try:
            secrets = (
                'gh_access_token',
                'wk_access_token',
                'wk_refresh_token',
                'github_session',
                'waka_token_expires'
            )
            query = self.session.query(User).filter(User.id == id)
            for secret in secrets:
                query = query.options(defer(secret))
            return query.one()
        except NoResultFound:
            raise ValueError("No user found with the given ID")
        except Exception as e:
            msg = "An error occurred while retrieving user data" + \
                str(e.__class__.__name__)
            logger.exception(msg)
            raise DatabaseException(msg)

    def github_uid_exists(self, g_uid):
        """Check if a GitHub UID exists in the database"""
        try:
            query = self.session.query(User).filter(User.github_uid == g_uid)
            # Use .one() instead of .first() to raise an exception if no result is found
            user = query.one()
            return user
        except NoResultFound:
            return None
        except Exception as e:
            msg = "An error occurred while checking GitHub UID" + \
                str(e.__class__.__name__)
            logger.exception(msg)
            raise DatabaseException(msg)

    def clear_github_session(self, id):
        """Clear GitHub session for a user"""
        try:
            user = self.get(User, id)
            if user:
                user.github_session = False
                self.save()
        except DatabaseException as e:
            msg = "An error occurred while clearing GitHub session" + \
                str(e.__class__.__name__)
            logger.exception(msg)
            raise DatabaseException(msg)

    def filter_necessary_data(method):
        def wrapper(self, *args, **kwargs):
            try:
                query = method(self, *args, **kwargs)
                entities = (User.id, User.name, User.cohort_number,
                            User.photo_url, User.requested_partners,
                            User.waka_week_total_seconds, User.waka_week_daily_average)
                query = query.options(load_only(*entities))
                users = query.all()
                users_dict = [user.to_dict()
                              for user in users if user is not None]
                return users_dict
            except Exception as e:
                error_message = "An error occured while retrieving users" + \
                    str(e.__class__.__name__)
                logging.error(error_message)
                # Custom exception class for database errors
                raise DatabaseException(error_message)
        return wrapper

    @filter_necessary_data
    def get_users_by_cohort(self, n):
        """Get users by cohort"""
        query = self.session.query(User).filter(User.cohort_number == n)
        return query

    @filter_necessary_data
    def get_users_who_needs_partners(self):
        """Get users who need partners"""
        query = self.session.query(User).filter(
            User.requested_partners > 0)
        return query

    @filter_necessary_data
    def get_users_who_need_partners_by_cohort(self, n):
        """Get users who need partners by cohort"""
        query = self.session.query(User).filter(
            User.requested_partners > 0, User.cohort_number == n)
        return query

    @filter_necessary_data
    def get_cohort_leaderboard(self, n):
        """Get leaderboard for cohort n"""
        query = self.session.query(User).filter(
            User.cohort_number == n).order_by(
                User.waka_week_total_seconds.desc())
        return query

    @filter_necessary_data
    def get_overall_leaderboard(self):
        """Get overall leaderboard"""
        query = self.session.query(User).order_by(
            User.waka_week_total_seconds.desc())
        return query
