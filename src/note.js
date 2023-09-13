// write a simple note taking app
// it should have the following features
// - add a note
// - edit a note
// - delete a note
// - list all notes
// - search notes
// - save notes to local storage
// - load notes from local storage

let notes = [];
let note = { title: "", body: "" };
let search = "";

const Note = { view: () => m("div", "Note") };
const NoteList = { view: () => m("div", "NoteList") };
const Search = { view: () => m("div", "Search") };


function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotes() { 
  notes = JSON.parse(localStorage.getItem("notes"));
}

loadNotes();

function addNote() {
  notes.push(note);
  note = { title: "", body: "" };
  saveNotes();
}

function deleteNote() {
    notes = notes.filter(n => n.title !== note.title);
    note = { title: "", body: "" };
    saveNotes();
}

function editNote() {
    notes = notes.map(n => n.title === note.title ? note : n);
    note = { title: "", body: "" };
    saveNotes();
}   

function searchNotes() {
    notes = notes.filter(n => n.title.includes(search));
    note = { title: "", body: "" };
    saveNotes();
}

function listNotes() {
    notes = notes;
    note = { title: "", body: "" };
    saveNotes();
}

function updateTitle(e) {
  note.title = e.target.value;
}

function updateBody(e) {
    note.body = e.target.value;
}

module.exports = { view: () => m("div", [
    m("h1", "Notes"),
    m("div", [
        m("label", "Title"),
        m("input[type=text]", { oninput: updateTitle, value: note.title })
    ]),
    m("div", [
        m("label", "Body"),
        m("input[type=text]", { oninput: updateBody, value: note.body })
    ]),
    m("button", { onclick: addNote }, "Add Note"),
    m("button", { onclick: deleteNote }, "Delete Note"),
    m("button", { onclick: editNote }, "Edit Note"),
    m("button", { onclick: searchNotes }, "Search Notes"),
    m("button", { onclick: listNotes }, "List Notes"),
    m(NoteList),
    m(Search)
]) };

