import { createSlice } from '@reduxjs/toolkit';
export const journalSlice = createSlice({
name: 'journal',
 initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null,
 },
 reducers: {
    sevingNewNote: ( state ) => {
        state.isSaving = true;
    },

    addNewEmptyNote: ( state, action  ) => {
        state.notes.push(action.payload);
        state.isSaving = false;
    },

    setActiveNote: ( state, action  ) => {
        state.active = action.payload;
        state.messageSaved = '';
    },

    setNote: ( state, action  ) => {
        state.notes = action.payload;
    },
    setSeving: ( state ) => {
        state.isSaving = true;
        state.messageSaved = '';
    },
    updateNote: ( state, action  ) => {
        state.isSaving = false;
        state.notes = state.notes.map(note => {
            if (note.id === action.payload.id) {
                return action.payload;
            }

            return note;
        })
        //mostrar msj de actualizacion
        state.messageSaved = `${action.payload.title}, actualizada correctamente `
    },

    setPhotoToActiveNote: (state, action  ) => {
        state.active.imageURL = [ ...state.active.imageURL, ...action.payload  ];
        state.isSaving = false;
    },

    clearNoteLogout: (state ) => {
        state.isSaving = false;
        state.messageSaved = '';
        state.notes = [];
        state.active = null;
    },

    deleteNote: (state, action  ) => {
        state.active = null;
        state.notes = state.notes.filter( note => note.id !== action.payload)
    },
 }
});
export const { sevingNewNote, addNewEmptyNote, setActiveNote, setNote, setSeving, updateNote, setPhotoToActiveNote, clearNoteLogout ,deleteNote } = journalSlice.actions;