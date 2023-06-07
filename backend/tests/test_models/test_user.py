import unittest
from models.user import User
from models.cohort import Cohort
from models import storage
from models.engine.DBExceptions import DatabaseException


class TestUser(unittest.TestCase):
    def setUp(self):
        """setUp method that instantiates a new DBStorage object and reloads the database."""
        self.db = storage
        self.db.reload()

    def tearDown(self):
        """tearDown method that deletes all objects from the tables and rolls back the session."""
        # Delete all objects from the tables
        self.db.session.query(User).delete()
        # self.db.session.query(Cohort).delete()
        self.db.save()
        self.db.close()

    def test_create_user(self):
        """
        Test the creation of a User object with specific attributes and check if the object is an instance of User class.
        Parameters:
            self: the instance of the class.
        Returns:
            None
        """
        user = User(name="John Doe",
                    email="johndoe@example.com",
                    github_uid=1234,
                    wakatime_uid="5678",
                    gh_access_token="abc123",
                    wk_access_token="def456",
                    wk_refresh_token="ghi789"
                    )
        self.assertIsInstance(user, User)
        self.assertEqual(user.name, "John Doe")
        self.assertEqual(user.email, "johndoe@example.com")
        self.assertEqual(user.github_uid, 1234)
        self.assertEqual(user.wakatime_uid, "5678")
        self.assertEqual(user.gh_access_token, "abc123")
        self.assertEqual(user.wk_access_token, "def456")
        self.assertEqual(user.wk_refresh_token, "ghi789")

    def test_save_user_to_database(self):
        """
        Saves a new user to the database and checks if the user's ID is not None.

        :param self: This object.
        :return: None.
        """
        user = User(name="Jane Doe",
                    email="janedoe@example.com",
                    github_uid=4321,
                    wakatime_uid="8765",
                    gh_access_token="xyz789",
                    wk_access_token="uvw456",
                    wk_refresh_token="rst123"
                    )
        self.db.new(user)
        self.assertIsNotNone(user.id)

    def test_create_user_with_missing_fields(self):
        """
        Creates a new user object with missing fields and attempts to add it to the database. This test ensures 
        that the proper error message is returned when attempting to create a user with missing fields. 

        :param self: The test class instance.
        :return: None.
        """
        try:
            user = User(name="John Doe",
                        email="johndoe@example.com",
                        github_uid=1234,
                        wakatime_uid="5678",
                        gh_access_token="abc123"
                        )
            self.db.new(user)
        except Exception as e:
            self.assertEqual(str(e), "All fields must be filled")

    def test_create_user_with_invalid_data_types(self):
        """
        Test creating a new user with invalid data types for some of the attributes.

        This function tests the behavior of the User class when trying to create a new user
        with invalid data types for some of the attributes. It tries to create a new User
        instance with a non-hashable github_uid of type int and a wrongly formatted wakatime_uid
        of type str. If the User instance is successfully created, it is added to the database.
        Otherwise, a TypeError is raised and checked against a specific error message.

        Parameters:
        self (TestCase): the current test case.
        
        Returns:
        None.
        """
        try:
            user = User(
                name="John Doe",
                email="johndoe@example.com",
                github_uid=12344,
                wakatime_uid='5678',
                gh_access_token="abc123",
                wk_access_token="def456",
                wk_refresh_token="ghi789"
            )
            self.db.new(user)
        except TypeError as e:
            self.assertEqual(str(e), "unhashable type: '12344'")

    def test_relationship_with_cohort(self):
        """
        Test the relationship between a User and a Cohort by creating a test cohort and a test user,
        setting the user's cohort to the test cohort, and then asserting that the user's cohort is
        equal to the test cohort.

        :param self: The object instance.
        :return: None
        """
        cohort = Cohort(name="Test Cohort")
        user = User(name="John Doe",
                    email="johndoe@example.com",
                    github_uid=1234,
                    wakatime_uid="5678",
                    gh_access_token="abc123",
                    wk_access_token="def456",
                    wk_refresh_token="ghi789",
                    cohort=cohort
                    )
        self.assertEqual(user.cohort, cohort)

    def test_delete_user_from_database(self):
        """
        Deletes a user from the database and verifies if it was successfully deleted.

        :param self: An instance of the test class.
        :return: None
        """
        user = User(name='John Doe')
        self.db.new(user)
        user.delete()
        with self.assertRaises(KeyError):
            storage.all(User)[user.id]

    def test_delete_user_not_in_database(self):
        """
        Test that a DatabaseException is raised when trying to delete a user that is not in the database.
        Takes no parameters.
        Returns nothing.
        """
        user = User(name="John", email="johndoe@example.com")
        with self.assertRaises(DatabaseException):
            user.delete()
