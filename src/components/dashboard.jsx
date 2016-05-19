import React, { Component } from 'react';
import * as c from './colors.js';
import Note from './Note.jsx';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      totalNotes: 0,
      notesList: [],
      note: {}
    }
  }
  addNote = () => {
    const notesList = this.state.notesList;
    const createdAt = new Date();
    let totalNotes = this.state.totalNotes
    totalNotes++
    const note =  {
      positionX: 'x',
      positionY: 'y',
      text: '',
      createdAt: createdAt.getTime(),
      EditedAt: 'xxx',
      id: totalNotes
    }

    if (this.state.totalNotes >= 0) {
      this.setState({
        totalNotes: totalNotes,
        notesList: notesList.concat(note)
      })
    }
  }
  subNote = () => {
    const notesList = this.state.notesList;
    const totalNotes = this.state.totalNotes;
    let decrementTotalNotes = totalNotes;
    decrementTotalNotes--

    if (this.state.totalNotes > 0) {
      const newNotesList = notesList.slice(0, decrementTotalNotes);
      this.setState({
        totalNotes: decrementTotalNotes,
        notesList: newNotesList
      })
    }
  }
  render() {
    const styles = {
      Dashboard: {
        backgroundColor: c.$bg,
        height: '100%',
      },
      infoFooter: {
        height: '2em',
        overflow: 'hidden'
      }
    }
    const notes = this.state.notesList.map((key) => {
      return <Note key={key.id}/>
    })
    console.log(this.state.notesList)
    return (
      <div className="Dashboard grid g-horizontal" style={styles.Dashboard}>
        <div className="g-cell g-cell-1">
          {notes}
        </div>
        <div className="infoFooter g-cell g-cell-auto" style={styles.infoFooter}>
          <div className="grid g-main-end">
            <button onClick={this.addNote}>Add Note</button>
            <button onClick={this.subNote}>Sub Note</button>
            <p style={{margin: '0 1em', color: 'white'}}>Total Notes are: {this.state.totalNotes}</p>
          </div>
        </div>
      </div>
    )
  }
};

export default Dashboard;
