import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config.js";
import { setSocialData, setSaving } from "./socialSlice";

// Carga los datos desde Firebase al iniciar sesión
export const startLoadingData = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        if (!uid) throw new Error('El UID del usuario no existe');

        const docRef = doc(db, `${uid}/socialData`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            dispatch(setSocialData(docSnap.data()));
        }
    }
}

export const startSavingData = () => {
    return async (dispatch, getState) => {
        dispatch(setSaving(true));

        const { uid } = getState().auth;
        const { messages, notifications, directMessagesQueue } = getState().social;

        const dataToSave = { messages, notifications, directMessagesQueue };
        const docRef = doc(db, `${uid}/socialData`);
        await setDoc(docRef, dataToSave, { merge: true });

        dispatch(setSaving(false));
    }
}

