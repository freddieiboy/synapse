import React, { Component } from 'react';
import * as c from './colors.js';
import AddNoteButton from './AddNoteButton.jsx';

const NoteContainer = ({xpos, ypos}) => {
  const styles = {
    NoteContainer: {
    },
    Note: {
      backgroundColor: c.$note,
      height: '100px',
      width: '100px',
      border: '.1em solid' + c.$bg,
      position: 'absolute',
      top: ypos ? ypos : '',
      left: xpos ? xpos : '',
      position: 'relative'
    },
    top: {
      position: 'absolute',
      top: '-50%',
      transform: 'translate(100%, -50%)'
    },
    bottom: {
      position: 'absolute',
      top: '150%',
      transform: 'translate(100%, -50%)'
    },
    right: {
      position: 'absolute',
      top: '50%',
      left: '100%',
      transform: 'translate(100%, -50%)'
    },
    left: {
      position: 'absolute',
      top: '50%',
      left: '-100%',
      transform: 'translate(100%, -50%)'
    }
  }
  // console.log(xpos);
  return (
    <div className="NoteContainer" style={styles.NoteContainer}>
      <div className="Note" style={styles.Note}>
        <div className="top" style={styles.top}>
          <AddNoteButton />
        </div>
        <div className="bottom" style={styles.bottom}>
          <AddNoteButton />
        </div>
        <div className="right" style={styles.right}>
          <AddNoteButton />
        </div>
        <div className="left" style={styles.left}>
          <AddNoteButton />
        </div>
      </div>
    </div>
  )
};

export default NoteContainer;
