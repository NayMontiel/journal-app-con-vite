import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout } from "../store/slice/auth/authSlice";
import { starLoadingNewNote } from "../store/journal/thunks";

export const useCheckAuth = () => {
 
  const dispatch = useDispatch()
  const {status} = useSelector( status => status.auth);

  useEffect(() => {
   onAuthStateChanged(auth, async(user) => {
      if(!user) return dispatch( logout());

      const {email, displayName, photoURL, uid } = user;
      dispatch( login({email, displayName, photoURL, uid}));
      dispatch( starLoadingNewNote())
   })
  
   
  }, []);

  return{
    status
  }
}
