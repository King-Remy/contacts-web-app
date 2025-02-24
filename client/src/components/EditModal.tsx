import { ChangeEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import { Contact } from "../types";

interface ModalProps {
  onClose: () => void;
//   onSave: () => void;
}

export default function Modal({
  onClose: handleClose,
//   onSave: handleSave,
}: ModalProps) {
  const [ contact, setContact] = useState<Contact>({
          contact_id: '',
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

  const updateContact = () => {
    setContact({
        contact_id: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
    })
  };

  return (
    <div className="backdrop">
      <div className="modal">
        <input
          placeholder="First name"
          value={contact.firstName}
          onChange={handleOnChange}
        />
        <input
          placeholder="Last name"
          value={contact.lastName}
          onChange={handleOnChange}
        />
        <input
          placeholder="Phone number"
          value={contact.phoneNumber}
          onChange={handleOnChange}
        />
        <input
          placeholder="Address"
          value={contact.address}
          onChange={handleOnChange}
        />
        <button onClick={updateContact}>Save</button>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
}