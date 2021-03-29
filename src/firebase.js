import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var config = {
    apiKey: "AIzaSyD1bOHSUuc6sv-kMVbVWKh0pxs4cd2ykxs",
    authDomain: "hemma-mobile.firebaseapp.com",
    databaseURL: "https://hemma-mobile.firebaseio.com",
    projectId: "hemma-mobile",
    storageBucket: "hemma-mobile.appspot.com",
    messagingSenderId: "764375213086",
    appId: "1:764375213086:web:8cb3828b5495cfa56eba0f",
    measurementId: "G-9HSCX5NH53"
};
firebase.initializeApp(config);

export default firebase;
