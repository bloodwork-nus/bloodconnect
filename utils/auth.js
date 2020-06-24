import firebase from "./firebase";

export const signOut = () => firebase.auth().signOut();

export const getCurrentUserUid = () => firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;
export const getCurrentUserName = () => firebase.auth().currentUser ? firebase.auth().currentUser.displayName : null;
export const getCurrentUser = () => firebase.auth().currentUser;