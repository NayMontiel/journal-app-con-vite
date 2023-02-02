import { loginWithEmailPassword, logoutFirebase, registerUser, singInWithGoogle } from "../../../firebase/providers"
import { clearNoteLogout } from "../../journal/journalSlice"
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = () => {
    return async(dispatch) => {
        dispatch(checkingCredentials())
    }
}

export const startGoogle = () => {
    return async(dispatch) => {
        dispatch(checkingCredentials());

        const result = await singInWithGoogle();

        if (!result.ok) return dispatch( logout( errorMessage ) );

        dispatch(login(result))
    }
};

export const starCreatingUser = ({email, password, displayName}) => {
    return async(dispatch) => {

        dispatch(checkingCredentials());

        const {ok, uid, photoURL, errorMessage} = await registerUser({email, password, displayName})

        if (!ok) return dispatch( logout( {errorMessage} ) );

        dispatch( login( { uid, email, displayName, photoURL } ) );
    } 

};

export const starLogin = ({ email, password }) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());

        const result = await loginWithEmailPassword({ email, password });
            console.log(result);

            if(!result.ok) return dispatch( logout( result ) );

            dispatch(login(result));
    }

}

export const starLogout = () => {
    return async(dispatch) => {
       await logoutFirebase();

       dispatch( clearNoteLogout()); //para limpiar el redux a la hora de cerrar sesion
       dispatch(logout());
    }
}