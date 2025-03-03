import { Button } from 'react-bootstrap';
import { Contact, RawContact } from '../types';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';

interface ContactItemProps extends Contact {
    onEdit: () => void;
    onDelete: () => void;
  }

export default function ContactItem({ contact_id, firstName, lastName, phoneNumber, address, onEdit, onDelete }: ContactItemProps) {
  return (
    <tr key={contact_id}>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{phoneNumber}</td>
      <td>{address}</td>
      <td>
        <Button onClick={onEdit}>
            <AiFillEdit size={20} color='blue' className='icon' />
        </Button>
      </td>
      <td>
        <Button onClick={onDelete}>
            <AiFillDelete size={20} color='red' className='icon' />
        </Button>
      </td>
    </tr>
  );
};
;