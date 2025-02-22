import { ChangeEvent, useState  } from "react";
import { Button, Form } from "react-bootstrap";

export interface Contact {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string
}

export default function ContatForm () {

    const [ contact, setContact] = useState<Contact>({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
    });

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setContact((contact) => {
            return {
                ...contact,
                [name]: value
            };
        });
    };

    // const handleSubmit: FormEventHandler<HTMLInputElement> = () => {

    // }

    return(
        <Form>
            <h3 className="mb-3">Add New Contact</h3>
            <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    name="firstName"
                    value={contact.firstName}
                    type="text"
                    placeholder="Enter first name"
                    onChange={handleOnChange}
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