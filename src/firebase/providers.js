import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";

import { auth } from "./firebase";

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {
  try {
    const results = await signInWithPopup(auth, googleProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult(results);
    const { displayName, email, photoURL, uid } = results.user;

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    console.log(error);
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
 
    return {
      ok: false,
      errorCode,
      errorMessage
    };
  }
};

export const registerUser = async({email, password, displayName}) => {
    try {
      
     const register = await createUserWithEmailAndPassword(auth, email, password);
     const {uid, photoURL} = register.user;

      //actualizacion del displayName en firebase
      await updateProfile(auth.currentUser, {displayName})
     
     return {
      ok: true,
      uid, photoURL, displayName,
     }
      
    } catch (error) {
      // console.log(error.message);
      
      return { ok: false, errorMessage: error.message}
    }
};

export const loginWithEmailPassword = async({ email, password }) => {
    try {
      const resp = await signInWithEmailAndPassword(auth, email, password);
      const { uid, photoURL, displayName } = resp.user;

      return { ok: true, uid, photoURL, displayName }

    } catch (error) {
      return { ok: false, errorMessage: error.message}
    }
};

export const logoutFirebase = async() => {
    return await auth.signOut();
}
