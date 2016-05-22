import React, { Component } from 'react';
import * as c from './colors.js';
import AddNoteButton from './AddNoteButton.jsx';

const NoteContainer = ({xpos, ypos, noteSize, addNewNote, totalNotes}) => {
  const styles = {
    NoteContainer: {
      backgroundColor: c.$note,
      height: noteSize,
      width: noteSize,
      position: 'absolute',
      top: ypos ? ypos : '',
      left: xpos ? xpos : '',
    },
    top: {
      position: 'absolute',
      top: '-50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    bottom: {
      position: 'absolute',
      top: '150%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    right: {
      position: 'absolute',
      top: '50%',
      left: '150%',
      transform: 'translate(-50%, -50%)'
    },
    left: {
      position: 'absolute',
      top: '50%',
      left: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  }

  const parentNote = {
    xpos: xpos,
    ypos: ypos
  }

  const position = [{
      name: 'top',
      style: styles.top
    }, {
      name: 'bottom',
      style: styles.bottom
    }, {
      name: 'right',
      style: styles.right
    }, {
      name: 'left',
      style: styles.left
    }]

  // const addButton = position.map((position) => {
  //   return (
  //     <div className={position.name} key={position.name} style={position.style}>
  //       <AddNoteButton
  //         key={position.name}
  //         noteSize={noteSize}
  //         addNewNote={addNewNote}
  //         totalNotes={totalNotes}
  //         type={position.name}
  //         parentNote={parentNote}
  //         />
  //     </div>
  //   )
  // })
  return (
    <div className="NoteContainer" style={styles.NoteContainer}>
      {/*{addButton}*/}
    </div>
  )
};

export default NoteContainer;
