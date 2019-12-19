import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/database';
require('firebase/auth');

var firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyBFKNGu1H-caf4ecmTMyvhLB8HIja8zLrg",
    authDomain: "motocheat-362c9.firebaseapp.com",
    databaseURL: "https://motocheat-362c9.firebaseio.com",
    projectId: "motocheat-362c9",
    storageBucket: "motocheat-362c9.appspot.com",
    messagingSenderId: "524443698728",
    appId: "1:524443698728:web:fa1e3a09d35db8add9571d",
    measurementId: "G-Q4K848GSBX"
  })
  const base = Rebase.createClass(firebase.database())
  export {firebaseConfig}
  export default base;
