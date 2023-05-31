from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine, Column, String
from sqlalchemy.ext.declarative import declarative_base
import uuid
from models import DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME
Base = declarative_base()


class MyTable(Base):
    __tablename__ = 'my_table'

    id = Column(String(36), default=str(uuid.uuid4()), primary_key=True)
    name = Column(String(255))

    # Add more columns as needed
DATABASE_URI = "mysql+mysqlconnector://{}:{}@{}/{}".format(DB_USERNAME,
                                                           DB_PASSWORD,
                                                           DB_HOST,
                                                           DB_NAME
                                                           )
engine = create_engine(DATABASE_URI)
Base.metadata.create_all(engine)


Session = sessionmaker(bind=engine)
session = Session()

record = MyTable(name='Example', id=str(uuid.uuid4()))
session.add(record)
session.commit()

results = session.query(MyTable).all()
for result in results:
    print(result.id, result.name)
