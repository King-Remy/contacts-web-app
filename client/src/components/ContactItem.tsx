import { Button } from 'react-bootstrap';
import { Contact } from '../types';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';

interface ContactItemProps extends Contact {
    onEdit: () => void;
  }

export default function ContactItem({ contact_id, firstName, lastName, phoneNumber, address, onEdit }: ContactItemProps) {
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
        <Button>
            <AiFillDelete size={20} color='red' className='icon' />
        </Button>
      </td>
    </tr>
  );
};
;