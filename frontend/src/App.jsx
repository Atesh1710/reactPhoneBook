import { useState, useEffect } from "react";
import "./App.css";
import { fetchContacts, createContact, updateContact, deleteContact, toggleBookmark } from "./api";
import ContactsList from "./components/ContactsList";
import ContactForm from "./components/ContactForm";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { TextField, Button } from '@mui/material';

function App() {
  const [contacts, setContacts] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [label, setLabel] = useState("");

  
  const getContacts = async () => {
    const data = await fetchContacts(page, search, label);
    setContacts(data);
  };

  
  const addContact = async (contactData) => {
    await createContact(contactData);
    getContacts(); 
  };

  
  const removeContact = async (contactId) => {
    await deleteContact(contactId);
    getContacts(); 
  };

  const editContact = async (contactId, contactData) => {
    await updateContact(contactId, contactData);
    getContacts(); 
  };

  
  const toggleContactBookmark = async (contactId) => {
    await toggleBookmark(contactId);
    getContacts(); 
  };

  
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); 
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
    setPage(1); 
  };

  useEffect(() => {
    getContacts();
  }, [page, search, label]);

  return (
    <div className="App">
      <h1>Contact Manager</h1>

      <Stack
        direction={{ xs: 'column', sm: 'column' }}
        spacing={{ xs: 4, sm: 4, md: 4 }}
        sx={{ marginBottom: 10 }}
      >
        <TextField 
        
          label="Search contacts"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          fullWidth
        />
        <Button variant="contained" onClick={() => getContacts()}>
          Search
        </Button>
        <TextField
          label="Filter by label"
          variant="outlined"
          value={label}
          onChange={handleLabelChange}
          fullWidth
        />
        <Button variant="contained" onClick={() => setIsFormVisible(!isFormVisible)}>
          {isFormVisible ? "Cancel" : "Add New Contact"}
        </Button>
      </Stack>

      {isFormVisible && <ContactForm onSubmit={addContact} />}

      <ContactsList
        contacts={contacts}
        onDelete={removeContact}
        onUpdate={editContact}
        onBookmark={toggleContactBookmark}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
