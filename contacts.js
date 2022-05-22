const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "db", "contacts.json");
const { nanoid } = require("nanoid");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const allContacts = JSON.parse(data);
  return allContacts;
};

const getContactById = async (contactId) => {
  const conacts = await listContacts();
  const contactById = conacts.find((item) => item.id === contactId);
  if (!contactById) {
    return null;
  }
  return contactById;
};

const removeContact = async (contactId) => {
  const conacts = await listContacts();
  const removeId = conacts.findIndex((item) => item.id === contactId);
  if (removeId === -1) {
    return null;
  }
  const [removeContact] = conacts.splice(removeId, 1);
  await fs.writeFile(contactsPath, JSON.stringify(conacts));
  return removeContact;
};

const addContact = async (name, email, phone) => {
  const data = { name, email, phone };
  const conacts = await listContacts();
  const newContact = { ...data, id: nanoid(3) };
  conacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(conacts));
  return newContact;
};

const productOperation = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};

module.exports = productOperation;
