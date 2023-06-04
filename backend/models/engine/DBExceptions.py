class DatabaseException(Exception):
    """Exception raised for database-related errors."""

    def __init__(self, message="Database error occurred.", code=500):
        self.message = message
        self.code = code
        super().__init__(self.message)
