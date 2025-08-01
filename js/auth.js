
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
  // ================================= GET A DATA FROM DATABSE OF USERS START =============================================
const querySnapshot = await getDocs(collection(db, "users"));

const currentUserRaw = localStorage.getItem("current_user");

if (currentUserRaw) {
  try {
    const currentUser = JSON.parse(currentUserRaw);

    querySnapshot.forEach((doc) => {
      if (doc.data().id_user === currentUser.uid) {
        localStorage.setItem("current_user_data_docs", JSON.stringify(doc.data()));

      }
    });

  } catch (error) {
    console.error("Error parsing current_user from localStorage:", error);
  }
} else {
  console.warn("No current_user found in localStorage.");
}

// ================================= GET A DATA FROM DATABSE OF USERS END =============================================
var submit_login=document.getElementById("submit_login");
if(submit_login){
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
    // console.log(user);
    
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
      window.location.href="index.html";
}, 500);
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
}

// ============== FIND A CURRENT USER CODE START =========================

onAuthStateChanged(Auth, (user) => {
  if (user) {

    localStorage.setItem("current_user",JSON.stringify(user))
  
    const uid = user.uid;

  } else {

  }
});
// ============== FIND A CURRENT USER CODE END =========================


// =================== LOGIN CODE IS START HERE ============================
var submit_signup=document.getElementById("submit_signup");
if(submit_signup){
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
}
// end 

// ============================================================

// end



// 
setTimeout(() => {
  const logout_user = document.getElementById("logout_user");
  if (logout_user) {
    logout_user.addEventListener("click", (e) => {
      e.preventDefault();
      signOut(Auth).then(() => {
        localStorage.setItem("current_user_data_docs", "");
        localStorage.setItem("current_user", "");
        alert("Signed out");
        location.reload();
      }).catch((error) => {
        alert("Error signing out");
      });
    });
  }
}, 500);

// 
// =================== LOGIN CODE IS END HERE =================================
if(document.getElementById("goToSignup")){
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
}

// ================================ GO TO SIGN IN =======================
if(document.getElementById("goToSigin")){
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
}




