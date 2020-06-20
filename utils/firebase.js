import { API_KEY, PROJECT_ID } from "react-native-dotenv";
import * as firebase from "firebase";
import "firebase/auth";
import "firebase/functions";

const config = {
    apiKey: API_KEY,
    authDomain: `${PROJECT_ID}.firebaseapp.com`,
    projectId: PROJECT_ID,
    databaseURL: `https://${PROJECT_ID}.firebaseio.com`
};

firebase.initializeApp(config);

export default firebase;