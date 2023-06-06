import requests
from sqlalchemy import Integer, Column, ForeignKey, String, DateTime, BOOLEAN
from sqlalchemy.orm import relationship
from .base_model import BaseModel
from sqlalchemy.ext.hybrid import hybrid_property
from models.request import RequestedPartners
from logs import logger
from datetime import datetime
from flask import jsonify
api = 'http://localhost:5000/api/v1'


class User(BaseModel):
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
    requested_partners = relationship(
        'RequestedPartners', back_populates='user', uselist=False)

    def to_dict(self):
        user_dict = super().to_dict()
        secrets = ['gh_access_token', 'wk_access_token',
                   'wk_refresh_token', 'waka_token_expires']
        for secret in secrets:
            user_dict.pop(secret, None)
        user_dict.update({
            'requested_partners': self.requested_partners_number,
            'last_request_date': self.last_request_date
        })
        return user_dict

    @hybrid_property
    def requested_partners_number(self):
        if self.requested_partners:
            return self.requested_partners.number
        return None

    @requested_partners_number.expression
    def requested_partners_number(cls):
        return RequestedPartners.number

    @requested_partners_number.setter
    def requested_partners_number(self, value):
        if self.requested_partners:
            self.requested_partners.number = value
        else:
            self.requested_partners = RequestedPartners(number=value)

    @hybrid_property
    def last_request_date(self):
        if self.requested_partners:
            return self.requested_partners.updated_at
        return None

    @last_request_date.expression
    def last_request_date(cls):
        return RequestedPartners.updated_at
