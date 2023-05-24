from sqlalchemy import Column, Integer
from sqlalchemy.orm import relationship
from base_model import BaseModel

class Cohort(BaseModel):
    __tablename__ = 'cohorts'
    users = relationship('User', back_populates='cohort')