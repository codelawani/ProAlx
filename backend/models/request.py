from sqlalchemy import Integer, Column, ForeignKey, String
from sqlalchemy.orm import relationship
from .base_model import BaseModel


class RequestedPartners(BaseModel):
    """
    Represents the number of partners a user has requested.

    Attributes:
        number (int): The number of requested partners.
        user (User): The user associated with the requested partners.
    """
    __tablename__ = 'requests'

    number = Column(Integer, default=0)
    user = relationship('User', back_populates='requested_partners')
    user_id = Column(String(60), ForeignKey('users.id', ondelete='CASCADE'),
                     unique=True)
