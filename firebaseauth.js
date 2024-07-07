// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword ,sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
// import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyBu33emHzTwhr3krrO76RkZw-8CRFA0nBo",
//     authDomain: "login-form-e4ffc.firebaseapp.com",
//     projectId: "login-form-e4ffc",
//     storageBucket: "login-form-e4ffc.appspot.com",
//     messagingSenderId: "92939764656",
//     appId: "1:92939764656:web:189654db33fbf0c2de4c75"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth as getAuthUser,createUserWithEmailAndPassword, signInWithEmailAndPassword,sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// User Firebase Configuration
const userFirebaseConfig = {
    apiKey: "AIzaSyBu33emHzTwhr3krrO76RkZw-8CRFA0nBo",
    authDomain: "login-form-e4ffc.firebaseapp.com",
    projectId: "login-form-e4ffc",
    storageBucket: "login-form-e4ffc.appspot.com",
    messagingSenderId: "92939764656",
    appId: "1:92939764656:web:189654db33fbf0c2de4c75"
};


const userApp = initializeApp(userFirebaseConfig, "userApp");
// const authUser = getAuthUser(userApp);
// const dbUser = getDatabaseUser(userApp);

function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function () {
        messageDiv.style.opacity = 0;
    }, 5000);
}

const signUp = document.getElementById('upbutton');
signUp.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('emailsignup').value;
    const password = document.getElementById('passsignup').value;
    const firstName = document.getElementById('fname').value;
    const lastName = document.getElementById('lname').value;

    // const auth = getAuth();
    // const db = getFirestore(app);
    const authUser = getAuthUser(userApp);
    const dbUser =getFirestore(userApp);

    createUserWithEmailAndPassword(authUser, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                email: email,
                firstName: firstName,
                lastName: lastName
            };
            showMessage('Account Created Successfully', 'signUpMessage');
            const docRef = doc(dbUser, "users", user.uid);
            setDoc(docRef, userData)
                .then(() => {
                    window.location.href = 'login.htm';
                })
                .catch((error) => {
                    console.error("Error writing document", error);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') {
                showMessage('Email Address Already Exists !!!', 'signUpMessage');
            } else {
                showMessage('Unable to create User', 'signUpMessage');
            }
        });
});

const signInbut=document.getElementById('loginbut');
signInbut.addEventListener('click',(event)=>{
    event.preventDefault();
    const email=document.getElementById('emailsigin').value;
    const password=document.getElementById('passsigin').value;
    const authUser = getAuthUser(userApp);


    signInWithEmailAndPassword(authUser,email,password)
    .then((userCredential)=>{
        showMessage('Login is successful','signInMessage');
        const user=userCredential.user;
        localStorage.setItem('loggedInUserId',user.uid);
        window.location.href='Homepage.htm';
    })
    .catch((error)=>{
       const errorCode=error.code;
       if(errorCode==='auth/invalid-credential'){
        showMessage('Incorrect Email or Password','signInMessage');
       }
       else{
        showMessage('Account does not Exist','signInMessage');
       }
    });
});

const forgotPassLabel = document.getElementById('forgotpass');
forgotPassLabel.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('emailsigin').value;
    const authUser = getAuthUser(userApp);


    sendPasswordResetEmail(authUser, email)
        .then(() => {
            alert("A Password Reset Link has been sent to your email");
        })
        .catch((error) => {
            console.log(error.code);
            console.log(error.message);
        });
});
