// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
import {
    getAnalytics
} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-analytics.js";
import {
    getAuth,
    GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";


const signInButton = document.querySelector('#signInButton');
const signOutButton = document.querySelector('#menuSignOutButton');
const userName = document.querySelector('#userName');
const userProfilePic = document.querySelector('#userProfilePic');
const loader = document.querySelector('#loader');


var privatePages = [
    '/dashboard'
];

var publicPages = [
    '/sign-up',
    '/sign-in'
];

const firebaseConfig = {
    apiKey: "AIzaSyAnarqP4ZUaClJRaNJmt2baTtoaDsiXptQ",
    authDomain: "myfiday.firebaseapp.com",
    projectId: "myfiday",
    storageBucket: "myfiday.appspot.com",
    messagingSenderId: "1043850782170",
    appId: "1:1043850782170:web:e1d35a7186b7764a82cce3",
    measurementId: "G-BLTMZFV1YY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

auth.onAuthStateChanged(user => {
    var currentPath = window.location.pathname;
    if (user) {
        // User is signed in.
        if (publicPages.includes(currentPath)) {
            window.location.replace('/dashboard');
        } else {
            console.log('User is logged in!');
            console.log('Email: ' + user.email);
            console.log('UID: ' + user.uid);
            signupLink.style.display = 'none';
            loginLink.style.display = 'none';
            loadingScreen.style.display = 'none';
        }
    } else {
        // User is signed out.
        if (privatePages.includes(currentPath)) {
            window.location.replace('/');
        } else {
            console.log('No user is logged in');
            privateLink.style.display = 'none';
            logoutLink.style.display = 'none';
            loadingScreen.style.display = 'none';
        }
    }
});

//  SignUp and Signout Fuctions
const signout = () => {
    auth.signOut();
}

const provider = new GoogleAuthProvider();
const signup = () => {
    firebase.auth().signInWithPopup(provider);
    firebase.auth()
        .getRedirectResult()
        .then((result) => {
            if (result.credential) {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = credential.accessToken;
                // ...
            }
            // The signed-in user info.
            var user = result.user;
            window.location.replace('./dashboard');
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
};

//  Add event listeners to buttons
signInButton.addEventListener('click', signup);
signOutButton.addEventListener('click', signout);