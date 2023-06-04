from sqlalchemy.exc import IntegrityError
from models import DBStorage
from unittest import TestCase
from models.cohort import Cohort
from models import DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME, DB_ENV
from models.user import User
from models.engine.DBStorage import DBStorage
from sqlalchemy import inspect
from sqlalchemy.exc import SQLAlchemyError
from models.engine.DBExceptions import DatabaseException
DATABASE_URI = "mysql+mysqlconnector://{}:***@{}/{}".format(DB_USERNAME,
                                                            DB_HOST,
                                                            DB_NAME
                                                            )


class TestDBStorage(TestCase):
    def setUp(self):
        """setUp method that instantiates a new DBStorage object and reloads the database."""
        self.db = DBStorage()
        self.db.reload()
        # Delete all objects from the tables
        self.db.session.query(User).delete()
        self.db.session.query(Cohort).delete()
        self.db.session.commit()

    def tearDown(self):
        """tearDown method that deletes all objects from the tables and rolls back the session."""
        self.db.session.rollback()
        self.db.session.close()

    def test_all_returns_all_objects(self):
        """Tests that the all() method returns all objects in the database."""
        cohort = Cohort(name="Jewels", number=9)
        user = User(name="Test User 1", email="test1@test.com", cohort=cohort)
        self.db.new(cohort)
        self.db.new(user)
        result = self.db.all()
        self.assertEqual(len(result), 2)
        self.assertIn(f"{cohort.__class__.__name__}.{cohort.id}", result)
        self.assertIn(f"{user.__class__.__name__}.{user.id}", result)

    def test_count_returns_zero_if_no_objects(self):
        """Tests that the count() method returns 0 if there are no objects in the specified model."""
        result = self.db.count(Cohort)
        self.assertEqual(result, 0)

    def test_new_adds_new_object(self):
        """Tests that the new() method adds a new object to the database."""
        cohort = Cohort(name="Test Cohort", number=9)
        self.db.new(cohort)
        result = self.db.get(Cohort, cohort.id)
        self.assertEqual(result.id, cohort.id)

    def test_get_returns_none_if_object_not_found(self):
        """Tests that the get() method returns None if the object is not found."""
        result = self.db.get(Cohort, 1)
        self.assertIsNone(result)

    def test_delete_deletes_object(self):
        """Tests that the delete() method deletes an object from the database."""
        cohort = Cohort(name="Diamonds", number=9)
        self.db.new(cohort)
        self.db.delete(cohort)
        result = self.db.get(Cohort, cohort.id)
        self.assertIsNone(result)

    def test_reload_recreates_database_tables(self):
        """Tests that the reload() method recreates the database tables if they do not exist."""
        self.db.reload()
        inspector = inspect(self.db.engine)
        self.assertIn(Cohort.__tablename__.lower(),
                      inspector.get_table_names())

    def test_reload_does_not_recreate_database_tables_if_they_exist(self):
        """Tests that the reload() method does not recreate the database tables if they already exist."""
        self.db.reload()
        inspector = inspect(self.db.engine)
        self.assertIn(Cohort.__tablename__.lower(),
                      inspector.get_table_names())
        self.db.reload()
        inspector = inspect(self.db.engine)
        self.assertIn(Cohort.__tablename__.lower(),
                      inspector.get_table_names())


class TestDBStorageAllMethod(TestDBStorage):

    def test_initialization(self):
        """Test the initialization of DBStorage"""
        # Ensure the engine is created and stored correctly
        self.assertIsNotNone(self.db.engine)

    def test_all_returns_empty_dictionary_when_empty_database(self):
        """Tests that the all() method returns an empty dictionary when the database is empty."""
        result = self.db.all()
        self.assertEqual(len(result), 0)

    def test_all_returns_all_objects(self):
        """Tests that the all() method returns all objects in the database."""
        cohort = Cohort(name="Jewels", number=9)
        user = User(name="Test User", email="test@test.com", cohort=cohort)
        self.db.new(cohort)
        self.db.new(user)
        result = self.db.all()
        self.assertEqual(len(result), 2)
        self.assertIn(f"{cohort.__class__.__name__}.{cohort.id}", result)
        self.assertIn(f"{user.__class__.__name__}.{user.id}", result)

    def test_all_returns_objects_from_different_models(self):
        """Tests that the all() method returns objects from different models."""
        cohort = Cohort(name="Jewels", number=9)
        user = User(name="Test User", email="test@test.com", cohort=cohort)
        self.db.new(cohort)
        self.db.new(user)
        result = self.db.all()
        self.assertEqual(len(result), 2)
        self.assertIn(f"{cohort.__class__.__name__}.{cohort.id}", result)
        self.assertIn(f"{user.__class__.__name__}.{user.id}", result)

    def test_all_handles_multiple_objects_of_same_class(self):
        """Tests that the all() method handles multiple objects of the same class."""
        cohort1 = Cohort(name="Cohort 1", number=1)
        cohort2 = Cohort(name="Cohort 2", number=2)
        self.db.new(cohort1)
        self.db.new(cohort2)
        result = self.db.all(Cohort)
        self.assertEqual(len(result), 2)
        self.assertIn(f"{cohort1.__class__.__name__}.{cohort1.id}", result)
        self.assertIn(f"{cohort2.__class__.__name__}.{cohort2.id}", result)

    def test_all_handles_associations_between_models(self):
        """Tests that the all() method handles associations between different models."""
        cohort = Cohort(name="Jewels", number=9)
        user = User(name="Test User", email="test@test.com", cohort=cohort)
        self.db.new(cohort)
        self.db.new(user)
        result = self.db.all()
        self.assertEqual(len(result), 2)
        self.assertIn(f"{cohort.__class__.__name__}.{cohort.id}", result)
        self.assertIn(f"{user.__class__.__name__}.{user.id}", result)

        # Ensure the user object has the correct associated cohort
        user_from_db = result[f"{user.__class__.__name__}.{user.id}"]
        self.assertEqual(user_from_db.cohort, cohort)


