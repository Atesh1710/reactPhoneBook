import { Button } from "@mui/material";
import ContactItem from "./ContactItem";

function ContactsList({ contacts, onDelete, onUpdate, onBookmark, onPageChange }) {
  const handlePageChange = (direction) => {
    onPageChange((prevPage) => prevPage + direction);
  };

  return (
    <div className="contacts-list">
      {contacts.map((contact) => (
        <ContactItem 
          key={contact.id}
          contact={contact}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onBookmark={onBookmark}
        />
      ))}

      <div className="pagination">
        <Button  variant="contained" onClick={() => handlePageChange(-1)}>Previous</Button>
        <Button  variant="contained" onClick={() => handlePageChange(1)}>Next</Button>
       
      </div>
    </div>
  );
}

export default ContactsList;
