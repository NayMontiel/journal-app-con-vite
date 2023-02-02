import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../firebase/firebase";


export const loadNotes = async(uid = '') => {
    if (!uid) throw new Error('El uid del usuario no existe');

    const citiesRef = collection(db, `journal-app/${uid}/notes`);
    const docs = await getDocs(citiesRef);

    const notes = [];
    docs.forEach(doc => {
        notes.push({id: doc.id, ...doc.data()})
    });
    // console.log(notes)
    return notes;

}
