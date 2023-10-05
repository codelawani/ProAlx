from logs import logger
from sqlalchemy.orm.exc import NoResultFound
from sqlalchemy.exc import SQLAlchemyError
from models.user import User
from models.cohort import Cohort
from models.partner_request import PartnerRequest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from models.base_model import Base
from models import DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME, DB, DB_URI
from sqlalchemy.orm import defer, load_only
from sqlalchemy.exc import SQLAlchemyError
from .DBExceptions import DatabaseException, error_handler
from datetime import datetime
from functools import wraps

classes = {"User": User, "Cohort": Cohort,
           'PartnerRequest': PartnerRequest}
log_msg = "\nPlease check the logs for more details."

DATABASE_URI = "{}://{}:{}@{}/{}".format(DB, DB_USERNAME,
                                         DB_PASSWORD,
                                         DB_HOST,
                                         DB_NAME
                                         )
DATABASE_URI = DB_URI if DB_URI else DATABASE_URI
print(DATABASE_URI)


class DBStorage:
    """Interface to the database"""
    engine = None
    session = None

    def __init__(self):
        """Initialize the database storage engine"""
        self.engine = create_engine(DATABASE_URI, pool_pre_ping=True)

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
        if isinstance(cls, str):
            cls = classes.get(cls)
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
    def delete(self, obj=None, save=True):
        """Deletes the object from the database"""
        if obj:
            # Detach the object from the current session
            self.session.expunge(obj)
            self.session.delete(obj)
        if save:
            self.session.commit()

    @error_handler
    def reload(self):
        """Reloads the database"""
        Base.metadata.create_all(self.engine)
        session_factory = sessionmaker(
            bind=self.engine, expire_on_commit=False)
        self.session = scoped_session(session_factory)()

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
        if not c_number:
            return None
        cohort = self.get_cohort_by_number(c_number)
        if not cohort:
            cohort = Cohort(number=c_number)
            self.new(cohort)
        return cohort.number

    @error_handler
    def get_user_public_data(self, id):
        """
        Decorated function that retrieves public data for a user given an ID.

        :param id: The ID of the user whose data to retrieve.
        :type id: int

        :return: A dictionary containing user data, daily Wakatime stats, and daily GitHub stats.
        :rtype: dict
        """
        from api.v1.views.waka_stats import get_daily_logs
        from api.v1.views.git_stats import get_daily_commits

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
        user = query.one()
        if user:
            daily_commits = get_daily_commits(user.id)
            daily_logs = get_daily_logs(user.id)
            return {'user': user.to_dict(),
                    'waka_stats': daily_logs,
                    'git_stats': daily_commits}

    def github_uid_exists(self, g_uid):
        """
        Query the database to check if a user with a GitHub UID exists.

        :param g_uid: The GitHub UID to search for.
        :type g_uid: int
        :return: A User object if found, otherwise None.
        :rtype: User or None
        :raises: DatabaseException if an error occurs while checking the database.
        """
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
        """
        This function clears the Github session of a given user by setting their `github_session` attribute to False.
        It takes in two parameters - self and id. The `self` parameter refers to the instance of the class that calls
        this method, and the `id` parameter refers to the id of the user whose Github session needs to be cleared.
        This function does not return any value.
        """
        user = self.get(User, id)
        if user:
            user.github_session = False
            self.save()

    @error_handler
    def save_waka_weekly_stats(self, user_id):
        """
        Decorated function that saves weekly stats for a given user.
        :param self: An instance of the class.
        :param user_id: An integer representing the user id.
        :return: None.
        """
        from api.v1.views.waka_stats import get_waka_data
        user = self.get(User, user_id)
        if user:
            get_waka_data(user)  # Save weekly stats

    def filter_necessary_data(method):
        @wraps(method)
        def wrapper(self, *args, **kwargs):
            """
            This function is a decorator that takes a method and returns a new method.
            The new method queries a database table to get a list of users and converts each user
            to a dictionary. It accepts *args and **kwargs to pass to the original method.

            :param self: The instance of the class.
            :param *args: Arguments to be passed to the method being decorated.
            :param **kwargs: Keyword arguments to be passed to the method being decorated.

            :return: A list of dictionaries where each dictionary represents a user.
            """
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
        """
        Applies a filter to the necessary data and gets all users from a specific cohort.

        Args:
            n (int): The cohort number to filter users by.

        Returns:
            sqlalchemy.orm.query.Query: A query object containing all users from the specified cohort.
        """
        query = self.session.query(User).filter(User.cohort_number == n)
        return query

    @error_handler
    @filter_necessary_data
    def get_users_who_needs_partners(self):
        """
        Decorated function that retrieves all the users who need partners from the database.

        :return: A SQLAlchemy query object that fetches all the users who have requested partners.
        """
        query = self.session.query(User).filter(
            User.requested_partners > 0)
        return query

    @error_handler
    @filter_necessary_data
    def get_users_who_need_partners_by_cohort(self, n):
        """
        A function that retrieves a list of users who have requested partners, filtered by cohort number.

        Args:
            self: object instance of the class containing the function.
            n (int): the cohort number to filter by.

        Returns:
            query: a SQLAlchemy query object that retrieves the necessary data.
        """
        query = self.session.query(User).join(PartnerRequest).filter(
            PartnerRequest.number > 0,
            User.cohort_number == n
        ).order_by(PartnerRequest.updated_at.desc())
        return query

    @error_handler
    @filter_necessary_data
    def get_cohort_leaderboard(self, n):
        """
        Decorated function to get the leaderboard of users in a specified cohort based on the total number of seconds
        spent coding on Wakatime. Filters necessary data and handles errors.

        :param n: an integer representing the cohort number
        :type n: int

        :return: an SQLAlchemy query object with user information sorted in descending order by their total seconds
        :rtype: sqlalchemy.orm.query.Query
        """
        query = self.session.query(User).filter(
            User.cohort_number == n).order_by(
                User.waka_week_total_seconds.desc())
        return query

    @error_handler
    @filter_necessary_data
    def get_overall_leaderboard(self):
        """
        This function returns the overall leaderboard of users based on their total seconds performed in WakaTime in descending order.

        :param self: The object instance.

        :return: A SQLAlchemy query object.
        """
        query = self.session.query(User).order_by(
            User.waka_week_total_seconds.desc())
        return query

    @error_handler
    def set_user_data(self, id, data):
        """
        Decorated function that sets user data based on the given id and data. The function
        retrieves the user data by id from the database, modifies the data, and saves the changes.
        The function returns the user data as a dictionary if it exists, otherwise an empty
        dictionary.

        :param id: The user id.
        :type id: Any
        :param data: The user data to set.
        :type data: dict
        :return: The user data as a dictionary if it exists, otherwise an empty dictionary.
        :rtype: dict
        """
        user = self.get(User, id)
        ignore = ['gh_access_token', 'requested_partners',
                  'requested_project', 'id', 'created_at',
                  'updated_at']
        for key, value in data.items():
            if key in ignore:
                continue
            elif key == 'waka_token_expires':
                value = datetime.strptime(value, '%Y-%m-%dT%H:%M:%SZ')
            if hasattr(user, key):
                setattr(user, key, value)
        user.save()
        return user.to_dict() if user else {}

    def update_user_request(self, user, data):
        """
        Update user's partner request data if it exists, otherwise create a new request.

        Args:
            user: The user object to update the partner request for.
            data: A dictionary containing the updated partner request data.

        Returns:
            A dictionary representing the updated user data.
        """
        if 'requested_partners' in data and 'requested_project' in data:
            if not isinstance(data['requested_partners'], int):
                raise DatabaseException(
                    "'requested_partners' must be a positive integer.", 400)
            request = user.partner_request
            if request:
                request.number = data['requested_partners']
                request.project = data['requested_project']
            else:
                request = PartnerRequest(user=user)
                request.number = data['requested_partners']
                request.project = data['requested_project']
                self.new(request)
            request.save()
            return user.to_dict()
        else:
            error_message = "Both 'requested_partners' and 'requested_project' must be provided."
            raise DatabaseException(error_message, 400)
