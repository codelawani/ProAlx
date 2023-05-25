import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models.base_model import Base

db_username = os.getenv('DB_USERNAME')
db_password = os.getenv('DB_PASSWORD')
db_host = os.getenv('DB_HOST')
db_name = os.getenv('DB_NAME')

# Construct the database URI
DATABASE_URI = "mysql+mysqlconnector://{username}:{password}@{host}/{database}".format(username=db_username,
                                                                                        password=db_password,
                                                                                        host=db_host,
                                                                                        database=db_name
                                                                                    )

class DBStorage:
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

storage_engine = DBStorage()