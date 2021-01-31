// import firebase from "firebase";
// import axios from "axios";

// const apiEndpoint = process.env["REACT_APP_API_ENDPOINT"];

// const firebaseConfig = {
//   apiKey: "AIzaSyCkqlNfk8Kc4LO9qTAja1BuLf8HGrrmaBA",
//   authDomain: "hemma-235019.firebaseapp.com",
//   databaseURL: "https://hemma-235019.firebaseio.com",
//   projectId: "hemma-235019",
//   storageBucket: "hemma-235019.appspot.com",
//   messagingSenderId: "666418042775",
//   appId: "1:666418042775:web:90f5c8a25756d31e"
// };

// firebase.initializeApp(firebaseConfig);

// /**
//  * Exchange firebase token for app token
//  *
//  * @param {string} firebaseToken
//  *
//  * @returns {Promise<string>} Promise<appToken>
//  */
// const exchangeFirebaseTokenForAppToken = async firebaseToken => {
//   const response = await axios.post(
//     `${apiEndpoint}/auth/exchange_firebase_token`,
//     { token: firebaseToken, deviceId: localStorage.getItem("devicdId") }
//   );
//   return response.data.data.token;
// };

// /**
//  * Sign in with twitter
//  *
//  * @returns {Promise<string>} token
//  */
// export const loginWithTwitter = async () => {
//   const provider = new firebase.auth.TwitterAuthProvider();

//   const response = await firebase.auth().signInWithPopup(provider);
//   const token = await firebase.auth().currentUser.getIdToken();

//   return exchangeFirebaseTokenForAppToken(token);
// };
