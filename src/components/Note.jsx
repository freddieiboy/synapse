import React, { Component } from 'react';
import * as c from './colors.js';

const Note = ({xpos}) => {
  const styles = {
    Note: {
      backgroundColor: c.$note,
      height: '50px',
      width: '50px',
      border: '.1em solid' + c.$bg,
      position: 'absolute',
      left: xpos
    }
  }
  // console.log(xpos);
  return (
    <div className="Note" style={styles.Note}></div>
  )
};

export default Note;
