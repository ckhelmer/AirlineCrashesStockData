import sqlalchemy
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template

################################
#### Connection to Database ####
################################

# Create our session (link) from Python to the DB
engine = create_engine("sqlite:///airplanestocks.sqlite")

session = Session(engine)
# reflect an existing database into a new model
Base = declarative_base()

#Declare the bases because automap doesn't work
class AmericanCrashes(Base):
    __tablename__ = "american_crashes"
    id = Column(Integer, primary_key = True)
    date = Column(String(10))
    manufacturer = Column(String(255))
    carrier = Column(String(255))
    fatalities = Column(Integer)
    location = Column(String(255))
 
class AllCrashes(Base):
    __tablename__ = "all_crashes"
    id = Column(Integer, primary_key = True)
    date = Column(String(10))
    manufacturer = Column(String(255))
    carrier = Column(String(255))
    fatalities = Column(Integer)
    location = Column(String(255)) 

####################################
############# Flask ################
####################################
app = Flask(__name__)

@app.route('/api')
def api():
    return render_template('api.html')

@app.route('/api/american_carriers')
def american_crashes():
    engine = create_engine("sqlite:///airplanestocks.sqlite")

    session = Session(engine)
    
    results = session.query(AmericanCrashes.date, AmericanCrashes.manufacturer, AmericanCrashes.carrier, AmericanCrashes.fatalities, AmericanCrashes.location).all()
    american_carriers = []
    for result in results:
        american_dict = {}
        american_dict['date'] = result.date
        american_dict['manufacturer'] = result.manufacturer
        american_dict['carrier'] = result.carrier
        american_dict['fatalities'] = result.fatalities
        american_dict['location'] = result.location
        american_carriers.append(american_dict)
        
    return jsonify(american_carriers)


@app.route('/api/all_carriers')
def all_crashes():
    engine = create_engine("sqlite:///airplanestocks.sqlite")

    session = Session(engine)
    
    results = session.query(AllCrashes.date, AllCrashes.manufacturer, AllCrashes.carrier, AllCrashes.fatalities, AllCrashes.location).all()
    
    airline_carriers = []
    for date, manufacturer, carrier, fatalities, location in results:
        airline_dict = {}
        airline_dict['date'] = date
        airline_dict['manufacturer'] = manufacturer
        airline_dict['carrier'] = carrier
        airline_dict['fatalities'] = fatalities
        airline_dict['location'] = location
        airline_carriers.append(airline_dict)
        
    return jsonify(airline_carriers)    

@app.route('/stock_impact')
def stock_impact():
    return render_template('stock_impact.html')

@app.route('/crashdata')
def crash():    
    return render_template('crashdata.html')

@app.route('/stock_comparison')
def datastock():
    return render_template('stock_comparison.html')

@app.route('/')
def home():
    return render_template('index.html')
    
if __name__ == '__main__':
    app.run(debug=True, port = 5000)    