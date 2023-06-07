from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship
from .base_model import BaseModel


class Cohort(BaseModel):
    """
    Represents a cohort in the system.

    Attributes:
        number (int): The cohort number.
        name (str): The name of the cohort.
        users (List[User]): The list of users associated with the cohort.
    """
    __tablename__ = 'cohorts'

    number = Column(Integer, nullable=False, unique=True)
    name = Column(String(50))
    users = relationship("User", back_populates="cohort")

