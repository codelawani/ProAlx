from sqlalchemy import Integer, Column, ForeignKey, String
from sqlalchemy.orm import relationship
from .base_model import BaseModel


class RequestedPartners(BaseModel):
    """Stores the number of partners a user requested"""
    __tablename__ = 'requests'

    number = Column(Integer, default=0)
    user = relationship('User', back_populates='requested_partners')
    user_id = Column(String(60), ForeignKey('users.id'), unique=True)
