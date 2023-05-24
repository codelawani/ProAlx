from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from base_model import BaseModel

class User(BaseModel):
    __tablename__ = 'users'
    name = Column(String(255))
    twitter_username = Column(String(255))
    whatsapp = Column(String(255), nullable=True)
    email = Column(String(255))
    github_uid = Column(String(255))
    wakatime_uid = Column(String(255))
    gh_access_token = Column(String(255))
    wk_access_token = Column(String(255))
    wk_refresh_token = Column(String(255))
    interests = Column(String(255))
    most_active_time = Column(String(50))
    session_token = Column(String(255))
    cohort_id = Column(Integer, ForeignKey('cohorts.id'))
    cohort = relationship('Cohort', back_populates='users')
