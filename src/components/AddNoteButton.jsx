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
    let newXPos;
    let newYPos;
    if(this.props.type === 'top') {
      newYPos = this.props.parentNote.ypos - this.props.noteSize
      newXPos = this.props.parentNote.xpos
    }
    if(this.props.type === 'bottom') {
      newYPos = this.props.parentNote.ypos + this.props.noteSize
      newXPos = this.props.parentNote.xpos
    }
    if(this.props.type === 'right') {
      newXPos = this.props.parentNote.xpos + this.props.noteSize
      newYPos = this.props.parentNote.ypos
    }
    if(this.props.type === 'left') {
      newXPos = this.props.parentNote.xpos - this.props.noteSize
      newYPos = this.props.parentNote.ypos
    }
    console.log(this.props.parentNote)
    console.log(newYPos, newXPos)
    const note =  {
      xpos: newXPos,
      ypos: newYPos,
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
