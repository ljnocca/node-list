// check nodejs.org/api to see list of built-in modules
// using files system and OS here

const fs = require('fs');
// file system has useful information like appending a file
// const os = require('os');
// os has information about the user
const _ = require('lodash');
// lodash 3rd party library with handy utilities. ex: such as isString, uniq (for unique array)
const yargs = require('yargs');
// yargs parses all the comand line arguments for us that process.argv gave us

const notes = require('./notes.js');


const titleOptions = {
	describe: 'Title of note',
	demand: true,
	alias: 't'
};
const bodyOptions = {
	describe: 'Body of note',
	demand: true,
	alias: 'b'
}

// yargs methods - the command method takes 3 arguments... command name, description of what command does, & an options object that specifies what arguments the command gets
// the 3rd argument object takes a 1)describe property & 2)demand property which sets whether it's required & 3) an alias which is a shortcut for running command
// help call returns useful information when you add the --help on your node call (ex node app.js --help or node app.js add --help)
// then you can string on argv
const argv = yargs
.command('add', 'Add a new note', {
	title: titleOptions,
	body: bodyOptions
})
.command('list', 'List all notes')
.command('read', 'Read a note', {
	title: titleOptions
})
.command('remove', 'Remove a note', {
	title: titleOptions
})
.help()
.argv;
var command = argv._[0];
//process.argv has all the command line arguments

if (command === 'add'){
	var note = notes.addNote(argv.title, argv.body);
	if (note) {
		console.log('Note created');
		notes.logNote(note);
	} else {
		console.log('Note title taken');
	}
} else if (command === 'list') {
	var allNotes = notes.getAll();
	console.log(`Printing ${allNotes.length} note(s).`)
	allNotes.forEach((note)=> notes.logNote(note));
} else if (command === 'read') {
	var note = notes.getNote(argv.title);
	if (note) {
		console.log('Note read');
		notes.logNote(note);
	} else {
		console.log('Note not found');
	}
} else if (command === 'remove') {
	var noteRemoved = notes.removeNote(argv.title);
	var message = noteRemoved ? 'Your note was removed!' : 'Note not found!';
	console.log(message);
} else {
	console.log('Command not recognized');
}