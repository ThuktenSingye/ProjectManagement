import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDVz74EvjuW_jwFcvsizs3-F9k-j08D3Ns",
    authDomain: "projectsite-1cbd7.firebaseapp.com",
    projectId: "projectsite-1cbd7",
    storageBucket: "projectsite-1cbd7.appspot.com",
    messagingSenderId: "12719009185",
    appId: "1:12719009185:web:f8f1dd4905949c54c9afe0",
    measurementId: "G-5RTNVZHBPW"
};

// init firebase
const app = initializeApp(firebaseConfig)

// init firebase services
const projectFirestore = getFirestore()
const projectAuth = getAuth(app)


export  {projectFirestore, projectAuth}
