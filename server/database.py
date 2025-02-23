from datetime import datetime
from sqlalchemy import create_engine, Column, Integer, String, DateTime, ForeignKey, func, Boolean, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker, scoped_session
from sqlalchemy.orm.exc import NoResultFound
from sqlalchemy.inspection import inspect
from sqlalchemy_utils import database_exists, create_database
from werkzeug.security import generate_password_hash, check_password_hash
import os
from config import BaseConfig  # Import configuration settings


# Determine if the database is SQLite and adjust accordingly
if BaseConfig.SQLALCHEMY_DATABASE_URI.startswith("sqlite://"):
    engine = create_engine(
        BaseConfig.SQLALCHEMY_DATABASE_URI,
        connect_args={'check_same_thread': False}
    )
else:
    # Initialize engine using SQLALCHEMY_DATABASE_URI from config.py
    engine = create_engine(BaseConfig.SQLALCHEMY_DATABASE_URI, echo=True)

# engine = create_engine(BaseConfig.SQLALCHEMY_DATABASE_URI, echo=True)


Session = scoped_session(sessionmaker(bind=engine))
# session = Session()
Base = declarative_base()

class Serializable(object):
    def serialize(self, full=False):
        # Transforms data from dataclasses to a dict,
        # storing primary key of references and handling date format
        d = {}
        for attribute in inspect(self).attrs.keys():
            if isinstance(getattr(self, attribute), (list, tuple)):
                if full:
                    d[attribute] = [element.serialize(full) for element in getattr(self, attribute)]
                else:
                    d[attribute] = [element.id for element in getattr(self, attribute)]
            elif isinstance(getattr(self, attribute), datetime):
                d[attribute] = getattr(self, attribute).strftime("%Y-%m-%d %H:%M:%S")
            else:
                d[attribute] = getattr(self, attribute)
        return d
    
class Contact(Base, Serializable):
    __tablename__= 'contact'

    id = Column(Integer, primary_key=True)
    contact_id = Column(String)
    first_name = Column(String(128))
    last_name = Column(String(128))
    phone_number = Column(String(32))
    address = Column(String(256))
    date = Column(DateTime, default=datetime.utcnow)
    deleted = Column(Integer, default=0)

    def __init__(self, contact_id, first_name, last_name, phone_number, address):
        self.contact_id = contact_id
        self.first_name = first_name
        self.last_name = last_name
        self.phone_number = phone_number
        self.address = address

    def save(self):
        Session.add(self)
        Session.commit()

    def update_firstname(self, new_firstname):
        self.first_name = new_firstname
        Session.commit()
        
    def update_lastname(self, new_lastname):
        self.first_name = new_lastname
        Session.commit()

    def update_phone_number(self, new_phone_number):
        self.first_name = new_phone_number
        Session.commit()

    def update_address(self, new_address):
        self.first_name = new_address
        Session.commit()

    
    
    @classmethod
    def get_by_id(cls, contact_id):
        return Session.query(cls).get(contact_id)

    @classmethod
    def get_by_phone(cls, phone_number):
        return Session.query(cls).filter(cls.phone_number==phone_number).first()

    

    

def initialize():
    if not database_exists(engine.url):
        create_database(engine.url)
    Base.metadata.create_all(engine)

if __name__ == "__main__":
    initialize()