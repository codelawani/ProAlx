import requests
from sqlalchemy import Integer, Column, ForeignKey, String, DateTime, BOOLEAN
from sqlalchemy.orm import relationship, deferred
from .base_model import BaseModel
api = 'http://localhost:5000/api/v1'


class User(BaseModel):
    __tablename__ = 'users'

    # use github display name and photo by default
    name = Column(String(50), nullable=False)
    photo_url = Column(String(255))

    username = Column(String(50), unique=True)
    twitter_username = Column(String(60))
    whatsapp = Column(String(25))
    email = Column(String(50))
    github_uid = Column(Integer, unique=True)
    wakatime_uid = Column(String(36))
    most_active_time = Column(String(10))
    timezone = Column(String(50))  # default could be from github/wakatime
    likes_interests = Column(String(255))
    waka_week_daily_average = Column(Integer)
    waka_week_total_seconds = Column(Integer)
    waka_connected = Column(BOOLEAN)
    # gh_access_token = deferred(Column(String(60)), group='secret')
    # wk_access_token = deferred(Column(String(100)), group='secret')
    # wk_refresh_token = deferred(Column(String(100)), group='secret')
    # github_session = deferred(Column(BOOLEAN), group='secret')
    # waka_token_expires = deferred(Column(DateTime), group='secret')
    gh_access_token = Column(String(60))
    wk_access_token = Column(String(100))
    wk_refresh_token = Column(String(100))
    github_session = Column(BOOLEAN)
    waka_token_expires = Column(DateTime)

    github_login = Column(String(48))
    wakatime_login = Column(String(25))
    cohort_number = Column(Integer, ForeignKey('cohorts.number'))

    cohort = relationship("Cohort", back_populates="users")
    user_request = relationship('Request', back_populates='user')
