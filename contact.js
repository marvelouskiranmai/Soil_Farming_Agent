// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
// import { getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
// import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

// const auth=getAuth();
// const db=getFirestore();
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth as getAuthUser, onAuthStateChanged as onAuthStateChangedUser, signOut as signOutUser } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// User Firebase Configuration
const userFirebaseConfig = {
    apiKey: "AIzaSyBu33emHzTwhr3krrO76RkZw-8CRFA0nBo",
    authDomain: "login-form-e4ffc.firebaseapp.com",
    projectId: "login-form-e4ffc",
    storageBucket: "login-form-e4ffc.appspot.com",
    messagingSenderId: "92939764656",
    appId: "1:92939764656:web:189654db33fbf0c2de4c75"
};

// Initialize User Firebase App
const userApp = initializeApp(userFirebaseConfig, "userApp");
const authUser = getAuthUser(userApp);
const dbUser = getFirestore(userApp);

// Listen for auth state changes
onAuthStateChangedUser(authUser, (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
        const docRef = doc(dbUser, "users", loggedInUserId);
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    document.getElementById('loggedUserFName').innerText = userData.firstName;
                    document.getElementById('loggedUserEmail').innerText = userData.email;
                    document.getElementById('loggedUserLName').innerText = userData.lastName;
                } else {
                    console.log("No document found matching the user ID");
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
    } else {
        console.log("User ID is not found in local storage");
    }
});

// Logout functionality
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedInUserId');
    signOutUser(authUser)
        .then(() => {
            window.location.href = 'welcome.htm';
        })
        .catch((error) => {
            console.error('Error signing out:', error);
        });
});

// Page navigation
const contactPage = document.getElementById('contactpage');
const contactButton = document.getElementById('profilebut');
const homePage = document.getElementById('home');
const secondPage = document.getElementById('pagetwo');

contactButton.addEventListener('click', function() {
    contactPage.style.display = "block";
    homePage.style.display = "none";
    secondPage.style.display = "none";
});

contactButton.addEventListener('dblclick', function() {
    contactPage.style.display = "none";
    homePage.style.display = "block";
});
