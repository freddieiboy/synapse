import React, { Component } from 'react';
import * as c from './colors.js';
import NoteContainer from './NoteContainer.jsx';
import GridCell from './GridCell.jsx';
import $ from 'jquery';
import { connect } from 'react-redux'
import { addNewNote, initializeGrid, setGridMap } from '../store/notes.js';

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
    const m = new Map();

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
        m.set(type + counter++, noteSize * n)
      }
      return coordinates;
    }

    const grid = new createGrid(noteSize, width, height);
    this.props.initializeGrid(grid)
    this.props.setGridMap(m)
  }
  addNote = () => {
    const createdAt = new Date();
    let totalNotes = this.props.totalNotes
    const note =  {
      xpos: 0,
      ypos: 0,
      text: '',
      createdAt: createdAt.getTime(),
      EditedAt: 'xxx',
      id: totalNotes
    }

    this.props.addNewNote(note)
  }
  subNote = () => {
    //TODO: implement after adding is more polished

    // const notesList = this.state.notesList;
    // const totalNotes = this.state.totalNotes;
    // let decrementTotalNotes = totalNotes;
    // decrementTotalNotes--
    //
    // if (this.state.totalNotes > 0) {
    //   const newNotesList = notesList.slice(0, decrementTotalNotes);
    //   this.setState({
    //     totalNotes: decrementTotalNotes,
    //     notesList: newNotesList
    //   })
    // }
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
    const grid = this.props.grid;

    if (grid.xpos !== undefined) {
      xpos = grid.xpos;
      ypos = grid.ypos;
      xposCenter = Math.floor(grid.xpos.length/2 - 1)
      yposCenter = Math.floor(grid.ypos.length/2 - 1)
      // console.log(xpos, ypos)
    } else {
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

    const note = this.props.notesList.map((note) => {
      return <NoteContainer
        key={note.id}
        noteSize={this.props.noteSize}
        xpos={note.xpos}
        ypos={note.ypos}
        addNewNote={this.props.addNewNote}
        totalNotes={this.props.totalNotes}
        />
    })

    // let points = []

    // const allPossiblePoints = xpos.map((xpos, key) => {
    //   // console.log(key)
    //   const positionLabel = 'x' + key
    //   const mappedPoints = points.concat(positionLabel, xpos);
    //   points = mappedPoints;
    // })
    console.log('grid:', grid)

    for (let [key, value] of this.props.gridMap) {
      console.log(`${key}: ${value}`)
    }

    console.log(...this.props.gridMap)

    // console.log('notesList', this.props.notesList)
    // console.log('totalNotes', this.props.totalNotes)
    // console.log('grid', this.props.grid)
    // console.log('totalNotes', this.props.addNewNote)
    // console.log('totalNotes', this.props.incrementTotalNotes)
    return (
      <div className="Dashboard grid g-horizontal" style={styles.Dashboard}>
        <div className="g-cell g-cell-1">
          <NoteContainer
            key={note.id}
            noteSize={this.props.noteSize}
            xpos={xpos[xposCenter]}
            ypos={ypos[yposCenter]}
            addNewNote={this.props.addNewNote}
            totalNotes={this.props.totalNotes}
            />
          {note}
          {xGridLines}
          {yGridLines}
        </div>
        <div className="infoFooter g-cell g-cell-auto" style={styles.infoFooter}>
          <div className="grid g-main-end">
            <button onClick={this.addNote}>Add Note</button>
            <button onClick={this.subNote}>Sub Note</button>
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
