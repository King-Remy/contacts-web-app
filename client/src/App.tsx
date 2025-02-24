import './App.css'
import Header from './components/Header'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'
import EditModal from './components/EditModal'
import { useState } from 'react'

function App() {
  const [ showModal, setShowModal ] = useState(false);

  const handleOpen = () => setShowModal(true)
  const handleClose = () => setShowModal(false)

  return (
    <>
      {showModal && <EditModal onClose={handleClose} />}
      <Header />
      <div style={{ display: 'flex', gap: '8rem' }}>
        <ContactForm />
        <ContactList onEdit={handleOpen}/>
      </div>
      
      
    </>
  )
}

export default App
