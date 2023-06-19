from functools import wraps
from models.engine.DBExceptions import DatabaseException
from flask import jsonify
# ANSI escape sequence for red color
RED = '\033[91m'
# ANSI escape sequence to reset color
RESET = '\033[0m'


def error_handler(method):
    """ A decorator to handle errors in the application.
    Args:
        method (function): The function to be decorated.

    Returns:
        function: The decorated function.
    """
    @wraps(method)
    def wrapper(*args, **kwargs):
        """The wrapper function.
        Args:
            *args: Variable length argument list.
            **kwargs: Arbitrary keyword arguments.

        Returns:
            function: The decorated function.
        Raises:
            DatabaseException: If there is an error in the database.
        """
        try:
            return method(*args, **kwargs)
        except DatabaseException as e:
            print(
                f'{RED}pls Check ProAlx/backend/errors.log for '
                f'more details as regards this error{RESET}')
            print(e.client_msg)
            return jsonify({'error': e.client_msg}), e.code
    return wrapper
