// App.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Toolbar, Box, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { 
  fetchContacts, 
  createContact, 
  updateContact, 
  deleteContact, 
  toggleBookmark 
} from "./redux/contactSlice";
import ContactsList from "./components/ContactsList";
import ContactForm from "./components/ContactForm";

function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.data);
  const [search, setSearch] = useState("");
  const [label, setLabel] = useState("");
  const [page, setPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    dispatch(fetchContacts({ page, search, label }));
  }, [dispatch, page, search, label]);

  const handleAddContact = (contactData) => {
    dispatch(createContact({ contactData, page, search, label }));
    setOpenDialog(false);
  };

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
            onChange={(e) => setSearch(e.target.value)}
            sx={{ mx: 2 }}
            fullWidth
          />
          <TextField
            label="Filter by label"
            variant="outlined"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            sx={{ mx: 2 }}
          />
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={() => setOpenDialog(true)}
          >
            Add New Contact
          </Button>
        </Toolbar>
      </AppBar>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Contact</DialogTitle>
        <DialogContent>
          <ContactForm onSubmit={handleAddContact} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <ContactsList
        contacts={contacts}
        onDelete={(id) => dispatch(deleteContact({ id, page, search, label }))}
        onUpdate={(id, contactData) => dispatch(updateContact({ id, contactData, page, search, label }))}
        onBookmark={(id) => dispatch(toggleBookmark({ id, page, search, label }))}
        onPageChange={setPage}
      />
    </div>
  );
}

export default App;