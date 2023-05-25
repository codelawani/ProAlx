from sqlalchemy import Integer, Column, VARCHAR, ForeignKey
from sqlalchemy.orm import relationship
from models.base_model import BaseModel

class User(BaseModel):
    __tablename__ = 'users'

    name = Column(VARCHAR(255), nullable=False)
    twitter_username = Column(VARCHAR(255))
    whatsapp = Column(VARCHAR(255))
    email = Column(VARCHAR(255), nullable=False)
    github_uid = Column(Integer, nullable=False)
    wakatime_uid = Column(Integer, nullable=False)
    gh_access_token = Column(VARCHAR(255), nullable=False)
    wk_access_token = Column(VARCHAR(255), nullable=False)
    wk_refresh_token = Column(VARCHAR(255), nullable=False)
    likes_interests = Column(VARCHAR(255))
    most_active_time = Column(VARCHAR(10))
    session_token = Column(VARCHAR(255))
    interests = Column(VARCHAR(255))
    cohort_id = Column(Integer, ForeignKey('cohorts.id'))

    cohort = relationship("Cohort")