
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
  import { signOut ,onAuthStateChanged,getAuth,setPersistence,browserSessionPersistence,browserLocalPersistence ,createUserWithEmailAndPassword,signInWithEmailAndPassword ,sendEmailVerification } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
  import { collection, addDoc ,getFirestore, doc, getDoc , getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js"; 

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
  const db = getFirestore(app);
  const Auth = getAuth(app);
// ============== FIND A CURRENT USER CODE START =========================

onAuthStateChanged(Auth, (user) => {
  if (user) {
    console.log(user);
    localStorage.setItem("current_user",JSON.stringify(user))
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});
// ============== FIND A CURRENT USER CODE END =========================

console.log();
// =================== LOGIN CODE IS START HERE ============================
var submit_signup=document.getElementById("submit_signup");
submit_signup.addEventListener("click",(e)=>{
  e.preventDefault()
var signup_form=document.getElementById("signup_form");




 createUserWithEmailAndPassword(Auth, signup_form.querySelector("#email").value, signup_form.querySelector("#password").value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;

    // =========== SEND A DATA OF ACCOUTN CREATION START ================
    const docRef = addDoc(collection(db, "users"), {
name:signup_form.querySelector("#email").value,
      email_user:user.email,
id_user:user.uid, 
Account_Type:signup_form.querySelector("#accountType").value,
fieldOfStudy:signup_form.querySelector("#fieldOfStudy").value,
qualification:signup_form.querySelector("#qualification").value,
profiel_pic:signup_form.querySelector("#pic_url").value,
date:Date().split(" ").slice(0,5).join(" "),

});

    // =========== SEND A DATA OF ACCOUUNT CREATION END ================-=-
     sendEmailVerification(user)
      .then(() => {
        Swal.fire({
  icon: 'success',
  title: 'Account is Create successfully!',
  text:'For Sign-In Verification email sent. Please check your inbox',
  showConfirmButton: true,

});
signup_form.reset();

      });
    
    // ...
  })
  .catch((error) => {
    Swal.fire({
  icon: "error",
  title: "Oops...",
  text: `Something went wrong! ${error}`,

});
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
  const rememberMe = document.getElementById("rememberMe").checked;
 const persistenceType = rememberMe ? browserLocalPersistence : browserSessionPersistence;
setPersistence(Auth,  persistenceType)
  .then(() => {
   
    return signInWithEmailAndPassword(Auth, login_form.querySelector("#email").value, login_form.querySelector("#password").value)
  })
 

  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    
    if(!user.emailVerified){

        Swal.fire({
  icon: "error",
  title: "Oops...",
  text: `First Vereifed Your Email `,

});
    }
    else{
   
      Swal.fire({
  title: "Login Successfull",
  icon: "success",
  draggable: true
});
setTimeout(() => {
        window.location.href="index.html"
}, 2500);
  
    }
    // ...
  })
  .catch((error) => {

    Swal.fire({
  icon: "error",
  title: "Oops...",
  text: `Something went wrong! ${error.message}`,

});

  });

})

// =================== LOGIN CODE IS END HERE =================================
document.getElementById("goToSignup").addEventListener("click", function (e) {
  e.preventDefault();

  
  document.querySelectorAll('.tab-pane').forEach(pane => {
    pane.classList.remove('show', 'active');
  });

  const signupTab = document.getElementById("profile");
  signupTab.classList.add("show", "active");

  document.querySelectorAll('.nav-link').forEach(tab => {
    tab.classList.remove('active');
  });
  document.querySelector('[data-bs-target="#profile"]').classList.add('active');
});


// ================================ GO TO SIGN IN =======================
document.getElementById("goToSigin").addEventListener("click", function (e) {
  e.preventDefault();

  
  document.querySelectorAll('.tab-pane').forEach(pane => {
    pane.classList.add('show', 'active');
  });

  const signupTab = document.getElementById("profile");
  signupTab.classList.remove("show", "active");

  document.querySelectorAll('.nav-link').forEach(tab => {
    tab.classList.add('active');
  });
  document.querySelector('[data-bs-target="#profile"]').classList.remove('active');
});



// ================================= GET A DATA FROM DATABSE OF USERS START =============================================
const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  // console.log(JSON.parse(localStorage.getItem("current_user")).uid);
  if(doc.data().id_user === JSON.parse(localStorage.getItem("current_user")).uid ){
    console.log(doc.data())
    localStorage.setItem("current_user_data_docs",JSON.stringify(doc.data()))
  }
});



// ================================= GET A DATA FROM DATABSE OF USERS END =============================================


var logout_user=document.getElementById("logout_user");
logout_user.addEventListener("click",()=>{
  console.log("ss");
  
  signOut(Auth).then(() => {
alert("signout")
}).catch((error) => {
  // An error happened.
});
})
