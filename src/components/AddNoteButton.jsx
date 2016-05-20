import React, { Component } from 'react';

class AddNoteButton extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
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
      <div className="AddNoteButton" style={styles.AddNoteButton}>
        <div className="plus" style={styles.plus}>+</div>
      </div>
    )
  }
}

export default AddNoteButton;
