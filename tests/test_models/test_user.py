import unittest
from models.user import User
from models.cohort import Cohort

class TestUser(unittest.TestCase):
    def test_create_user(self):
        user = User(name="John Doe", email="johndoe@example.com", github_uid=1234, wakatime_uid=5678, gh_access_token="abc123", wk_access_token="def456", wk_refresh_token="ghi789")
        self.assertIsInstance(user, User)
        self.assertEqual(user.name, "John Doe")
        self.assertEqual(user.email, "johndoe@example.com")
        self.assertEqual(user.github_uid, 1234)
        self.assertEqual(user.wakatime_uid, 5678)
        self.assertEqual(user.gh_access_token, "abc123")
        self.assertEqual(user.wk_access_token, "def456")
        self.assertEqual(user.wk_refresh_token, "ghi789")

    def test_save_user_to_database(self):
        user = User(name="Jane Doe", email="janedoe@example.com", github_uid=4321, wakatime_uid=8765, gh_access_token="xyz789", wk_access_token="uvw456", wk_refresh_token="rst123")
        user.save()
        self.assertIsNotNone(user.id)

    def test_create_user_with_missing_fields(self):
        with self.assertRaises(TypeError):
            user = User(name="John Doe", email="johndoe@example.com", github_uid=1234, wakatime_uid=5678, gh_access_token="abc123")
            user.save()

    def test_create_user_with_invalid_data_types(self):
        with self.assertRaises(TypeError):
            user = User(name="John Doe", email="johndoe@example.com", github_uid="invalid", wakatime_uid=5678, gh_access_token="abc123", wk_access_token="def456", wk_refresh_token="ghi789")
            user.save()

    def test_relationship_with_cohort(self):
        cohort = Cohort(name="Test Cohort")
        user = User(name="John Doe", email="johndoe@example.com", github_uid=1234, wakatime_uid=5678, gh_access_token="abc123", wk_access_token="def456", wk_refresh_token="ghi789", cohort=cohort)
        self.assertEqual(user.cohort, cohort)

    def test_delete_user_from_database(self):
        user = User(name="Jane Doe", email="janedoe@example.com", github_uid=54321, wakatime_uid=98765, gh_access_token="xyz789", wk_access_token="uvw456", wk_refresh_token="rst123")
        user.save()
        user.delete()
        self.assertIsNone(user.id)

    def test_delete_user_not_in_database(self):
        # Edge case: Attempt to delete a User object that does not exist in the database
        user = User(name="John Doe", email="johndoe@example.com")
        with self.assertRaises(Exception):
            user.delete()



