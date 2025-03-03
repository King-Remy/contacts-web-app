import { ChangeEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import { Contact } from "../types";
import ContactForm from './ContactForm';
import { Button } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";

interface ModalProps {
  showModal: boolean;
  onClose: () => void;
  contactToEdit: Contact | null;
//   onSave: () => void;
}

export default function EditModal({
    showModal,
    onClose: handleClose,
    contactToEdit
//   onSave: handleSave,
}: ModalProps) {



  return (
    <div
    className={`${"modal"} ${showModal ? "display-block" : "display-none"}`}
  >
    <div className="modal-main">
      <ContactForm showModal={showModal} contactToEdit={contactToEdit} onEditSuccess={handleClose} />
      <div className="btn-container">
      <Button onClick={handleClose}>
          <AiFillDelete size={20} color='red' className='icon' />
      </Button>
      </div>
    </div>
  </div>
  );
}