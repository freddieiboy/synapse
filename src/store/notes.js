//ACTION CREATORS
export const initializeGrid = (grid) => {
  return {
    type: 'INITIALIZE_GRID',
    grid
  }
}

export const addNewNote = (id) => {
  return {
    type: 'ADD_NEW_NOTE',
    id
  }
}

export const setGridMap = (gridMap) => {
  return {
    type: 'SET_GRID_MAP',
    gridMap
  }
}

export const addButtons = (id) => {
  return {
    type: 'ADD_BUTTONS',
    id
  }
}

//INIT STATE
const initialState = {
  grid: {},
  gridMap: [],
  notesList: [],
  buttonsList: [],
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
    case 'SET_GRID_MAP':
      return {
        ...state,
        gridMap: action.gridMap
      }
    case 'ADD_NEW_NOTE':
      const squareId = state.gridMap[action.id].square;
      return {
        ...state,
        totalNotes: state.totalNotes + 1,
        notesList: [...state.notesList, Object.assign({}, squareId, {
          note: true,
          button: false
        })]
      }
    case 'ADD_BUTTONS':
      const refId = state.gridMap[action.id].square;
      return {
        ...state,
        buttonsList: [...state.buttonsList, Object.assign({}, refId, {
          note: false,
          button: true
        })]
      }
    default:
      return state
  }
}

export default notes;
