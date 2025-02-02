import { useState, useEffect } from "react";
import { AppBar, Toolbar, Box, TextField, Button, Container, Stack, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { fetchContacts, createContact, updateContact, deleteContact, toggleBookmark } from "./api";
import ContactsList from "./components/ContactsList";
import ContactForm from "./components/ContactForm";

function App() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [label, setLabel] = useState("");
  const [page, setPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);

 
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

  
  const handleLabelChange = (e) => {
    setLabel(e.target.value);
    setPage(1); 
  };

 
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

 
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

 
  const handleClose = () => {
    setOpenDialog(false);
  };

  
  const handleFilterClick = () => {
    getContacts(); 
  };

  
  useEffect(() => {
    getContacts();
  }, [page, search, label]);

  return (
    <div className="App">
      <AppBar position="static" sx={{ mb: 3 }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Button variant="text" color="inherit">Logo</Button>
          </Box>
          <TextField
            label="Search contacts"
            variant="outlined"
            value={search}
            onChange={handleSearchChange}
            sx={{ mx: 2 }}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={handleFilterClick}>
            Filter
          </Button>
          <TextField
            label="Filter by label"
            variant="outlined"
            value={label}
            onChange={handleLabelChange}
            sx={{ mx: 2 }}
          />
          <Button variant="contained" color="secondary" onClick={handleClickOpen}>
            Add New Contact
          </Button>
        </Toolbar>
      </AppBar>

     
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Add New Contact</DialogTitle>
        <DialogContent>
          <ContactForm onSubmit={addContact} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      
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
