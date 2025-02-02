import  { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="label"
        placeholder="Label"
        value={formData.label}
        onChange={handleChange}
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
      />
      <input
        type="text"
        name="avatar"
        placeholder="Avatar URL"
        value={formData.avatar}
        onChange={handleChange}
      />
      <button type="submit">Add Contact</button>
    </form>
  );
}

export default ContactForm;
