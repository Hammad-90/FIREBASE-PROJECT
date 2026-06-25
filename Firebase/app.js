

import { initializeApp }
from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";

import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
onAuthStateChanged,
signOut
}
from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

const firebaseConfig = {

   apiKey: "AIzaSyDQfkQo9Qn2zp560rNFx1sphMr-iA3IqZ4",
  authDomain: "fir-loginapp-1374f.firebaseapp.com",
  projectId: "fir-loginapp-1374f",
  storageBucket: "fir-loginapp-1374f.firebasestorage.app",
  messagingSenderId: "174222129821",
  appId: "1:174222129821:web:84f5f6839a59debce57274",
  measurementId: "G-2953DD338S"

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.showSignup = () => {
    document.getElementById("loginPage").style.display="none";
    document.getElementById("signupPage").style.display="block";
};

window.showLogin = () => {
    document.getElementById("signupPage").style.display="none";
    document.getElementById("loginPage").style.display="block";
};

window.signupUser = async () => {

    const email =
    document.getElementById("signupEmail").value;

    const password =
    document.getElementById("signupPassword").value;

    const msg =
    document.getElementById("signupMessage");

    msg.innerHTML="";

    if(!email || !password){
        msg.innerHTML='<div class="error">Fill all fields</div>';
        return;
    }

    try{

        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        msg.innerHTML='<div class="success">Account Created Successfully</div>';

    }
    catch(error){
        msg.innerHTML=`<div class="error">${error.message}</div>`;
    }
};

window.loginUser = async () => {

    const email =
    document.getElementById("loginEmail").value;

    const password =
    document.getElementById("loginPassword").value;

    const msg =
    document.getElementById("loginMessage");

    msg.innerHTML="";

    if(!email || !password){
        msg.innerHTML='<div class="error">Fill all fields</div>';
        return;
    }

    try{

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

    }
    catch(error){
        msg.innerHTML=`<div class="error">${error.message}</div>`;
    }
};

window.logoutUser = async () => {

    await signOut(auth);

    document.getElementById("homePage").style.display="none";
    document.getElementById("loginPage").style.display="block";
};

onAuthStateChanged(auth,(user)=>{

    if(user){

        document.getElementById("loginPage").style.display="none";
        document.getElementById("signupPage").style.display="none";
        document.getElementById("homePage").style.display="block";

        document.getElementById("userEmail").innerText =
        "Logged in as: " + user.email;

    }
    else{

        document.getElementById("homePage").style.display="none";
        document.getElementById("loginPage").style.display="block";

    }

});