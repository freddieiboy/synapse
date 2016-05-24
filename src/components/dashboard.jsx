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
  // addNote = () => {
  //   const createdAt = new Date();
  //   let totalNotes = this.props.totalNotes
  //   const note = {
  //     xpos: 0,
  //     ypos: 0,
  //     text: '',
  //     createdAt: createdAt.getTime(),
  //     EditedAt: 'xxx',
  //     id: totalNotes
  //   }
  //
  //   this.props.addNewNote(note)
  // }
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
    setTimeout(() => {
      this.createFirstNote();
      this.setButtons();
    }, 100)
  }
  createFirstNote = () => {
    const middlePosition = Math.floor(this.props.gridMap.length / 2);
    this.props.addNewNote(middlePosition - 1)
  }
  setButtons = () => {
    const notesList = this.props.notesList;
    const gridMap = this.props.gridMap;
    let notesIds = [];

    for(let i = 0; i < notesList.length; i++) {
      notesIds = [...notesIds, notesList[i].id]
    }

    const middle = gridMap.filter((grid) => {
      return grid.square.id === 34
    })

    const left = gridMap.filter((grid) => {
      return grid.square.id === 34 - 1
    })

    console.log(middle, left)

    console.log(notesIds)
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
    let totalPossiblePoints
    const grid = this.props.grid;

    if (grid.xpos !== undefined) {
      loadedGrid = this.props.grid;
      xpos = grid.xpos;
      ypos = grid.ypos;
      totalPossiblePoints = xpos.length * ypos.length
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

    const notesList = (notesList = this.props.notesList) => {
      // console.log('this is being mapped:', notesList)

      return notesList.map((family, key) => {
        const fam = flattenObject(family);
        if (fam.note) {
          return (
            <NoteContainer
              key={fam.id}
              reference={fam.id}
              noteSize={this.props.noteSize}
              xpos={fam.xpos}
              ypos={fam.ypos}
              />
          )
        } else if (fam.button) {
          return (
            <AddNoteButton
              key={fam.id}
              reference={fam.id}
              noteSize={this.props.noteSize}
              xpos={fam.xpos}
              ypos={fam.ypos}
              addNewNote={this.props.addNewNote}
              globalGrid={notesList}
              />
          )
        }
      })
    }

    console.log('notesList', this.props.notesList)
    // console.log('totalNotes', this.props.totalNotes)
    // console.log('grid', this.props.grid)
    // console.log('totalNotes', this.props.addNewNote)
    // console.log('totalNotes', this.props.incrementTotalNotes)

    return (
      <div className="Dashboard grid g-horizontal" style={styles.Dashboard}>
        <div className="g-cell g-cell-1">
          {notesList()}
          {xGridLines}
          {yGridLines}
        </div>
        <div className="infoFooter g-cell g-cell-auto" style={styles.infoFooter}>
          <div className="grid g-main-end">
            <button onClick={this.createGridFams}>Create Fams</button>
            <p style={{margin: '0 1em', color: 'white'}}>Current Notes: {this.props.totalNotes}</p>
            <p style={{margin: '0 1em', color: 'white'}}>Max Notes: {totalPossiblePoints}</p>
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
