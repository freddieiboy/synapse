import React, { Component } from 'react';

class AddNoteButton extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //
  //   }
  // }
  addButton = () => {
    const createdAt = new Date();
    const note =  {
      xpos: 400,
      ypos: 600,
      createdAt: createdAt.getTime(),
    }
    return this.props.addNewNote(note)
  }
  render() {
    const styles = {
      AddNoteButton: {
        backgroundColor: 'white',
        height: this.props.noteSize/3,
        width: this.props.noteSize/3,
        borderRadius: '50%',
        opacity: '.1',
        textAlign: 'center',
      },
      plus: {
        fontSize: '1.7em',
      }
    }
    return (
      <div className="AddNoteButton" onClick={this.addButton} style={styles.AddNoteButton}>
        <div className="plus" style={styles.plus}>+</div>
      </div>
    )
  }
}

export default AddNoteButton;
