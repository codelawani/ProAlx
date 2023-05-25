from sqlalchemy import Column, VARCHAR
from sqlalchemy.orm import relationship
from .base_model import BaseModel

class Cohort(BaseModel):
    __tablename__ = 'cohorts'

    name = Column(VARCHAR(255), nullable=False)
    users = relationship("User", back_populates="cohort")