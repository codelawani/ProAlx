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
        # Delete all objects from the tables
        self.db.session.query(Cohort).delete()
        self.db.session.commit()

    def tearDown(self):
        """tearDown method that deletes all objects from the tables and rolls back the session."""
        self.db.session.rollback()
        self.db.session.close()

    def test_create_cohort_with_name(self):
        """Tests creating a new Cohort instance with a name and adding it to the database"""

        cohort = Cohort(name=cohort_name, number=9)
        self.assertEqual(cohort.name, cohort_name)
        self.assertIsNotNone(cohort.id)
        self.assertIsNotNone(cohort.created_at)
        self.assertIsNotNone(cohort.updated_at)
        # Save cohort to database
        cohort.save()
        # Retrieve cohort from database and check if it matches the original cohort
        retrieved_cohort = self.db.get(Cohort, cohort.id)
        self.assertEqual(retrieved_cohort.name, cohort_name)

    def test_update_cohort_name(self):
        """Tests updating the name of a Cohort instance and saving it to the database"""
        new_cohort_name = "Cohort 10"
        cohort = Cohort(name=cohort_name, number=9)
        # Save cohort to database
        cohort.save()
        # Update cohort name and save to database
        cohort.name = new_cohort_name
        cohort.save()
        # Retrieve cohort from database and check if the name has been updated
        retrieved_cohort = self.db.get(Cohort, cohort.id)
        self.assertEqual(retrieved_cohort.name, new_cohort_name)

    def test_create_cohort_without_name(self):
        """Tests creating a new Cohort instance without a name and adding it to the database"""
        cohort = Cohort()
        self.assertIsNotNone(cohort.id)
        self.assertIsNotNone(cohort.created_at)
        self.assertIsNotNone(cohort.updated_at)

    def test_create_cohort_with_long_name(self):
        """Tests creating a new Cohort instance with a name longer than 255 characters and adding it to the database"""
        cohort_name = "a" * 256
        cohort = Cohort(name=cohort_name, number=9)
        self.assertEqual(cohort.name, cohort_name)
        self.assertIsNotNone(cohort.id)
        self.assertIsNotNone(cohort.created_at)
        self.assertIsNotNone(cohort.updated_at)

    def test_add_user_to_nonexistent_cohort(self):
        """Tests adding a user to a cohort that does not exist"""
        user = User(name="John Doe",
                    email="johndoe@example.com",
                    github_uid=1234,
                    wakatime_uid="5678",
                    gh_access_token="abc123",
                    wk_access_token="def456",
                    wk_refresh_token="ghi789"
                    )
        user.save()
        self.assertIsNotNone(user.id)
        # Create a cohort with a valid ID
        cohort = Cohort(name="Test Cohort", number=9)
        cohort.save()
        # Assign the cohort ID to the user's cohort_id attribute
        user.cohort_id = cohort.id
        # Save the user to the database
        user.save()

    def test_delete_cohort(self):
        """Tests deleting a cohort"""
        cohort = Cohort(name=cohort_name, number=9)
        cohort.save()
        self.assertIsNotNone(cohort.id)
        cohort.delete()
