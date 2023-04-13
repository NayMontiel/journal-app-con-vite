
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { db } from "../../firebase/firebase";
import { filesUpload } from "../../helpers/filesUpload";
import { loadNotes } from "../../helpers/loadNotes";
import { addNewEmptyNote, deleteNote, setActiveNote, setNote, setPhotoToActiveNote, setSeving, sevingNewNote, updateNote } from "./journalSlice";



export const starNewNote = () => {
    return async( dispatch, getState ) => {

        dispatch(sevingNewNote());

        const {uid} = getState().auth;

        const newNote = {
            title: '',
            body: '',
            data: new Date().getTime(),
            imageURL: []
        }

        const newdoc = doc(collection(db, `journal-app/${uid}/notes`));
        await setDoc(newdoc, newNote);

       newNote.id = newdoc.id;

       dispatch( addNewEmptyNote(newNote));
       dispatch( setActiveNote(newNote));

    }
}

export const starLoadingNewNote = () => {
    return async( dispatch, getState ) => {


        const {uid} = getState().auth;
        if (!uid) throw new Error('El uid del usuario no existe');

        const notes = await loadNotes(uid);
        dispatch( setNote(notes));
    }
}

export const starSeveNote = () => {
    return async(dispatch, getState) => {

        dispatch(setSeving());

        const {uid} = getState().auth;
        const {active:note} = getState().journal;

        const noteToFireStore = {...note}
         delete noteToFireStore.id;

        const docRef = doc(db,`journal-app/${uid}/notes/${note.id}` );
        await setDoc(docRef, noteToFireStore, {merge: true})

        dispatch( updateNote(note));
    }
}

export const starUploadingFiles = (files = []) => {
    return async( dispatch ) => {

        dispatch(setSeving());


        // await filesUpload( files[0] );

        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push( filesUpload(file))
            
        }
        const photoUrls = await Promise.all(fileUploadPromises);

        dispatch( setPhotoToActiveNote(photoUrls));

    }
}

export const starDeletingNote = () => {
    return async( dispatch, getState ) => {

        const {uid} = getState().auth;
        const {active:note} = getState().journal;

        //con esto hacemos referencia al doc
        const docRef = doc(db,`journal-app/${uid}/notes/${note.id}` );
        
        //para eliminarlo se hace lo siguiente
        await deleteDoc( docRef )

        dispatch( deleteNote(note.id))
    }
}