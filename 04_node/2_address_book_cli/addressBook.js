"use strict";
// The node builtin filesystem library.
const fs = require('fs');
const validator = require('validator')
const columnify = require('columnify')

const JSON_FILE = 'data.json'
// If data.json file doesn't exist, create an empty one
ensureFileExists();
// This is where our Address Book is stored.
var data = JSON.parse(fs.readFileSync(JSON_FILE));

//the message that will be displayed  If no arguments are specified or if user types help
const helpString = "\n\tUsage: addressBook [options] [command]\n\n\n" +"\tOptions:\n" + "\t\thelp   Show this help message and quit"+"\n\n\n\tCommands:\n" + "\t\tadd       Create Contact\n" + "\t\tdisplay   Display all contacts in directory\n" + "\t\tupdate    Update existing contact\n"


const argv = process.argv
//console.log(process.argv) //UNCOMMENT TO SEE WHAT PROCESS.ARGV IS BEFORE WE SPLICE
argv.splice(0,2); //remove 'node' and path from args, NOTE: splicing modifies process.argv, so you will not need to do this again!


//------------PART1: PARSING COMMAND LINE ARGUMENTS------------------------

/**
* Implement parseCommand()
* Using process.argv, find and return the command. If there was no command return "".
* The command will be the first argument the user types. The possible commands are add, update, display, delete, help
* $ node addressBook.js add Moose 123   ----> 'add'
* $ node addressBook.js                ----> ''
*/
function parseCommand() {
  return argv[0] || '';
}

//store the command and execute its corresponding function
var input = parseCommand()
switch(input){
  case "add":
    addContact();
    break;
  case "update":
    updateContact();
    break;
  case "delete":
    deleteContact()
    break;
  case "display":
    displayContacts();
    break;
  default:
    console.log(helpString); //if command = 'help' or invalid command, print help
}

//----------------- PART 2 'display' command---------------------//

/**
*
* Implement displayContacts()
* Display the contacts in the address book in the format specified in the readme (HERE IS WHERE WE USE COLUMNIFY NPM MODULE)
* If the contact does not have a phone number listed, you should display "-None-" in the PHONE_NUMBER fIELD
*
* Do not return anything, console.log() the contacts
*
*/
function displayContacts() {
  console.log(columnify(data, {
    headingTransform: (heading) => {
      if (heading === 'name') return 'CONTACT_NAME'
      else if (heading === 'number') return 'PHONE_NUMBER'
    },
    dataTransform: (data) => {
      if (data === '-1') return '-None-'
      else return data
    }
  }))
}

function isAlphabetic(str) {
  return /^[a-z]+$/i.test(str)
}

function isNumeric(str) {
  return /^\d+$/.test(str)
}

//----------------- PART 3 'add' command---------------------//
/**
* Implement addContacts()
* This is a function that is called to create a new contact.
* Calling `node add contactName contactNumber ` must call our function addContact.
* it should get the name and number of the Contact from process.argv
* You should only create a new contact if a name is provided that doesnt already exist inside your address book (no duplicate contacts)
* and if the name consists of only letters and the number consists of only numbers
* name: string, number: number
* if no number is provided, store -1 as their number
*/
function addContact() {
  const name = argv[1];
  const number = argv[2];
  if (name === undefined) {
    console.log('First argument (name) was not given')
  } else if (!isAlphabetic(name)) {
    console.log('Name (first argument) must contain only alphabetic characters')
  } else if (!isNumeric(number)) {
      console.log('Number (second argument) must consist of only digits')
  } else if (data.indexOf(name) !== -1) {
    console.log(`${name} already in Address Book`)
  } else {
    if (number === undefined) number = -1
    data.push({ 'name': name, 'number': number });
    console.log(`Added ${name} with phone number ${number}`)
  }
}

//----------------- PART 4 'update' command---------------------//
/**
* Implement updateContact()
* This is a function that is called to update an existing contact.
* Calling `node addressBook.js update contactName newContactNumber ` updates the number of contact with name contactName to be newContactNumber.
* Calling `node addressBook.js update contactName newContactName ` updates the name of contact with name contactName to be newContactName.
* it should get the name and update field of the Contact from process.argv
* You should only update a contact if it exists inside your address book and the new name or number is valid
*
*/
function updateContact(){
  const contactName = argv[1]
  const newInfo = argv[2]
  let newInfoIsName // boolean
  if (isAlphabetic(newInfo)) newInfoIsName = true
  else if (isNumeric(newInfo)) newInfoIsName = false
  else {
    console.log('New info (second argument) must be either all letters or all numbers')
    return
  }
  const index = data.indexOf(contact)
  if (index === -1) {
    console.log('Contact to update was not found')
    return
  }
  const oldContactObj = data[index]
  if (newInfoIsName) oldContactObj['name'] = newInfo
  else objContactObj['number'] = newInfo
}


//BONUS Implement deleteContact
function deleteContact(){
    //YOUR CODE HERE
}



// ---Utility functions---

// We use these functions to read and modify our JSON file.
function writeFile(data) {
  fs.writeFileSync(JSON_FILE, JSON.stringify(data, null, 2));
}

function ensureFileExists() {
  if (! fs.existsSync(JSON_FILE)) {
    writeFile([]);
  }
}


// This command writes  our tasks to the disk
writeFile(data);
