import React, { Component } from 'react';
import * as c from './colors.js';

const Note = () => {
  const styles = {
    Note: {
      backgroundColor: c.$note,
      height: '5em',
      width: '5em',
      border: '.1em solid' + c.$bg
    }
  }
  return (
    <div className="Note" style={styles.Note}></div>
  )
};

export default Note;
