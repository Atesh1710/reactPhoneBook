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
        <button onClick={() => handlePageChange(-1)}>Previous</button>
        <button onClick={() => handlePageChange(1)}>Next</button>
      </div>
    </div>
  );
}

export default ContactsList;
