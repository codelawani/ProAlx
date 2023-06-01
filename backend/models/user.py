import requests
from sqlalchemy import Integer, Column, ForeignKey, String
from sqlalchemy.orm import relationship
from .base_model import BaseModel
api = 'http://localhost:5000/api/v1'


class User(BaseModel):
    __tablename__ = 'users'

    # use github display name and photo by default
    name = Column(String(50), nullable=False)
    photo_url = Column(String(255))

    username = Column(String(50), unique=True)
    twitter_username = Column(String(255))
    whatsapp = Column(String(25))
    email = Column(String(255))
    github_uid = Column(Integer, unique=True)
    wakatime_uid = Column(String(255))
    gh_access_token = Column(String(255))
    wk_access_token = Column(String(255))
    wk_refresh_token = Column(String(255))
    likes_interests = Column(String(255))
    most_active_time = Column(String(10))
    timezone = Column(String(50))  # default could be from github/wakatime
    github_session = Column(String(255))
    waka_session = Column(String(255))
    github_login = Column(String(255))
    wakatime_login = Column(String(255))
    requested_partners = Column(Integer, default=0, index=True)
    cohort_number = Column(Integer, ForeignKey('cohorts.number'))

    cohort = relationship("Cohort", back_populates="users")

    def fetch_github_data(self):
        """Retrieves daily commits of user from github api"""
        if not self.gh_access_token:
            return None
        res = requests.get(f'{api}/users/{self.id}/daily_commits')
        return res.json()
