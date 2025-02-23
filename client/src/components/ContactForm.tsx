import { ChangeEvent, useState  } from "react";
import { Button, Form } from "react-bootstrap";
import { Contact } from "../types";
import { v4 as uuid } from 'uuid'
import { API_SERVER } from "../config/constant"


export default function ContatForm () {

    const [ contact, setContact] = useState<Contact>({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
    });

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setContact((contact) => {
            return {
                ...contact,
                [e.target.name]: e.target.value
            };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // prepare the data to send
            const data = {
                contact_id: uuid(),
                first_name: contact.firstName,
                last_name: contact.lastName,
                phone_number: contact.phoneNumber,
                address: contact.address
            };
            console.log(JSON.stringify(data))
            const response = await fetch(`${API_SERVER}/contact/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            };

            const result = await response.json();
            if (result.success) {
                // Handle successful registration
                alert("Contact added successfully!");
                // Reset form
                setContact({
                    firstName: '',
                    lastName: '',
                    phoneNumber: '',
                    address: '',
                });
            } else {
                alert("Failed to add contact: " + result.msg);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while adding the contact");
        }
        }
    

    return(
        <Form onSubmit={handleSubmit}>
            <h3 className="mb-3">Add New Contact</h3>
            <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    name="firstName"
                    value={contact.firstName}
                    type="text"
                    placeholder="Enter first name"
                    onChange={handleOnChange}
                    // style={showError.firstName && {borderColor: "rgb(206,76, 76)"} }
                    />
            </Form.Group>
            <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    name="lastName"
                    value={contact.lastName}
                    type="text"
                    placeholder="Enter last name"
                    onChange={handleOnChange}
                    />
            </Form.Group>
            <Form.Group controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                    name="phoneNumber"
                    value={contact.phoneNumber}
                    type="text"
                    placeholder="Enter phone number"
                    onChange={handleOnChange}
                    />
            </Form.Group>
            <Form.Group controlId="address">
                <Form.Label>Adress</Form.Label>
                <Form.Control
                    name="address"
                    value={contact.address}
                    type="text"
                    placeholder="Enter adress"
                    onChange={handleOnChange}
                    />
            </Form.Group>
            <div className="d-flex justify-content-end">
                <Button variant="primary" type="submit" className="submit-btn">
                    Add Contact
                </Button>
            </div>
        </Form>
    );
};