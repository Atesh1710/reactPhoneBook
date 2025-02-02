export const fetchContacts = async (page = 1, search = "", label = "") => {
    const response = await fetch(`http://localhost:3000/contacts?page=${page}&search=${search}&label=${label}`);
    const data = await response.json();
    console.log("fetching..",data);
    
    return data;
  };
  
  export const createContact = async (contactData) => {
    const response = await fetch("http://localhost:3000/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactData),
    });
    const data = await response.json();
    return data;
  };
  
  export const updateContact = async (contactId, contactData) => {
    console.log("updating data.. ", contactData);
    
    const response = await fetch(`http://localhost:3000/contacts/${contactId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactData),
    });
    const data = await response.json();
    return data;
  };
  
  export const deleteContact = async (contactId) => {
    const response = await fetch(`http://localhost:3000/contacts/${contactId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  };
  
  export const toggleBookmark = async (contactId) => {
    const response = await fetch(`http://localhost:3000/contacts/${contactId}/bookmark`, {
      method: "PUT",
    });
    const data = await response.json();
    return data;
  };
  