// ============= NOTE DISPLAY ===========

function NoteDisplay(props) {
  let notes = props.notes;
  let notesToDisplay = notes.map((note, index) => {
    return (
      <div className="note" key={index} id={index}>
        <p>{note}</p>
        <button className="delete-note-button" onClick={props.onClick}>X</button>
      </div>
    )
  });

  console.log('notesToDisplay: ', notesToDisplay);

  return (
    <div className="note-display">
      {notesToDisplay}
    </div>
  )
}

// ============ NOTE INPUT ==============
function NoteInput(props) {
  return (
    <div className="note-input-form">
      <label htmlFor="note-input">My note:</label>
      <input id="note-input" type="text" className="note-input" placeholder="Write your note here" onKeyUp={props.onKeyUp}/>
      <button className="save-note-button" onClick={props.onClick}>Save note</button>
    </div>
  )
}

// ============ NOTES APP ===============
class NotesApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleReturnInput = this.handleReturnInput.bind(this);
    console.log('this in NotesApp constructor is ', this);
  }

  handleInput(e) {
    // If input field is not empty:
    if (e.target.previousElementSibling.value) {
      let newNote = e.target.previousElementSibling.value;
      this.setState({
        notes: [...this.state.notes, newNote]
      });
      e.target.previousElementSibling.value = '';
    }
  }

  handleReturnInput(e) {
    console.log('e in handleReturnInput is ', e);
    // Enter: keyCode = 13
    // If input field is not empty:
    if (e.target.value) { // doppelt, siehe handleInput --> DRY!
      let newNote = e.target.value;

      this.setState({
        notes: [...this.state.notes, newNote]
      });
      e.target.value = '';
    } 
  }

  handleDelete(e) {
    console.log('handleDelete runs');
    // get id of item to delete
    let idToDelete = parseInt(e.target.parentElement.id);
    console.log('this is', this); // exp: this is NotesApp, reality: 60%

    console.log('this.state.notes is ', this.state.notes);
    let notes = this.state.notes;
    let newNotes = notes.filter((note, index) => index !== idToDelete);
    console.log('newNotes: ', newNotes);

    this.setState({
      notes: newNotes // OR: [...newNotes]?
    }); // Does this re-render DOM?
    console.log('this.state.notes after newNotes is ', this.state.notes); // still shows deleted note in notes, but state change triggers re-render. Upon re-render, 'notes' in NoteDisplay is empty. Yay!!!
  }

  render() {
    console.log('this.props in NotesApp component:', this.props);
    console.log('this.state in NotesApp component: ', this.state);

    return (
      <div className="notes-app">
        {/* NoteInput component */}
        {/* is onKeyUp the correct event handler for hitting the return key? onSubmit? */}
        <NoteInput onClick={this.handleInput} onKeyUp={(e) => {
          if (e.keyCode === 13) {
            return this.handleReturnInput(e) // return or call? // look up what is required in event handlers or callback functions that run event handlers
          }
          }}/>
        {/* NoteDisplay component */}
        <NoteDisplay notes={this.state.notes} onClick={this.handleDelete}/>
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<NotesApp />)

//==== CONTINUE with deleting notes. Do I need keys for that? See https://reactjs.org/docs/lists-and-keys.html 

// Filter notes in handleDelete, change state there

// BUGS 
/* 
- Saving a note works even without input
- Input cannot be saved by hitting return
- 

SHOULD HAVES
- It should have the ability to edit a note. 
- It should display the date it was created/last edited.
- Input UI more complex: 
  - Title
  - Note text
  - Hit 'save note' button or hit Return
- Note display UI like this: URL: https://dribbble.com/shots/11875872-A-simple-and-lightweight-note-app
  --> Best way to realize this? Flexbox? Bootstrap? Play around with it in CodePen. Do FlexBox tutorial first.
*/

/*

Component hierarchy:
- NotesApp
 // takes props // is common owner of NoteInput and NoteDisplay --> state lives here
  - NoteInput // needs to update notes state
  - NoteDisplay: // rendered based on NoteInput state change

*/