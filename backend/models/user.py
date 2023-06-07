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
        requested_partners (RequestedPartners): The requested partners of the user.
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
        """
        Returns a dictionary representation of the user object with sensitive information removed.
        :return: dict
        """
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
        """
        Returns the number of requested partners for the current instance.

        :return: An integer representing the number of requested partners or None if no partners are requested.
        """
        if self.requested_partners:
            return self.requested_partners.number
        return None

    @requested_partners_number.expression
    def requested_partners_number(cls):
        """
        This function is a class level decorator that is used to define an expression for the requested_partners_number column.
        It takes a single parameter, cls, which represents the class calling the function.
        The function returns the number attribute of the RequestedPartners class.
        """
        return RequestedPartners.number

    @requested_partners_number.setter
    def requested_partners_number(self, value):
        if self.requested_partners:
            self.requested_partners.number = value
            self.requested_partners.updated_at = datetime.now()
        else:
            self.requested_partners = RequestedPartners(number=value)

    @hybrid_property
    def last_request_date(self):
        """
        Returns the updated_at value of the last requested partner, if any, otherwise None.

        :return: datetime or None
        """
        if self.requested_partners:
            return self.requested_partners.updated_at
        return None

    @last_request_date.expression
    def last_request_date(cls):
        """
        This is a SQLAlchemy expression function that retrieves the "updated_at" column from the RequestedPartners table.

        :param cls: The class being used to call this function (i.e., RequestedPartners)
        :return: The updated_at column from the RequestedPartners table
        """
        return RequestedPartners.updated_at
