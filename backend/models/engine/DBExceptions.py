from sqlalchemy.exc import SQLAlchemyError, IntegrityError, NoResultFound
from uuid import uuid4
from functools import wraps
from logs import logger


class DatabaseException(Exception):
    """Exception raised for database-related errors."""

    def __init__(self, message="Database error occurred.", code=500):
        self.message = message
        self.client_msg = self.message.split('\n')[0]
        self.code = code
        super().__init__(self.message)


log_msg = "\nPlease check the logs for more details."


def error_handler(method):
    """Returns a wrapper that handles errors"""
    @wraps(method)
    def wrapper(self, *args, **kwargs):
        """ Wrapper that handles errors"""
        try:
            return method(self, *args, **kwargs)
        except (NoResultFound, IntegrityError, SQLAlchemyError) as e:
            if self.session:
                self.session.rollback()
            if isinstance(e, NoResultFound):
                error_message = "No result found :{" + log_msg
                code = 404
            elif isinstance(e, IntegrityError):
                error_message = "The requested action could not be completed due to data conflicts :(" + \
                    log_msg
                code = 409
            else:
                error_message = "There must be an issue with our server, contact support pls ^-^" + log_msg
                code = 500

            logger.exception(f'Error ID: {str(uuid4())}')
            raise DatabaseException(error_message, code)
        except Exception:
            error_message = "An unexpected error occurred :(" + log_msg
            logger.exception(f'Error ID: {str(uuid4())}')
            raise DatabaseException(error_message)
    return wrapper
