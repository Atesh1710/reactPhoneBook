const db = require("../db");
const getContacts = (req, res) => {
  const { page = 1, search = "", label = "" } = req.query;
  const limit = 10;
  const offset = (page - 1) * limit;

  let query = "SELECT * FROM contacts WHERE name LIKE ?";
  let params = [`%${search}%`];

  if (label) {
    query += " AND label = ?";
    params.push(label);
  }

  query += " ORDER BY name ASC LIMIT ? OFFSET ?";
  params.push(limit, offset);

  db.query(query, params, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

const createContact = (req, res) => {
  const { name, phone, address, label, avatar, bookmarked } = req.body;
  const query =
    "INSERT INTO contacts (name, phone, address, label, avatar, bookmarked) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [name, phone, address, label, avatar, bookmarked],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, ...req.body });
    }
  );
};

const updateContact = (req, res) => {
  const { name, phone, address, label, avatar, bookmarked } = req.body;
  const contactId = req.params.id;

  db.query("SELECT * FROM contacts WHERE id=?", [contactId], (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    const query =
      "UPDATE contacts SET name=?, phone=?, address=?, label=?, avatar=?, bookmarked=? WHERE id=?";
    db.query(
      query,
      [name, phone, address, label, avatar, bookmarked, contactId],
      (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Contact updated successfully" });
      }
    );
  });
};
const deleteContact = (req, res) => {
  db.query("DELETE FROM contacts WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Contact deleted successfully" });
  });
};

const bookmark = (req, res) => {
  db.query(
    "UPDATE contacts SET bookmarked = !bookmarked WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Bookmark toggled successfully" });
    }
  );
};

module.exports = {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
  bookmark,
};
