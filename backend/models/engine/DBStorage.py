from logs import logger
from sqlalchemy.orm.exc import NoResultFound
from sqlalchemy.exc import SQLAlchemyError
from models.user import User
from models.cohort import Cohort
from models.request import RequestedPartners
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from models.base_model import Base
from models import DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME
from sqlalchemy.orm import defer, load_only
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from .DBExceptions import DatabaseException
from uuid import uuid4
from datetime import datetime
classes = {"User": User, "Cohort": Cohort,
           'RequestedPartners': RequestedPartners}
log_msg = "\nPlease check the logs for more details."

DATABASE_URI = "mysql+mysqlconnector://{}:{}@{}/{}".format(DB_USERNAME,
                                                           DB_PASSWORD,
                                                           DB_HOST,
                                                           DB_NAME
                                                           )


class DBStorage:
    """Interface to the database"""
    engine = None
    session = None

    def __init__(self):
        """Initialize the database storage engine"""
        self.engine = create_engine(DATABASE_URI, pool_pre_ping=True)

    def error_handler(method):
        """Returns a wrapper that handles errors"""

        def wrapper(self, *args, **kwargs):
            """ Wrapper that handles errors"""
            try:
                return method(self, *args, **kwargs)
            except NoResultFound:
                if self.session:
                    self.session.rollback()
                error_message = "No result found :{" + log_msg
                logger.exception(f'Error ID: {str(uuid4())}')
                raise DatabaseException(error_message, 404)
            except IntegrityError:
                if self.session:
                    self.session.rollback()
                error_message = "The requested action could not be completed due to data conflicts :(" + \
                    log_msg
                logger.exception(f'Error ID: {str(uuid4())}')
                raise DatabaseException(error_message, 409)
            except SQLAlchemyError:
                if self.session:
                    self.session.rollback()
                error_message = "There must be an issue with our server, contact support pls ^-^" + log_msg
                logger.exception(f'Error ID: {str(uuid4())}')
                raise DatabaseException(error_message)
            except Exception:
                error_message = "An unexpected error occured :(" + log_msg
                logger.exception(f'Error ID: {str(uuid4())}')
                raise DatabaseException(error_message)
        return wrapper

    @error_handler
    def create_all(self):
        """Create all database tables"""
        Base.metadata.create_all(self.engine)

    @error_handler
    def drop_all(self):
        """Drop all database tables"""
        Base.metadata.drop_all(self.engine)

    @error_handler
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

    @error_handler
    def new(self, obj):
        """Create a new object in the database"""
        self.session.add(obj)
        self.session.commit()

    @error_handler
    def delete(self, obj=None):
        """Deletes the cohort from the database"""
        if obj:
            # Detach the object from the current session
            self.session.expunge(obj)
            self.session.delete(obj)
            self.session.commit()

    @error_handler
    def reload(self):
        """Reloads the database"""
        Base.metadata.create_all(self.engine)
        session_factory = sessionmaker(
            bind=self.engine, expire_on_commit=False)
        self.session = scoped_session(session_factory)()

    @error_handler
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
            logger.exception(error_message)
            raise DatabaseException(error_message)

    @error_handler
    def close(self):
        """Close the working SQLAlchemy session"""
        try:
            self.session.close()
        except Exception as e:
            msg = "An error occurred while closing the session, Error: " + \
                str(e.__class__.__name__)
            logger.exception(msg)
            raise DatabaseException(msg)

    @error_handler
    def get(self, model, id):
        """Retrieve an object of the specified model by its ID"""
        if model in classes:
            model = classes[model]
        return self.session.get(model, id)

    @error_handler
    def count(self, model):
        """Return the count of objects in the specified model"""
        return self.session.query(model).count()

    @error_handler
    def get_cohort_by_number(self, number):
        """ Get a cohort by its number """
        return self.session.query(Cohort).filter(Cohort.number == number).first()

    @error_handler
    def create_new_cohort_if_not_exists(self, c_number):
        """
        Creates a new cohort with the given cohort number if it doesn't exist.
        Args:
            c_number (int): The cohort number of the new cohort.
        Returns:
            The newly created Cohort object.
        """
        cohort = self.get_cohort_by_number(c_number)
        if not cohort:
            cohort = Cohort(number=c_number)
            self.new(cohort)
        return cohort.number

    @error_handler
    def get_user_public_data(self, id):
        secrets = (
            User.gh_access_token,
            User.wk_access_token,
            User.wk_refresh_token,
            User.github_session,
            User.waka_token_expires
        )
        query = self.session.query(User).filter(User.id == id)
        for secret in secrets:
            query = query.options(defer(secret))
        return query.one()

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
            logger.exception(e)
            raise DatabaseException(
                "An error occurred while checking if a GitHub UID exists in the database")

    @error_handler
    def clear_github_session(self, id):
        """Clear GitHub session for a user"""
        user = self.get(User, id)
        if user:
            user.github_session = False
            self.save()

    def filter_necessary_data(method):
        def wrapper(self, *args, **kwargs):
            query = method(self, *args, **kwargs)
            entities = (User.id, User.name, User.cohort_number,
                        User.photo_url,
                        User.waka_week_total_seconds, User.waka_week_daily_average,
                        )
            query = query.options(load_only(*entities))
            users = query.all()
            users_dict = [user.to_dict()
                          for user in users if user is not None]
            return users_dict
        return wrapper

    @filter_necessary_data
    def get_users_by_cohort(self, n):
        """Get users by cohort"""
        query = self.session.query(User).filter(User.cohort_number == n)
        return query

    @error_handler
    @filter_necessary_data
    def get_users_who_needs_partners(self):
        """Get users who need partners"""
        query = self.session.query(User).filter(
            User.requested_partners > 0)
        return query

    @error_handler
    @filter_necessary_data
    def get_users_who_need_partners_by_cohort(self, n):
        """Get the users who need partners by cohort ordered by most recent request"""
        query = self.session.query(User).join(RequestedPartners).filter(
            RequestedPartners.number > 0,
            User.cohort_number == n
        ).order_by(RequestedPartners.updated_at.desc())
        return query

    @error_handler
    @filter_necessary_data
    def get_cohort_leaderboard(self, n):
        """Get leaderboard for cohort n"""
        query = self.session.query(User).filter(
            User.cohort_number == n).order_by(
                User.waka_week_total_seconds.desc())
        return query

    @error_handler
    @filter_necessary_data
    def get_overall_leaderboard(self):
        """Get overall leaderboard"""
        query = self.session.query(User).order_by(
            User.waka_week_total_seconds.desc())
        return query

    @error_handler
    def create_user_request(self, data, user_id):
        """ Create a new user request """
        number_requested = data.get('requested_partners')
        user = self.get(User, user_id)
        user.requested_partners_number = number_requested
        self.save()
        return user

    def set_user_data(self, user, data):
        """Sets user data"""
        for key, value in data.items():
            if key in ['id', 'created_at', 'updated_at']:
                continue
            if key == 'waka_token_expires':
                value = datetime.strptime(value, '%Y-%m-%dT%H:%M:%SZ')
            if key == 'requested_partners':
                if not hasattr(user, 'requested_partners'):
                    logger.exception(
                        "User does not have requested_partners attribute")
                    return None
                user.requested_partners_number = value
                continue
            if hasattr(user, key):
                setattr(user, key, value)
        self.save()
        return user.to_dict()
