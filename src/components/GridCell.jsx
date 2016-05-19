import React, { Component } from 'react';
import * as c from './colors.js';

const GridCell = ({xpos, ypos}) => {
  const styles = {
    GridCell: {
      position: 'absolute',
      top: ypos ? ypos : '',
      left: xpos ? xpos : '',
      opacity: '.03',
      width: ypos ? '200%' : '',
      height: xpos ? '200%' : '',
      border: '1px solid white'
    }
  }
  // console.log(xpos);
  return (
    <div className="GridCell" style={styles.GridCell}></div>
  )
};

export default GridCell;
