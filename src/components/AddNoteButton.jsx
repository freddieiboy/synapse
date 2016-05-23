import React, { Component } from 'react';
import { ifStyle } from './utils.js';

class AddNoteButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPressed: false
    }
  }
  addButton = () => {
    this.props.addNewNote(this.props.reference)
    console.log(this.props.reference)
  }
  pressButton = () => {
  !this.state.isPressed ? this.setState({isPressed: true}) : this.setState({isPressed: false})
  }
  render() {
    let {noteSize, ypos, xpos} = this.props;
    const styles = {
      ButtonContainer: {
        backgroundColor: 'transparent',
        height: noteSize,
        width: noteSize,
        position: 'absolute',
        top: ypos ? ypos : '',
        left: xpos ? xpos : '',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      AddNoteButton: {
        backgroundColor: 'white',
        height: noteSize/3,
        width: noteSize/3,
        borderRadius: '50%',
        opacity: '.05',
        textAlign: 'center',
      },
      plus: {
        fontSize: '1.7em',
      },
      press: {
        opacity: '.2'
      },
      hide: {
        display: 'none'
      }
    }
    return (
      <div className="ButtonContainer" style={styles.ButtonContainer}>
        <div className="AddNoteButton" onMouseDown={this.pressButton} onMouseUp={this.addButton} style={ifStyle(
            styles.AddNoteButton,
            this.state.isPressed && styles.press
          )}>
          <div className="plus" style={styles.plus}>+</div>
        </div>
      </div>
    )
  }
}

export default AddNoteButton;
