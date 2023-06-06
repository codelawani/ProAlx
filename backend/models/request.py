from sqlalchemy import Integer, Column, ForeignKey
from sqlalchemy.orm import relationship
from .base_model import BaseModel


class Request(BaseModel):
    """Stores the number of partners a user requested"""
    __tablename__ = 'requests'
    requested_number = Column(Integer, default=0)
    user = relationship('User', back_populates='user_request')
    user_id = Column(Integer, ForeignKey('users.id'), unique=True)
