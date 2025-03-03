import { useState, useEffect } from 'react';
import {Tooltip, OverlayTrigger, Pagination } from 'react-bootstrap';
import { API_SERVER } from '../config/constant';
import { Contact, RawContact } from '../types';
import ContactItem from './ContactItem';

interface ContactListProps {
    onEdit: (contact: Contact) => void;
  }

export default function ContactList({ onEdit }: ContactListProps) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleted, setDeleted] = useState('');

  const headCells = [
    { id: 'firstname', label: 'First Name' },
    { id: 'lastname', label: 'Last Name' },
    { id: 'phone_number', label: 'Phone Number' },
    { id: 'address', label: 'Address' },
    { id: 'edit', label: 'Edit' },
    { id: 'delete', label: 'Delete' }
  ];

  const fetchContacts = () => {
    fetch(`${API_SERVER}/contact/${page * rowsPerPage}/${page * rowsPerPage + rowsPerPage}`)
      .then(response => response.json())
      .then(json => {
        // Transform each contact object to have the desired key names.
        const transformedContacts = json.contacts.map((contact: RawContact) => ({
          contact_id: contact.contact_id,             // mapping backend "id" to "contact_id"
          firstName: contact.first_name,        // mapping "first_name" to "firstName"
          lastName: contact.last_name,          // mapping "last_name" to "lastName"
          phoneNumber: contact.phone_number,    // mapping "phone_number" to "phoneNumber"
          address: contact.address              // if the key is the same
        }));
        
        setContacts(transformedContacts);
        setCount(json.count);
      })
      .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
    fetchContacts();
  }, [page, rowsPerPage, deleted]);

  useEffect(() => {
    if (deleted) {
      fetch(`${API_SERVER}/contact/delete/${deleted}`, {
        method: 'POST',
        headers: {
        }
      })
        .then(response => response.json())
        .then(() => {
          setContacts(contacts.filter(contact => !deleted.split('.').includes(contact.contact_id)));
          setDeleted('');
        })
        .catch(error => console.error('Error:', error));
    }
  }, [deleted, contacts]);

  const handleDelete = (contactId: string) => {
    setDeleted(contactId);
  };

  const totalPages = Math.ceil(count / rowsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <div className='contacts-list'>
      {/* Add a title to the list */}
      <h3 className='contacts-list-title'>List of Contacts</h3>
      <div className='contacts-list-table-container'>
        {/* Create a table to display the list of contacts */}
        <table className='contacts-list-table'>
          {/* Define the header of the table */}
          <thead>
                <tr>
                  {headCells.map(headCell => (
                    <th key={headCell.id}>
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id={`tooltip-${headCell.id}`}>
                            {headCell.label}
                          </Tooltip>
                        }
                      >
                        <span>{headCell.label}</span>
                      </OverlayTrigger>
                    </th>
                  ))}
                </tr>
            </thead>
            <tbody>
            {contacts.map(contact => (
                <ContactItem
                key={contact.contact_id}
                {...contact}
                onEdit={() => onEdit(contact)}
                onDelete={() => handleDelete(contact.contact_id)}
                />
            ))}
            </tbody>
        </table>
        <Pagination>
            <Pagination.First onClick={() => handlePageChange(0)} disabled={page === 0} />
            <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page === 0} />
            {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
                key={index}
                active={index === page}
                onClick={() => handlePageChange(index)}
            >
                {index + 1}
            </Pagination.Item>
            ))}
            <Pagination.Next
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages - 1}
            />
            <Pagination.Last
            onClick={() => handlePageChange(totalPages - 1)}
            disabled={page === totalPages - 1}
            />
        </Pagination>
      </div>
    </div>
  );
}