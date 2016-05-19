import React from 'react';

const AddNoteButton = () => {
  const styles = {
    AddNoteButton: {
      backgroundColor: 'white',
      height: '4em',
      width: '4em'
      borderRadius: '50%',
      opacity: '.4',
      textAlign: 'center',
      fontSize: '2em'
    }
  }
  render() {
    return (
      <div className="AddNoteButton" style={styles.AddNoteButton}>+</div>
    )
  }
}

export default AddNoteButton;
