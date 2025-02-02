import { useState } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
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
    onUpdate(contact.id, formData);
    setIsEditing(false);
  };

  useState(() => {
    setFormData(contact);
  }, [contact]);

  return (
    <div className="contact-item">
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <TextField
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <TextField
            type="text"
            name="label"
            value={formData.label}
            onChange={handleChange}
          />

          <TextField
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />

          <TextField
            type="text"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
          />

          <Button type="submit" variant="contained">
            Save
          </Button>
        </form>
      ) : (
        <>
          <img src={contact.avatar} alt={contact.name} />
          <p>{contact.name}</p>
          <p>{contact.phone}</p>
          <p>{contact.label}</p>
          <Button variant="contained" onClick={() => onDelete(contact.id)}>
            Delete
          </Button>
          <Button variant="contained" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
          <Button variant="contained" onClick={() => onBookmark(contact.id)}>
            {contact.bookmarked ? "Unbookmark" : "Bookmark"}
          </Button>
        </>
      )}
    </div>
  );
}

export default ContactItem;
