from flask import Flask, request, abort, jsonify
from flask_cors import CORS
import os
import json
import database as database

app = Flask(__name__)

app.config.from_object('config.BaseConfig')

CORS(app, supports_credentials=True)

# Setup database
@app.before_first_request
def initialize_database():
    try:
        database.initialize()  # Initializes the database and creates tables based on models.py
    except Exception as e:

        print('> Error: DBMS Exception: ' + str(e) )

        # fallback to SQLite
        from sqlalchemy import create_engine
        BASE_DIR = os.path.abspath(os.path.dirname(__file__))
        app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(BASE_DIR, 'db.sqlite3')

        print('> Fallback to SQLite to',SQLALCHEMY_DATABASE_URI )
        # Reconfigure engine to use SQLite and re-initialize
        engine.dispose()  # Dispose the old engine which might be connected to a different DB
        engine = create_engine(SQLALCHEMY_DATABASE_URI, echo=True)
        database.Base.metadata.bind = engine  # Bind the base metadata to the new engine
        database.initialize()  # Try initializing again with SQLite

"""
   Custom responses
"""

@app.after_request
def after_request(response):
    if response.status_code >= 400:
        data = response.get_data(as_text=True).strip()
        if data:
            try:
                response_data = json.loads(data)
                if "errors" in response_data:
                    response_data = {
                        "success": False,
                        "msg": list(response_data["errors"].items())[0][1]
                    }
                    response.set_data(json.dumps(response_data))
            except json.JSONDecodeError:
                # If the body isn't valid JSON, leave it unchanged.
                pass
        response.headers['Content-Type'] = 'application/json'
    return response


@app.route("/contact/register", methods=['POST'])
def register_contact():

    # Extract request data
    req_data = request.get_json()
    _contact_id = req_data.get("contact_id")
    _firstname = req_data.get("first_name")
    _lastname = req_data.get("last_name")
    _phone_number = req_data.get("phone_number")
    _address = req_data.get("address")

    # Check if contact already exisits
    contact_exist = database.Contact.get_by_id(_contact_id)
    if contact_exist:
        return {"success": False, "msg": "Email already taken"}, 400
    
    # Create new contact

    new_contact = database.Contact(contact_id=_contact_id, first_name=_firstname, last_name=_lastname, phone_number=_phone_number, address=_address)
    new_contact.save()

    return {"success": True,
                "userID": new_contact.contact_id,
                "msg": "The contact was successfully registered"}, 200


@app.route('/contact/<start>/<end>', methods=['GET'])
def get_paginated_contacts(start, end):
    # Retrieve contact data
    with database.Session() as session:
        saved_contacts = [m.serialize() for m in session.query(database.Contact).filter(database.Contact.deleted!=1).order_by(database.Contact.id.desc()).slice(int(start),int(end)).all()]
        print(f"These are the models:{saved_contacts}")
        count = session.query(database.Contact).filter(database.Contact.deleted!=1).count()

    return jsonify({"contacts":saved_contacts, "count":count}) 


@app.route("/contact/edit", methods=['POST'])
def update_contact():

    req_data = request.get_json()

    _contact_id = req_data.get("contact_id")
    _new_firstname = req_data.get("first_name")
    _new_lastname = req_data.get("last_name")
    _new_phone_number = req_data.get("phone_number")
    _new_address = req_data.get("address")
    
    with database.Session() as session:
        contact = session.query(database.Contact).filter(database.Contact.contact_id == _contact_id).all()[0]
        if contact.contact_id != _contact_id:
            return {"success": False, "msg": "Contact not found"}, 404

        if _new_firstname:
            contact.first_name = _new_firstname

        if _new_lastname:
            contact.last_name = _new_lastname

        if _new_phone_number:
            contact.phone_number = _new_phone_number

        if _new_address:
            contact.address = _new_address

        session.commit()

    return {"success": True, "msg": "Contact updated successfully"}, 200
