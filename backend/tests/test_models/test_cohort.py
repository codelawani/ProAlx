import unittest
from models.user import User
from models.cohort import Cohort
from models import DBStorage

cohort_name = "Cohort 9"


class TestCohort(unittest.TestCase):
    def setUp(self):
        """setUp method that instantiates a new DBStorage object and reloads the database."""
        self.db = DBStorage()
        self.db.reload()
        self.db.session.query(Cohort).delete()
        self.db.save()

    def tearDown(self):
        """tearDown method that deletes all objects from the tables and rolls back the session."""
        # Delete all objects from the tables
        # self.db.session.query(User).delete()
        self.db.close()

    def test_create_cohort_with_name(self):
        """
        Test if a new cohort can be created with a given name.
        The function creates a new cohort object with the given name and a number value of 9.
        It asserts that the name of the new cohort object matches the given name.
        It also asserts that the new cohort object has non-null values for id, created_at, and updated_at.
        The function saves the new cohort object to the database and retrieves it from the database.
        It asserts that the retrieved cohort object has the same name as the original cohort object.
        """
        cohort = Cohort(name=cohort_name, number=9)
        self.assertEqual(cohort.name, cohort_name)
        self.assertIsNotNone(cohort.id)
        self.assertIsNotNone(cohort.created_at)
        self.assertIsNotNone(cohort.updated_at)
        # Save cohort to database
        self.db.new(cohort)
        # Retrieve cohort from database and check if it matches the original cohort
        retrieved_cohort = self.db.get(Cohort, cohort.id)
        self.assertEqual(retrieved_cohort.name, cohort_name)

    def test_update_cohort_name(self):
        """
        Test the functionality of updating the name of a cohort object in the database.
        :return: None
        """
        new_cohort_name = "Cohort 10"
        cohort = Cohort(name=cohort_name, number=9)
        # Save cohort to database
        self.db.new(cohort)
        # Update cohort name and save to database
        cohort.name = new_cohort_name
        cohort.save()
        # Retrieve cohort from database and check if the name has been updated
        retrieved_cohort = self.db.get(Cohort, cohort.id)
        self.assertEqual(retrieved_cohort.name, new_cohort_name)

    def test_create_cohort_without_name(self):
        """
        Test method to create a Cohort object without specifying a name.
        This method creates a new Cohort instance and asserts that the id, created_at, and updated_at
        attributes are not None. It does not take any parameters and does not return anything.
        """
        cohort = Cohort()
        self.assertIsNotNone(cohort.id)
        self.assertIsNotNone(cohort.created_at)
        self.assertIsNotNone(cohort.updated_at)

    def test_create_cohort_with_long_name(self):
        """
        Test the creation of a cohort with a long name.

        :param self: the test case instance
        :return: None
        """
        cohort_name = "a" * 256
        cohort = Cohort(name=cohort_name, number=9)
        self.assertEqual(cohort.name, cohort_name)
        self.assertIsNotNone(cohort.id)
        self.assertIsNotNone(cohort.created_at)
        self.assertIsNotNone(cohort.updated_at)

    def test_add_user_to_nonexistent_cohort(self):
        """
        Test that a user can be added to a non-existent cohort in the database.

        :return: None
        """
        user = User(name="John Doe",
                    email="johndoe@example.com",
                    github_uid=1234,
                    wakatime_uid="5678",
                    gh_access_token="abc123",
                    wk_access_token="def456",
                    wk_refresh_token="ghi789"
                    )
        self.db.new(user)
        self.assertIsNotNone(user.id)
        # Create a cohort with a valid ID
        cohort = Cohort(name="Test Cohort", number=9)
        self.db.new(cohort)
        # Assign the cohort ID to the user's cohort_id attribute
        user.cohort_id = cohort.id
        # Save the user to the database
        user.save()

    def test_delete_cohort(self):
        """
        Deletes a Cohort object from the database, verifies that it is no longer 
        present, and returns None. 
        
        :param self: the object instance
        :return: None
        """
        from models import storage
        cohort = Cohort(name='cohort_name', number=8)

        storage.new(cohort)
        cohort.delete()
        storage.save()

        self.assertIsNone(storage.get(Cohort, cohort.id))
