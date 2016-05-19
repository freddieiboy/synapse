import React, { Component } from 'react';

class AddNoteButton extends Component {

  render() {
    const styles = {
      AddNoteButton: {
        backgroundColor: 'white',
        height: '2em',
        width: '2em',
        borderRadius: '50%',
        opacity: '.4',
        textAlign: 'center',
      },
      plus: {
        fontSize: '1.7em',
      }
    }
    return (
      <div className="AddNoteButton" style={styles.AddNoteButton}>
        <div className="plus" style={styles.plus}>+</div>
      </div>
    )
  }
}

export default AddNoteButton;
