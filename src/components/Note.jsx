import React, { Component } from 'react';
import * as c from './colors.js';

const Note = ({xpos, ypos}) => {
  const styles = {
    Note: {
      backgroundColor: c.$note,
      height: '100px',
      width: '100px',
      border: '.1em solid' + c.$bg,
      position: 'absolute',
      top: ypos ? ypos : '',
      left: xpos ? xpos : '',
    }
  }
  // console.log(xpos);
  return (
    <div className="Note" style={styles.Note}></div>
  )
};

export default Note;
