from flask import Flask,jsonify

import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

#Setup to make calls to our database
#Create database connection 
engine = create_engine("sqlite:///airplanestocks.sqlite")

conn = engine.connect()

session = Session(bind = engine)

#Create a class to hold crash data
Base = declarative_base()

class Crashes(Base):
    __tablename__ = "airplane_crashes"
    id = Column(Integer, primary_key = True)
    date = Column(String(10))
    manufacturer = Column(String(255))
    carrier = Column(String(255))
    fatalities = Column(Integer)
    location = Column(String(255))    

#Initialize flask app   
app = Flask(__name__)

@app.route('/')
def home():
    return('Blah')

@app.route('/crash-data')
def crashes():

    #Query the crashes
    results = session.query(Crashes.date, Crashes.manufacturer, Crashes.carrier, Crashes.fatalities, Crashes.location
    return(jsonify(results))


if __name__ == '__main__':
    app.run(debug=True)    