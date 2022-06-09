/*

Component hierarchy:
- Notes // takes props // is common owner of NoteInput and NoteDisplay --> state lives here
  - NoteInput // needs to update notes state
  - NoteDisplay: // rendered based on NoteInput state change
    - Note // rendered based on NoteInput state change

*/

// Note component
function Note(props) {
  console.log('props in Note component:', props);
  return (
    <div className="note">
      <p>{props.noteToDisplay}</p>
      <button className="delete-note-button">X</button>
    </div>
  )
}

// NoteDisplay component
function NoteDisplay(props) {
  console.log('props in NoteDisplay component:', props);
  return (
    <div className="note-display">
      {/* Is it okay to used the same props name as when passing data from the parent component?
      When using a different name, the property key with the name previously used is replaced by the new key. */}
      <Note noteToDisplay={props.note}/>
    </div>
  )
}

// NoteInput component
// state is the list of notes the user inputs
function NoteInput() {
  return (
    <div className="note-input-form">
      <label htmlFor="note-input">My note:</label>
      <input id="note-input" type="text" className="note-input" placeholder="Write your note here"/>
      <button className="save-note-button">Save note</button>
    </div>
  )
}


// Notes component
// TODO:
  // - change into class component
  // - add state
  // - continue building based on URL: https://reactjs.org/docs/thinking-in-react.html
function NotesApp(props) {
  console.log('props in NotesApp component:', props);
  return (
    <div className="notes-app">
      {/* NoteInput component */}
      <NoteInput />
      {/* NoteDisplay component */}
      <NoteDisplay note={note}/>
    </div>
  )
}

const note = 'test test test';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<NotesApp />)