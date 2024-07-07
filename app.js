import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase, ref, get,child } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDansjoKrJPA8hDv3CqRYjPz8l2e-N2Wus",
    authDomain: "admin-page-f6841.firebaseapp.com",
    projectId: "admin-page-f6841",
    storageBucket: "admin-page-f6841.appspot.com",
    messagingSenderId: "1005432635418",
    appId: "1:1005432635418:web:ef35f6ddb14e82e6d5d1a3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();


// Register User
// document.getElementById('registerForm').addEventListener('submit', (e) => {
//     e.preventDefault();
//     const email = document.getElementById('registerEmail').value;
//     const password = document.getElementById('registerPassword').value;
//     createUserWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             alert('User registered successfully');
//         })
//         .catch((error) => {
//             alert(error.message);
//         });
// });

// Login User
// document.getElementById('loginForm').addEventListener('submit', (e) => {
//     e.preventDefault();
//     const email = document.getElementById('loginEmail').value;
//     const password = document.getElementById('loginPassword').value;
//     signInWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             alert('User logged in successfully');
//         })
//         .catch((error) => {
//             alert(error.message);
//         });
// });

// Load Soil Types
const soilSelectuser = document.getElementById('soiltypebtnuser');

async function GetSoiltypeuser() {
    const dbRef = ref(db);
    try {
        const snapshot = await get(child(dbRef, 'SoilType/'));
        if (snapshot.exists()) {
            soilSelectuser.innerHTML = '<option value="select">Soil type</option>'; // Reset options
            const soilTypes = snapshot.val();
            for (const key in soilTypes) {
                const option = document.createElement('option');
                option.value = soilTypes[key].Soiltype;
                option.textContent = soilTypes[key].Soiltype;
                soilSelectuser.appendChild(option);
            }
            soilSelectuser.disabled = false;
        } else {
            alert("No soil types found in the database.");
        }
    } catch (error) {
        console.error("Error fetching soil types:", error);
    }
}

window.addEventListener('load', GetSoiltypeuser);

// Search Soil Info
// function searchSoilInfo() {
//     const soilType = document.getElementById('soiltypebtnuser').value;
//     const waterSupply = document.getElementById('waterbtnuser').value;
//     const resultsDiv = document.getElementById('sandDetails');

//     if (soilType === 'select' || waterSupply === 'select') {
//         alert('Please select both soil type and water supply');
//         return;
//     }

//     const dbRef = ref(db);
//     get(child(dbRef, `Soil Information/${soilType}/${waterSupply}`)).then((snapshot) => {
//         if (snapshot.exists()) {
//             const data = snapshot.val();
//             resultsDiv.innerHTML = `
//                 <h3>Crop Information</h3>
//                 <p><strong>Soil Type:</strong> ${data.Typeofsoil}</p>
//                 <p><strong>Water Supply:</strong> ${data.Watersupply}</p>
//                 <p><strong>Crop Name:</strong> ${data.Nameofcrop}</p>
//                 <p><strong>Description:</strong> ${data.descriptionofcrop}</p>
//                 <p><strong>Process 1:</strong> ${data.process1}</p>
//                 <p><strong>Process 2:</strong> ${data.process2}</p>
//                 <p><strong>Process 3:</strong> ${data.process3}</p>
//                 <p><strong>Process 4:</strong> ${data.process4}</p>
//                 <p><strong>Process 5:</strong> ${data.process5}</p>
//                 <p><strong>Process 6:</strong> ${data.process6}</p>
//                 <p><strong>Subcrop:</strong> ${data.subcrop}</p>
//                 <p><strong>Subcrop Description:</strong> ${data.descriptionofsubcrop}</p>
//             `;
//         } else {
//             resultsDiv.innerHTML = "No data available for the selected options.";
//         }
//     }).catch((error) => {
//         console.error(error);
//         resultsDiv.innerHTML = "Error retrieving data.";
//     });
// }

// document.getElementById('searchBtn').addEventListener('click', searchSoilInfo);

function searchSoilInfo() {
    const soilType = document.getElementById('soiltypebtnuser').value;
    const waterSupply = document.getElementById('waterbtnuser').value;
    const resultsDiv = document.getElementById('sandDetails');

    if (soilType === 'select' || waterSupply === 'select') {
        alert('Please select both soil type and water supply');
        return;
    }

    const dbRef = ref(db);
    get(child(dbRef, `Soil Information/${soilType}`)).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            resultsDiv.innerHTML = `
                <h3>Crop Information</h3>
                <p><strong>Soil Type:</strong> ${data.Typeofsoil}</p>
                <p><strong>Water Supply:</strong> ${data.Watersupply}</p>
                <p><strong>Crop Name:</strong> ${data.Nameofcrop}</p>
                <p><strong>Description:</strong> ${data.descriptionofcrop}</p>
                <p><strong>Process 1:</strong> ${data.process1}</p>
                <p><strong>Process 2:</strong> ${data.process2}</p>
                <p><strong>Process 3:</strong> ${data.process3}</p>
                <p><strong>Process 4:</strong> ${data.process4}</p>
                <p><strong>Process 5:</strong> ${data.process5}</p>
                <p><strong>Process 6:</strong> ${data.process6}</p>
                <p><strong>Subcrop:</strong> ${data.subcrop}</p>
                <p><strong>Subcrop Description:</strong> ${data.descriptionofsubcrop}</p>
            `;
        } else {
            resultsDiv.innerHTML = "No data available for the selected options.";
        }
    }).catch((error) => {
        console.error(error);
        resultsDiv.innerHTML = "Error retrieving data.";
    });
}

document.getElementById('searchBtn').addEventListener('click', searchSoilInfo);


// Load Distributor Details
document.getElementById('loadDistributorDetails').addEventListener('click', () => {
    const dbRef = ref(db);
    get(child(dbRef, 'distributorDetails')).then((snapshot) => {
        if (snapshot.exists()) {
            document.getElementById('distributorDetails').innerText = JSON.stringify(snapshot.val(), null, 2);
        } else {
            document.getElementById('distributorDetails').innerText = 'No data available';
        }
    }).catch((error) => {
        console.error(error);
    });
});

// Logout User
document.getElementById('logout').addEventListener('click', () => {
    signOut(auth).then(() => {
        alert('User logged out successfully');
    }).catch((error) => {
        console.error(error);
    });
});

// Authentication State Listener
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById('registerSection').style.display = 'none';
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('viewSandDetails').style.display = 'block';
        document.getElementById('viewDistributorDetails').style.display = 'block';
        document.getElementById('logout').style.display = 'block';
    } else {
        document.getElementById('registerSection').style.display = 'block';
        document.getElementById('loginSection').style.display = 'block';
        document.getElementById('viewSandDetails').style.display = 'none';
        document.getElementById('viewDistributorDetails').style.display = 'none';
        document.getElementById('logout').style.display = 'none';
    }
});
