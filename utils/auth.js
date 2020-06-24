import firebase, { localPersistence } from "./firebase";

export const signOut = () => firebase.auth().signOut();

export const getCurrentUserUid = () => firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;
export const getCurrentUserName = () => firebase.auth().currentUser ? firebase.auth().currentUser.displayName : null;
export const getCurrentUser = () => firebase.auth().currentUser;

export const signIn = (email, password, onSuccess, onError) => firebase.auth().setPersistence(localPersistence)
    .then(() => firebase.auth().signInWithEmailAndPassword(email, password).then(onSuccess).catch(onError))
    .catch((error) => { alert(error); console.log(error); });