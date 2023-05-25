from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models.base_model import Base

# Replace 'your_username', 'your_password', 'your_host', and 'your_database' with your MySQL credentials
DATABASE_URI = 'mysql+mysqlconnector://Pro_alx:Pro_alx_pwd01@localhost/pro_alx_db'

class StorageEngine:
    def __init__(self):
        self.engine = create_engine(DATABASE_URI)
        self.Session = sessionmaker(bind=self.engine)
        self.session = self.Session()

        # Create the database tables if they do not exist
        Base.metadata.create_all(self.engine)

    def new(self, obj):
        self.session.add(obj)
        self.session.commit()

    def delete(self, obj=None):
        if obj:
            self.session.delete(obj)
            self.session.commit()

storage_engine = StorageEngine()