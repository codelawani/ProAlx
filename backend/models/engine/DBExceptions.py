class DatabaseException(Exception):
    """Exception raised for database-related errors."""

    def __init__(self, message="Database error occurred.", code=500):
        self.message = message
        self.client_msg = self.message.split('\n')[0]
        self.code = code
        super().__init__(self.message)
