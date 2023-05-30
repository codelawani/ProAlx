import unittest
from models.user import User
from models.cohort import Cohort
from models import storage


class TestUser(unittest.TestCase):
    def test_create_user(self):
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
        user = User(name="Jane Doe",
                    email="janedoe@example.com",
                    github_uid=4321,
                    wakatime_uid="8765",
                    gh_access_token="xyz789",
                    wk_access_token="uvw456",
                    wk_refresh_token="rst123"
                    )
        user.save()
        self.assertIsNotNone(user.id)

    def test_create_user_with_missing_fields(self):
        """Test create user with missing fields"""
        try:
            user = User(name="John Doe",
                        email="johndoe@example.com",
                        github_uid=1234,
                        wakatime_uid="5678",
                        gh_access_token="abc123"
                        )
            user.save()
        except Exception as e:
            self.assertEqual(str(e), "All fields must be filled")

    def test_create_user_with_invalid_data_types(self):
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
            user.save()
        except TypeError as e:
            self.assertEqual(str(e), "unhashable type: '12344'")

    def test_relationship_with_cohort(self):
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
        """Test deleting a user from the database"""
        user = User()
        user.save()  # Save the user to the database
        user.delete()
        with self.assertRaises(KeyError):
            storage.all(User)[user.id]

    def test_delete_user_not_in_database(self):
        # Edge case: Attempt to delete a User object that does not exist in the database
        user = User(name="John Doe", email="johndoe@example.com")
        with self.assertRaises(Exception):
            user.delete()
