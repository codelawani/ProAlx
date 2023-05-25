from sqlalchemy import Column, VARCHAR
from models.base_model import BaseModel

class Cohort(BaseModel):
    __tablename__ = 'cohorts'

    name = Column(VARCHAR(255), nullable=False)