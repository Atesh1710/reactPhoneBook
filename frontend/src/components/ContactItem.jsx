import { useState } from "react";
import Button from '@mui/material/Button';
function ContactItem({ contact, onDelete, onUpdate, onBookmark }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(contact);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onUpdate(contact.id, formData);  // Pass the updated formData here
    setIsEditing(false);  // Close the form after submitting
  };

  // Ensure formData is reset if contact changes, to prevent stale data issues
  useState(() => {
    setFormData(contact);
  }, [contact]);

  return (
    <div className="contact-item">
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="text"
            name="label"
            value={formData.label}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <input
            type="text"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <>
          <img src={contact.avatar} alt={contact.name} />
          <p>{contact.name}</p>
          <p>{contact.phone}</p>
          <p>{contact.label}</p>
          <Button variant="contained" onClick={() => onDelete(contact.id)}>Delete</Button>
          <Button variant="contained" onClick={() => setIsEditing(true)}>Edit</Button>
           
          <button onClick={() => onBookmark(contact.id)}>
            {contact.bookmarked ? "Unbookmark" : "Bookmark"}
          </button>
        </>
      )}
    </div>
  );
}

export default ContactItem;
