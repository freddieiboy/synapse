import React, { Component } from 'react';
import * as c from './colors.js';
import NoteContainer from './NoteContainer.jsx';
import AddNoteButton from './AddNoteButton.jsx';
import GridCell from './GridCell.jsx';
import $ from 'jquery';
import { connect } from 'react-redux'
import { addNewNote, initializeGrid, setGridMap } from '../store/notes.js';
import { flattenObject } from './utils.js';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.inititalizeGrid();
  }
  componentDidMount = () => {
    // this.inititalizeGrid();
  }
  componentWillUpdate() {
    console.log('dashboard is updating')
  }
  inititalizeGrid = () => {
    const noteSize = this.props.noteSize;
    const width = $(window).width();
    const height = $(window).height();

    const createGrid = (noteSize, width, height) => {
      const xpos = getCoordinates(noteSize, width/noteSize, 'x');
      const ypos = getCoordinates(noteSize, height/noteSize, 'y');
      const grid = {xpos, ypos};
      return grid;
    }

    const getCoordinates = (noteSize, amount, type) => {

      let coordinates = [];
      let counter = 0;
      for(let n = 0; n < amount; n++) {
        var coor = coordinates.push(noteSize *  n);
      }
      return coordinates;
    }

    const grid = new createGrid(noteSize, width, height);
    this.props.initializeGrid(grid)
  }
  addNote = () => {
    const createdAt = new Date();
    let totalNotes = this.props.totalNotes
    const note = {
      xpos: 0,
      ypos: 0,
      text: '',
      createdAt: createdAt.getTime(),
      EditedAt: 'xxx',
      id: totalNotes
    }

    this.props.addNewNote(note)
  }
  createGridFams = () => {
    const initialGrid = this.props.grid;
    const totalPoints = initialGrid.xpos.length * initialGrid.ypos.length;
    let totalGridObjects = [];

    //create totalGridObject
    for(let i = 0; i < totalPoints; i++) {
      totalGridObjects =
      [...totalGridObjects, {'square': {
        id: i,
        xpos: 0,
        ypos: 0,
        button: true,
        note: false
      }}]
    }

    //set X, Y positions
    let xpos = 0;
    let ypos = 0;
    for(let i = 0; i < totalPoints; i++) {
      if (xpos === initialGrid.xpos.length) {
        xpos = 0;
        ypos++
      }
      totalGridObjects[i].square.xpos = initialGrid.xpos[xpos]
      totalGridObjects[i].square.ypos = initialGrid.ypos[ypos]
      xpos++
    }

    // console.log('totalPoints', totalPoints)
    // console.log('totalGridObjects', totalGridObjects)
    // console.log('singleGridObject', totalGridObjects[30])
    // console.log('originalGrid:', initialGrid)
    this.props.setGridMap(totalGridObjects)
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
    let xposCenter;
    let yposCenter;
    let loadedGrid = [];
    const grid = this.props.grid;

    if (grid.xpos !== undefined) {
      loadedGrid = this.props.grid;
      xpos = grid.xpos;
      ypos = grid.ypos;
      xposCenter = Math.floor(grid.xpos.length/2 - 1)
      yposCenter = Math.floor(grid.ypos.length/2 - 1)
      // console.log(xpos, ypos)
    } else {
      // loadedGrid = [];
      xpos = [];
      ypos = [];
      xposCenter = 0;
      yposCenter = 0;
    }

    const xGridLines = xpos.map((xpos, key) => {
      return <GridCell xpos={xpos} key={key}/>
    })
    const yGridLines = ypos.map((ypos, key) => {
      return <GridCell ypos={ypos} key={key}/>
    })

    const random = () => {
      return Math.floor((Math.random() * 4) + 1);
    }

    const square = (newGrid = this.props.gridMap) => {
      console.log('this is being mapped:', newGrid)

      return newGrid.map((family, key) => {
        const fam = flattenObject(family);
        if (fam.note) {
          console.log('note if called')
          return (
            <NoteContainer
              key={fam.id}
              noteSize={this.props.noteSize}
              xpos={fam.xpos}
              ypos={fam.ypos}
              addNewNote={this.props.addNewNote}
              totalNotes={this.props.totalNotes}
              />
          )
        } else if (fam.button) {
          console.log('button if called')
          return (
            <h1>no button</h1>
          )
        } else {
          console.log('else is called')
          return (
            <h1>no notes or button</h1>
          )
        }
      })
    }

    // console.log('notesList', this.props.notesList)
    // console.log('totalNotes', this.props.totalNotes)
    // console.log('grid', this.props.grid)
    // console.log('totalNotes', this.props.addNewNote)
    // console.log('totalNotes', this.props.incrementTotalNotes)
    return (
      <div className="Dashboard grid g-horizontal" style={styles.Dashboard}>
        <div className="g-cell g-cell-1">
          {/*<NoteContainer
            key={1}
            noteSize={this.props.noteSize}
            xpos={xpos[xposCenter]}
            ypos={ypos[yposCenter]}
            addNewNote={this.props.addNewNote}
            totalNotes={this.props.totalNotes}
            />*/}
          {square()}
          {xGridLines}
          {yGridLines}
        </div>
        <div className="infoFooter g-cell g-cell-auto" style={styles.infoFooter}>
          <div className="grid g-main-end">
            <button onClick={this.createGridFams}>Create Fams</button>
            <p style={{margin: '0 1em', color: 'white'}}>Total Notes are: {this.props.totalNotes}</p>
          </div>
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    notesList: state.notesList,
    totalNotes: state.totalNotes,
    noteSize: state.noteSize,
    grid: state.grid,
    gridMap: state.gridMap
  }
}

const MapDispatchToProps = (dispatch) => {
  return {
    initializeGrid: (grid) => {
      dispatch(initializeGrid(grid))
    },
    addNewNote: (note) => {
      dispatch(addNewNote(note))
    },
    setGridMap: (gridMap) => {
      dispatch(setGridMap(gridMap))
    }
  }
}

export default connect(mapStateToProps, MapDispatchToProps)(Dashboard);
