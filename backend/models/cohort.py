from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship
from .base_model import BaseModel


class Cohort(BaseModel):
    __tablename__ = 'cohorts'

    number = Column(Integer, nullable=False)
    name = Column(String(50), nullable=False)
    users = relationship("User", back_populates="cohort")
