import unittest
from models.cohort import Cohort
from models.user import User
from models.engine.DBStorage import DBStorage
from sqlalchemy import inspect


class TestDBStorage(unittest.TestCase):
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
        cohort = Cohort(name="Test Cohort", number=9)
        user = User(name="Test User", email="test@test.com", cohort=cohort)
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
        cohort = Cohort(name="Test Cohort", number=9)
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