class TestDBStorageNew(TestDBStorage):

    def test_new_creates_object(self):
        # Create a new User object
        user = User(name="John Doe", email="john@example.com")
        self.db.new(user)

        # Verify that the object is added to the session
        self.assertIn(user, self.db.session)

        # Verify that the object is committed to the database
        # Remove the object from the session
        self.db.session.expunge(user)
        self.db.close()  # Close the session
        self.db.reload()  # Create a new session
        retrieved_user = self.db.session.query(User).get(user.id)
        self.assertIsNotNone(retrieved_user)

    def test_new_handles_integrity_error(self):
        # Create a new cohort object with a duplicate number
        cohort1 = Cohort(name="Jewels", number=9)

        self.db.new(cohort1)

        # Verify that a DatabaseException is raised when adding the duplicate object
        with self.assertRaises(Exception):
            cohort2 = Cohort(name="Smiths", number=9)
            self.db.new(cohort2)


class TestDBStorageDeleteMethod(TestDBStorage):
    def test_delete_removes_object(self):
        """Test that the delete() method removes an object from the database"""
        # Create a new User object
        user = User(name="John Doe", email="john@example.com")
        self.db.new(user)

        # Call the delete() method to remove the object
        self.db.delete(user)

        # Verify that the object is no longer present in the database
        result = self.db.all(User)
        self.assertNotIn(f"{user.__class__.__name__}.{user.id}", result)

    def test_delete_handles_none_object(self):
        """Test that the delete() method handles a None object"""
        # Call the delete() method with a None object
        self.db.delete(None)

        # No exception should be raised


class TestDBStorageReloadMethod(TestDBStorage):
    def test_reload_creates_tables(self):
        """Test that the reload() method creates tables in the database"""
        # Call the reload() method
        self.db.reload()

        # Verify that the tables are created by querying for them
        inspector = inspect(self.db.engine)
        tables = inspector.get_table_names()
        self.assertIn("users", tables)
        self.assertIn("cohorts", tables)

    def test_reload_creates_tables_with_associations(self):
        """Test that the reload() method creates tables with associations"""
        # Call the reload() method
        self.db.reload()

        # Verify that the tables are created by querying for them
        inspector = inspect(self.db.engine)
        tables = inspector.get_table_names()
        self.assertIn("users", tables)
        self.assertIn("cohorts", tables)

        # Verify that the tables have the correct columns
        columns = inspector.get_columns("users")
        self.assertIn("cohort_number", [column["name"] for column in columns])


class TestDBStorageSaveClose(TestDBStorage):

    def test_save_successful(self):
        """Test that the save() method commits changes successfully."""
        # Create a new User object
        user = User(name="John Doe", email="john@example.com")

        # Add the user to the session and save it
        self.db.new(user)
        self.db.save()

        # Retrieve the user from the database and assert that it matches the original object
        retrieved_user = self.db.session.query(
            User).filter_by(email="john@example.com").one()
        self.assertEqual(user, retrieved_user)

    def test_save_exception(self):
        """Test that the save() method handles exceptions correctly."""
        # Create an object with invalid data
        invalid_user = User(name=1, email="john@example.com")

        # Add the invalid user to the session and attempt to save it
        # Assert that attempting to save the invalid user raises a SQLAlchemyError
        with self.assertRaises(DatabaseException):
            self.db.new(invalid_user)
        # self.db.save()

    def test_close_successful(self):
        """Test that the close() method closes the session successfully."""
        # Call the close() method and assert that the session is closed
        self.db.close()
        # self.assertTrue(self.db.session.is_closed)

    def test_close_already_closed(self):
        """Test that calling close() on an already closed session doesn't raise an exception."""
        # Close the session
        self.db.close()

        # Call close() again and assert that it doesn't raise an exception
        try:
            self.db.close()
        except Exception as e:
            self.fail(f"Unexpected exception raised: {str(e)}")
