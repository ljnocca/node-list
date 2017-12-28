const fs = require('fs'); 

var fetchNotes = ()=> {
	try {
		// DOES notes-data.json FILE EXIST? IF YES: PARSE IT
		var notesString = fs.readFileSync('notes-data.json');
		return JSON.parse(notesString);
	} catch (e) {
		// IF NO: return empty array
		return [];
	}
};

var saveNotes = (notes)=> {
	fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

// ------------------------COMMANDS BELOW-------------------------------//

var addNote = (title, body)=> {
	var notes = fetchNotes();
	var note = {
		title,
		body
	};
	// FILTER FOR DUPLICATE TITLES. 
	var duplicateNotes = notes.filter((note)=> note.title === title);

	// IF DUPLICATES DON'T EXIST...
	if (duplicateNotes.length === 0) {
		notes.push(note);
		saveNotes(notes);
		return note;
	} 
};

var getAll = ()=> {
	return fetchNotes();
};

var getNote = (title)=> {
	// fetch note
	var notes = fetchNotes();
	// filter note who's title matches title passed in arg (0 or 1 note)
	var filteredNote = notes.filter((note) => note.title === title);
	// return note (since it's an array you return the first item in the array)
	return filteredNote[0];
}

var removeNote = (title)=> {
	// fetch note
	var notes = fetchNotes();
	// filter notes, so that you do not include the note being 'removed'
	var notesToKeep = notes.filter((note)=> note.title !== title);
	// save new notes array
	saveNotes(notesToKeep);

	// check if a note was removed
	return notes.length !== notesToKeep.length;
}

var logNote = (note) => {
	// break on this line and use repl to output note
	debugger;
	console.log('--');
	console.log(`Title: ${note.title}`);
	console.log(`Body: ${note.body}`);
}

module.exports = {
	addNote,
	getAll,
	getNote,
	removeNote,
	logNote
};