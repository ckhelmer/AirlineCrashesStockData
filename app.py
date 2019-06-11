import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify 

################################
#### Connection to Database ####
################################

engine = create_engine("sqlite:///airplanestocks.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)
print(Base)

# Save reference to the table
AmericanCrashes = Base.classes.american_crashes

AllCrashes = Base.classes.all_crashes

# Create our session (link) from Python to the DB
session = Session(engine)


####################################
############# Flask ################
####################################
app = Flask(__name__)

@app.route('/')
def home():
    return(f"Available Routes:<br/>"
        f"/api/v1.0/american_carriers <br/>"
        f"/api/v1.0/all_carriers")

@app.route('/api/american_carriers')
def crashes():
    results = session.query(AmericanCrashes.date, AmericanCrashes.manufacturer, AmericanCrashes.carrier, AmericanCrashes.fatalities, AmericanCrashes.location)
    
    american_carriers = []
    for date, manufacturer, carrier, fatalities, location in results:
        american_dict = {}
        american_dict['date'] = date
        american_dict['manufacturer'] = manufacturer
        american_dict['carrier'] = carrier
        american_dict['fatalities'] = location
        american_carriers.append(american_dict)
        
        return jsonify(american_carriers)


#@app.route('/api/all_carriers')
#def crashes():
    #results = session.query(AllCrashes.date, AllCrashes.manufacturer, AllCrashes.carrier, AllCrashes.fatalities, AllCrashes.location)
    
    #all_carriers = []
    #for date, manufacturer, carrier, fatalities, location in results:
        #airline_dict = {}
        #airline_dict['date'] = date
        #airline_dict['manufacturer'] = manufacturer
        #airline_dict['carrier'] = carrier
        #airline_dict['fatalities'] = location
        #airline_carriers.append(airline_dict)
        
        #return jsonify(airline_carriers)    
    
    
if __name__ == '__main__':
    app.run(debug=True)    