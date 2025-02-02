import { useState } from "react";
import { Container, TextField, Button, Grid, Paper, Box } from "@mui/material";

function ContactForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    label: "",
    avatar: "",
    bookmarked: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: "",
      phone: "",
      address: "",
      label: "",
      avatar: "",
      bookmarked: false,
    });
  };

  return (
    <Box sx={{ width: '100%', padding: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="name"
                    label="Name"
                    variant="standard"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    id="phone"
                    label="Phone"
                    variant="standard"
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    id="label"
                    label="Label"
                    variant="standard"
                    type="text"
                    name="label"
                    value={formData.label}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    id="address"
                    label="Address"
                    variant="standard"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    id="avatar"
                    label="Avatar URL"
                    variant="standard"
                    type="text"
                    name="avatar"
                    value={formData.avatar}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Add Contact
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ContactForm;
