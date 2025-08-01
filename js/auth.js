

  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
  import { getAuth ,createUserWithEmailAndPassword,signInWithEmailAndPassword ,sendEmailVerification } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";


  const firebaseConfig = {
    apiKey: "AIzaSyATKP7NSf-dBNYu9cwpGKvUvh3X09GlnZw",
    authDomain: "udemy-b6fd2.firebaseapp.com",
    projectId: "udemy-b6fd2",
    storageBucket: "udemy-b6fd2.firebasestorage.app",
    messagingSenderId: "171904301792",
    appId: "1:171904301792:web:12133f32fdd6088a416e85",
    measurementId: "G-B5XLSM4BGR"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const Auth = getAuth(app);

// =================== LOGIN CODE IS START HERE ============================
var submit_signup=document.getElementById("submit_signup");
submit_signup.addEventListener("click",(e)=>{
  e.preventDefault()
var signup_form=document.getElementById("signup_form");




createUserWithEmailAndPassword(Auth, signup_form.querySelector("#email").value, signup_form.querySelector("#password").value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
     sendEmailVerification(user)
      .then(() => {
        alert("Verification email sent. Please check your inbox.");
         Auth.signOut();
      });
    console.log(user);
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

})

// ============================================================
var submit_login=document.getElementById("submit_login");
submit_login.addEventListener("click",(e)=>{
  e.preventDefault()
var login_form=document.getElementById("login_form");




  signInWithEmailAndPassword(Auth, login_form.querySelector("#email").value, login_form.querySelector("#password").value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    if(!user.emailVerified){
      alert("first Vereifed your email")
    }
    else{
      alert("success");
      window.location.href="index.html"
      localStorage.setItem("user",JSON.parse(user))
    }
    // ...
  })
  .catch((error) => {
    console.log(error.message);
    

  });

})

// =================== LOGIN CODE IS END HERE =================================