import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDansjoKrJPA8hDv3CqRYjPz8l2e-N2Wus",
    authDomain: "admin-page-f6841.firebaseapp.com",
    projectId: "admin-page-f6841",
    storageBucket: "admin-page-f6841.appspot.com",
    messagingSenderId: "1005432635418",
    appId: "1:1005432635418:web:ef35f6ddb14e82e6d5d1a3"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

function showMessage(message, divId) {
    const messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(() => {
        messageDiv.style.opacity = 0;
    }, 5000);
}

document.addEventListener('DOMContentLoaded', (event) => {
    const AdsignInbut = document.getElementById('Adminloginbut');
    AdsignInbut.addEventListener('click', (event) => {
        event.preventDefault();
        const email = document.getElementById('Adminemailsigin').value;
        const password = document.getElementById('Adminpasssigin').value;
        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                showMessage('Login is successful', 'AdminsignInMessage');
                const user = userCredential.user;
                localStorage.setItem('loggedInUserId', user.uid);
                window.location.href = 'Admin_Homepage.htm';
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode === 'auth/wrong-password') {
                    showMessage('Incorrect Email or Password', 'AdminsignInMessage');
                } else if (errorCode === 'auth/user-not-found') {
                    showMessage('Account does not Exist', 'AdminsignInMessage');
                } else {
                    showMessage('Error: ' + error.message, 'AdminsignInMessage');
                }
            });
    });

    const AdforgotPassLabel = document.getElementById('Adminforgotpass');
    AdforgotPassLabel.addEventListener('click', (event) => {
        event.preventDefault();
        const email = document.getElementById('Adminemailsigin').value;
        const auth = getAuth();

        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("A Password Reset Link has been sent to your email");
            })
            .catch((error) => {
                console.log(error.code);
                console.log(error.message);
            });
    });
});

// import{getDatabase,ref,set,child,update,remove}from"https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// const db=getDatabase();

// var soiltype=document.getElementById("soiltype");
// var insertbtn=document.getElementById("insertbut");

// function InsertData(){
//     set(ref(db,"SoilType/"+soiltype.value),{
//         Soiltype:soiltype.value
//     })
//     .then(()=>{
//         alert("Data stored successfully");
//                 // window.location.href = 'Admin_Homepage.htm';
//     })
//     .catch((error)=>{
//         alert("unsuccessful,error"+error);
//     });
// }
// insertbtn.addEventListener('click',InsertData);