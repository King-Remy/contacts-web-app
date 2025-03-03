import Header from './components/Header'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'
import EditModal from './components/EditModal'
import { useState } from 'react'
import { Contact } from './types'

function App() {
  const [ showModal, setShowModal ] = useState(false);
  const [ contactToEdit, setContactToEdit ] = useState<Contact | null>(null);


  const handleOpen = (contact: Contact) => {
    setContactToEdit(contact)
    setShowModal(true)
    
  }
  const handleClose = () => {
    setShowModal(false);
    setContactToEdit(null);
  }

  return (
    <>
      {showModal && <EditModal showModal={showModal} onClose={handleClose} contactToEdit={contactToEdit} />}
      <Header />
      <div style={{ display: 'flex' }}>
        <ContactForm showModal={showModal} />
        <ContactList onEdit={handleOpen}/>
      </div>
      
      
    </>
  )
}

export default App
