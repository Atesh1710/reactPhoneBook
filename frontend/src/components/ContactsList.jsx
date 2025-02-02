import { Button } from "@mui/material";
import ContactItem from "./ContactItem";

function ContactsList({ contacts, onDelete, onUpdate, onBookmark, onPageChange }) {
  const handlePageChange = (direction) => {
    onPageChange((prevPage) => prevPage + direction);
  };

  return (
    <div>
      {contacts.map((contact) => (
        <ContactItem 
          key={contact.id}
          contact={contact}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onBookmark={onBookmark}
        />
      ))}

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
        <Button variant="contained" onClick={() => handlePageChange(-1)} sx={{ mr: 2 }}>Previous</Button>
        <Button variant="contained" onClick={() => handlePageChange(1)}>Next</Button>
      </div>
    </div>
  );
}

export default ContactsList;
