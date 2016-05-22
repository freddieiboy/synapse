//ACTION CREATORS
export const initializeGrid = (grid) => {
  return {
    type: 'INITIALIZE_GRID',
    grid
  }
}

export const addNewNote = (note) => {
  return {
    type: 'ADD_NEW_NOTE',
    note
  }
}

export const setGridMap = (gridMap) =>{
  return {
    type: 'SET_GRID_MAP',
    gridMap
  }
}

//INIT STATE
const initialState = {
  grid: {},
  gridMap: [],
  notesList: [],
  totalNotes: 0,
  noteSize: 100
}


//REDUCERS
const notes = (state = initialState, action) => {
  switch (action.type) {
    case 'INITIALIZE_GRID':
      return {
        ...state,
        grid: action.grid
      }
    case 'ADD_NEW_NOTE':
      return {
        ...state,
        totalNotes: state.totalNotes + 1,
        notesList: [...state.notesList, {
          xpos: action.note.xpos,
          ypos: action.note.ypos,
          text: '',
          createdAt: action.note.createdAt,
          EditedAt: 'xxx',
          id: state.totalNotes + 1
        }]
      }
    case 'SET_GRID_MAP':
      return {
        ...state,
        totalNotes: state.totalNotes + 1,
        gridMap: action.gridMap
      }
    default:
      return state
  }
}

export default notes;
