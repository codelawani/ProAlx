import re
import requests
from sqlalchemy import Integer, Column, ForeignKey, String, DateTime, BOOLEAN
from sqlalchemy.orm import relationship
from .base_model import BaseModel
from sqlalchemy.ext.hybrid import hybrid_property
from models.partner_request import PartnerRequest
from logs import logger
from datetime import datetime
from flask import jsonify
api = 'http://localhost:5000/api/v1'


class User(BaseModel):
    """
    Represents a user in the system.

    Attributes:
        name (str): The user's name.
        photo_url (str): The URL of the user's photo.
        username (str): The user's username.
        twitter_username (str): The user's Twitter username.
        whatsapp (str): The user's WhatsApp number.
        email (str): The user's email address.
        github_uid (int): The user's GitHub user ID.
        wakatime_uid (str): The user's WakaTime user ID.
        most_active_time (str): The user's most active time.
        timezone (str): The user's timezone.
        likes_interests (str): The user's likes and interests.
        waka_week_daily_average (int): The user's WakaTime weekly daily average.
        waka_week_total_seconds (int): The user's WakaTime weekly total seconds.
        waka_connected (bool): Indicates whether the user is connected to WakaTime.
        gh_access_token (str): The user's GitHub access token.
        wk_access_token (str): The user's WakaTime access token.
        wk_refresh_token (str): The user's WakaTime refresh token.
        github_session (bool): Indicates whether the user has an active GitHub session.
        waka_token_expires (datetime): The expiry date of the WakaTime access token.
        github_login (str): The user's GitHub login name.
        wakatime_login (str): The user's WakaTime login name.
        cohort_number (int): The number of the cohort the user belongs to.
        cohort (Cohort): The cohort the user belongs to.
        partner_request (PartnerRequest): User request data (project, number).
    """
    __tablename__ = 'users'

    # use github display name and photo by default
    name = Column(String(50), nullable=False)
    photo_url = Column(String(255))

    username = Column(String(50), unique=True)
    twitter_username = Column(String(60))
    whatsapp = Column(String(25))
    email = Column(String(50), unique=True)
    github_uid = Column(Integer, unique=True)
    wakatime_uid = Column(String(36))
    most_active_time = Column(String(10))
    timezone = Column(String(50))  # default could be from github/wakatime
    likes_interests = Column(String(255))
    waka_week_daily_average = Column(Integer)
    waka_week_total_seconds = Column(Integer)
    waka_connected = Column(BOOLEAN, default=False)
    gh_access_token = Column(String(60))
    wk_access_token = Column(String(100))
    wk_refresh_token = Column(String(100))
    github_session = Column(BOOLEAN)
    waka_token_expires = Column(DateTime)
    github_login = Column(String(48))
    wakatime_login = Column(String(25))
    cohort_number = Column(Integer, ForeignKey('cohorts.number'))
    cohort = relationship("Cohort", back_populates="users")
    partner_request = relationship(
        'PartnerRequest', back_populates='user', uselist=False)

    def to_dict(self):
        """
        Returns a dictionary representation of the user object with sensitive information removed.
        :return: dict
        """
        user_dict = super().to_dict()
        secrets = ['gh_access_token', 'wk_access_token',
                   'wk_refresh_token', 'waka_token_expires']
        for secret in secrets:
            user_dict.pop(secret, None)
        if self.partner_request:
            user_dict.update({
                'requested_partners': self.partner_request.number,
                'last_request_date': self.partner_request.updated_at,
                'requested_project': self.partner_request.project
            })
            user_dict.pop('partner_request', None)
        return user_dict
