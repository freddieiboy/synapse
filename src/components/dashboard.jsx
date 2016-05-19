import React, { Component } from 'react';
import * as c from './colors.js';
import Note from './Note.jsx';
import GridCell from './GridCell.jsx';
import $ from 'jquery';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      totalNotes: 0,
      notesList: [],
      noteSize: 100,
      note: {},
      grid: {}
    }
  }
  componentDidMount = () => {
    this.inititalizeGrid();
  }
  inititalizeGrid = () => {
    const noteSize = this.state.noteSize;
    const width = $(window).width();
    const height = $(window).height();

    const createGrid = (noteSize, width, height) => {
      const xpos = getCoordinates(noteSize, width/noteSize);
      const ypos = getCoordinates(noteSize, height/noteSize);
      const grid = {xpos, ypos};
      return grid;
    }

    const getCoordinates = (noteSize, amount) => {
      let coordinates = [];
      for(let n = 0; n < amount; n++) {
        var coor = coordinates.push(noteSize *  n);
      }
      return coordinates;
    }

    const grid = new createGrid(noteSize, width, height);
    this.setState({grid: grid})
  }
  addNote = () => {
    const notesList = this.state.notesList;
    const createdAt = new Date();
    let totalNotes = this.state.totalNotes
    totalNotes++
    const note =  {
      positionX: 'x',
      positionY: 'y',
      text: '',
      createdAt: createdAt.getTime(),
      EditedAt: 'xxx',
      id: totalNotes
    }

    if (this.state.totalNotes >= 0) {
      this.setState({
        totalNotes: totalNotes,
        notesList: notesList.concat(note)
      })
    }
  }
  subNote = () => {
    const notesList = this.state.notesList;
    const totalNotes = this.state.totalNotes;
    let decrementTotalNotes = totalNotes;
    decrementTotalNotes--

    if (this.state.totalNotes > 0) {
      const newNotesList = notesList.slice(0, decrementTotalNotes);
      this.setState({
        totalNotes: decrementTotalNotes,
        notesList: newNotesList
      })
    }
  }
  render() {
    const styles = {
      Dashboard: {
        height: '100%',
      },
      infoFooter: {
        height: '2em',
        overflow: 'hidden'
      }
    }

    let xpos;
    let ypos;
    const grid = this.state.grid;
    const notesList = this.state.notesList;

    if (grid.xpos !== undefined) {
      xpos = grid.xpos;
      ypos = grid.ypos;
    } else {
      xpos = [];
      ypos = [];
    }

    console.log(grid)

    const xGridLines = xpos.map((xpos, key) => {
      return <GridCell xpos={xpos} key={key}/>
    })
    const yGridLines = ypos.map((ypos, key) => {
      return <GridCell ypos={ypos} key={key}/>
    })

    // const random = () => {
    //   return Math.floor((Math.random() * 10) + 1);
    // }
    return (
      <div className="Dashboard grid g-horizontal" style={styles.Dashboard}>
        <div className="g-cell g-cell-1">
          {xGridLines}
          {yGridLines}
          <Note xpos={xpos[8]} ypos={ypos[4]} />
          {/*<Note xpos={xpos[random()]} ypos={ypos[random()]} />*/}
        </div>
        <div className="infoFooter g-cell g-cell-auto" style={styles.infoFooter}>
          <div className="grid g-main-end">
            <button onClick={this.addNote}>Add Note</button>
            <button onClick={this.subNote}>Sub Note</button>
            <p style={{margin: '0 1em', color: 'white'}}>Total Notes are: {this.state.totalNotes}</p>
          </div>
        </div>
      </div>
    )
  }
};

export default Dashboard;
