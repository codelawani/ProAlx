from sqlalchemy import Integer, Column, VARCHAR, ForeignKey, String
from sqlalchemy.orm import relationship
from .base_model import BaseModel

class User(BaseModel):
    __tablename__ = 'users'

    name = Column(VARCHAR(255), nullable=True)
    twitter_username = Column(VARCHAR(255))
    whatsapp = Column(VARCHAR(255))
    email = Column(VARCHAR(255), nullable=True)
    github_uid = Column(String(100), nullable=True)
    wakatime_uid = Column(String(100), nullable=True)
    gh_access_token = Column(VARCHAR(255), nullable=True)
    wk_access_token = Column(VARCHAR(255), nullable=True)
    wk_refresh_token = Column(VARCHAR(255), nullable=True)
    likes_interests = Column(VARCHAR(255))
    most_active_time = Column(VARCHAR(10))
    github_session = Column(VARCHAR(255))
    waka_session = Column(VARCHAR(255))
    github_login = Column(VARCHAR(255))
    wk_login = Column(VARCHAR(255))
    interests = Column(VARCHAR(255))
    cohort_id = Column(String(60), ForeignKey('cohorts.id'))

    cohort = relationship("Cohort", back_populates="users")