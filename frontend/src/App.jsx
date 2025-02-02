import { useState, useEffect } from "react";
import "./App.css";
import { fetchContacts, createContact, updateContact, deleteContact, toggleBookmark } from "./api";
import ContactsList from "./components/ContactsList";
import ContactForm from "./components/ContactForm";

function App() {
  const [contacts, setContacts] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [label, setLabel] = useState("");

  // Fetch contacts with pagination, search, and label filter
  const getContacts = async () => {
    const data = await fetchContacts(page, search, label);
    setContacts(data);
  };
  console.log("ff",contacts);
  
  // Add new contact
  const addContact = async (contactData) => {
    await createContact(contactData);
    getContacts(); // Refresh the contacts list
  };

  // Delete a contact
  const removeContact = async (contactId) => {
    await deleteContact(contactId);
    getContacts(); // Refresh the contacts list
  };

  // Update a contact
  const editContact = async (contactId, contactData) => {
    await updateContact(contactId, contactData);
    getContacts(); // Refresh the contacts list
  };

  // Toggle bookmark for a contact
  const toggleContactBookmark = async (contactId) => {
    await toggleBookmark(contactId);
    getContacts(); // Refresh the contacts list
  };

  // Search and pagination
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to the first page when searching
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
    setPage(1); // Reset to the first page when changing label
  };

  useEffect(() => {
    getContacts();
  }, [page, search, label]);

  return (
    <div className="App">
      <h1>Contact Manager</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search contacts"
          value={search}
          onChange={handleSearchChange}
        />
         <button onClick={() => getContacts()}>Search</button>
        <input
          type="text"
          placeholder="Filter by label"
          value={label}
          onChange={handleLabelChange}
        />
        <button onClick={() => setIsFormVisible(!isFormVisible)}>
          {isFormVisible ? "Cancel" : "Add New Contact"}
        </button>
      </div>

      {isFormVisible && <ContactForm onSubmit={addContact} />}
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
