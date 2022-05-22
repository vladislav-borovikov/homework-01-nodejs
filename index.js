const productOperation = require("./contacts");
const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const listContact = await productOperation.listContacts();
      console.table(listContact);
      break;

    case "get":
      const contactById = await productOperation.getContactById(id);
      if (contactById === null) {
        return console.log(`ID ${id} not faund`);
      }
      console.log(contactById);
      break;

    case "add":
      const addContact = await productOperation.addContact(name, email, phone);
      console.log(addContact);
      break;

    case "remove":
      const removeById = await productOperation.removeContact(id);
      if (removeById === null) {
        return console.log(`ID ${id} not faund`);
      }
      console.log(`Contact with Id ${id} has been removed`);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
