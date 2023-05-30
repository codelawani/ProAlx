import unittest
from models.cohort import Cohort
from models.user import User
from models.engine.DBStorage import DBStorage
from sqlalchemy import inspect


class TestDBStorage(unittest.TestCase):
    def setUp(self):
        db = DBStorage()
        db.reload()
        # Delete all objects from the tables
        db.session.query(User).delete()
        db.session.query(Cohort).delete()
        db.session.commit()

    def tearDown(self):
        db = DBStorage()
        db.session.rollback()
        db.session.close()

    # Tests that the all() method returns all objects in the database.

    def test_all_returns_all_objects(self):
        cohort = Cohort(name="Test Cohort")
        user = User(name="Test User", email="test@test.com", cohort=cohort)
        db = DBStorage()
        db.new(cohort)
        db.new(user)
        result = db.all()
        self.assertEqual(len(result), 2)
        self.assertIn(f"{cohort.__class__.__name__}.{cohort.id}", result)
        self.assertIn(f"{user.__class__.__name__}.{user.id}", result)

    # Tests that the count() method returns 0 if there are no objects in the specified model.
    def test_count_returns_zero_if_no_objects(self):
        db = DBStorage()
        result = db.count(Cohort)
        self.assertEqual(result, 0)

    # Tests that the new() method adds a new object to the database.
    def test_new_adds_new_object(self):
        cohort = Cohort(name="Test Cohort", number=9)
        db = DBStorage()
        db.new(cohort)
        result = db.get(Cohort, cohort.id)
        self.assertEqual(result.id, cohort.id)

    # Tests that the get() method returns None if the object is not found.
    def test_get_returns_none_if_object_not_found(self):
        db = DBStorage()
        result = db.get(Cohort, 1)
        self.assertIsNone(result)

    # Tests that the delete() method deletes an object from the database.
    def test_delete_deletes_object(self):
        cohort = Cohort(name="Test Cohort", number=9)
        db = DBStorage()
        db.new(cohort)
        db.delete(cohort)
        result = db.get(Cohort, cohort.id)
        self.assertIsNone(result)

    # Tests that the reload() method recreates the database tables if they do not exist.
    def test_reload_recreates_database_tables(self):
        db = DBStorage()
        db.reload()
        inspector = inspect(db.engine)
        self.assertIn(Cohort.__tablename__.lower(),
                      inspector.get_table_names())
