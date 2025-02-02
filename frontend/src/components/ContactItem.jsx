import { useState } from "react";
import { Button, Box, Typography, IconButton, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkIcon from '@mui/icons-material/Bookmark';

function ContactItem({ contact, onDelete, onUpdate, onBookmark }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(contact);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onUpdate(contact.id, formData); 
    setIsEditing(false); 
  };

  return (
    <Box 
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        mb: 2,
        border: '1px solid #ddd',
        borderRadius: 1,
        '&:hover': { boxShadow: 2 },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <img src={contact.avatar} alt={contact.name} style={{ borderRadius: '50%', width: 40, height: 40, marginRight: 16 }} />

        {!isEditing ? (
          <>
            <Typography variant="body1">{contact.name}</Typography>
            <Typography variant="body2" sx={{ mx: 2 }}>{contact.phone}</Typography>
          </>
        ) : (
          <>
           
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="standard"
              sx={{ width: 200, marginRight: 1 }}
            />
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              variant="standard"
              sx={{ width: 150 }}
            />
          </>
        )}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {!isEditing ? (
          <>
            <IconButton onClick={() => setIsEditing(true)}><EditIcon /></IconButton>
            <IconButton onClick={() => onDelete(contact.id)}><DeleteIcon /></IconButton>
            <IconButton onClick={() => onBookmark(contact.id)} color={contact.bookmarked ? "primary" : "default"}>
              <BookmarkIcon />
            </IconButton>
          </>
        ) : (
          <form onSubmit={handleEditSubmit}>
            <Button type="submit" variant="contained" size="small">Save</Button>
            <Button 
              type="button" 
              variant="outlined" 
              size="small" 
              onClick={() => setIsEditing(false)} 
              sx={{ ml: 1 }}
            >
              Cancel
            </Button>
          </form>
        )}
      </Box>
    </Box>
  );
}

export default ContactItem;
