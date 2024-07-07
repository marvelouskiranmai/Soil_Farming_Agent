
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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


const auth=getAuth();
const db=getFirestore();
onAuthStateChanged(auth,(user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
        const docRef=doc(db,"users",loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData=docSnap.data();
                // document.getElementById('loggedUserFName').innerText=userData.firstName;
                document.getElementById('loggedUserEmail').innerText=userData.email;
                // document.getElementById('loggedUserLName').innerText=userData.lastName;
            }
            else{
              console.log("no document found matching") ; 
            }
        })
       .catch((error)=>{
        console.log("Error getting document");
       })
    }
     else{
        console.log("userId is not found in local storage ");
     }

})

const logoutButton=document.getElementById('Adlogout');

logoutButton.addEventListener('click',()=>{
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(()=>{
        window.location.href='welcome.htm';
    })
    .catch((error)=>{
        console.error('Error Signing out:',error);
    })
})

const contactPage=document.getElementById('contactpage1');
const contactButton=document.getElementById('profilebut');
const homePage=document.getElementById('soildetails');
//const secondPage=document.getElementById('centerdetails');
contactButton.addEventListener('click',function(){
    contactPage.style.display="block";
    homePage.style.display="none";
    // secondPage.style.display="none";
});

contactButton.addEventListener('dblclick',function(){
    contactPage.style.display="none";
    homePage.style.display="block";
 //   secondPage.style.display="none";
    // ]

});


