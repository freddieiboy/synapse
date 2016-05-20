//ACTION CREATORS
export const addNewNote = (note) => {
  return {
    type: 'ADD_NEW_NOTE',
    note
  }
}

//INIT STATE
const initialState = {
  notesList: [],
  totalNotes: 0
}


//REDUCERS
const notes = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NEW_NOTE':
      return {
        ...state,
        totalNotes: state.totalNotes + 1,
        notesList: [...state.notesList, action.note]
      }
    default:
      return state
  }
}

export default notes;
