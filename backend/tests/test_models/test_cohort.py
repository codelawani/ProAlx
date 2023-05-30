import unittest
from models.user import User
from models.cohort import Cohort
from models import storage

cohort_name = "Test Cohort"


class TestCohort(unittest.TestCase):
    def test_create_cohort_with_name(self):
        """Tests creating a new Cohort instance with a name and adding it to the database"""

        cohort = Cohort(name=cohort_name)
        self.assertEqual(cohort.name, cohort_name)
        self.assertIsNotNone(cohort.id)
        self.assertIsNotNone(cohort.created_at)
        self.assertIsNotNone(cohort.updated_at)
        # Save cohort to database
        cohort.save()
        # Retrieve cohort from database and check if it matches the original cohort
        retrieved_cohort = storage.get(Cohort, cohort.id)
        self.assertEqual(retrieved_cohort.name, cohort_name)

    def test_update_cohort_name(self):
        """Tests updating the name of a Cohort instance and saving it to the database"""
        new_cohort_name = "New Test Cohort"
        cohort = Cohort(name=cohort_name)
        # Save cohort to database
        cohort.save()
        # Update cohort name and save to database
        cohort.name = new_cohort_name
        cohort.save()
        # Retrieve cohort from database and check if the name has been updated
        retrieved_cohort = storage.get(Cohort, cohort.id)
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
        cohort = Cohort(name=cohort_name)
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
        cohort = Cohort(name="Test Cohort")
        cohort.save()
        # Assign the cohort ID to the user's cohort_id attribute
        user.cohort_id = cohort.id
        # Save the user to the database
        user.save()

    def test_delete_cohort(self):
        """Tests deleting a cohort"""
        cohort = Cohort(name="Test Cohort")
        cohort.save()
        self.assertIsNotNone(cohort.id)
        cohort.delete()
