import React, { Component } from 'react';
import * as c from './colors.js';
import NoteContainer from './NoteContainer.jsx';
import GridCell from './GridCell.jsx';
import $ from 'jquery';
import { connect } from 'react-redux'
import { addNewNote, incrementTotalNotes } from '../store/notes.js';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // totalNotes: 0,
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
    let totalNotes = this.props.totalNotes
    const note =  {
      xpos: 300,
      ypos: 500,
      text: '',
      createdAt: createdAt.getTime(),
      EditedAt: 'xxx',
      id: totalNotes
    }

    this.props.addNewNote(note)
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

    if (grid.xpos !== undefined) {
      xpos = grid.xpos;
      ypos = grid.ypos;
    } else {
      xpos = [];
      ypos = [];
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
        noteSize={this.state.noteSize}
        xpos={note.xpos}
        ypos={note.ypos}
        />
    })
    console.log('notesList', this.props.notesList)
    console.log('totalNotes', this.props.totalNotes)
    // console.log('totalNotes', this.props.addNewNote)
    // console.log('totalNotes', this.props.incrementTotalNotes)
    return (
      <div className="Dashboard grid g-horizontal" style={styles.Dashboard}>
        <div className="g-cell g-cell-1">
          {xGridLines}
          {yGridLines}
          {note}
          {/*<NoteContainer noteSize={this.state.noteSize} xpos={xpos[2]} ypos={ypos[2]} />*/}
          {/*<NoteContainer xpos={xpos[random()]} ypos={ypos[random()]} />*/}
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
    totalNotes: state.totalNotes
  }
}

const MapDispatchToProps = (dispatch) => {
  return {
    addNewNote: (note) => {
      dispatch(addNewNote(note))
    }
  }
}

export default connect(mapStateToProps, MapDispatchToProps)(Dashboard);
