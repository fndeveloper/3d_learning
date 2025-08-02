
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
// JavaScript
const home_course = document.getElementById("home_course");

if (home_course) {
  const querySnapshot = await getDocs(collection(db, "courses"));

  let courseHTML = "";

  querySnapshot.forEach((doc) => {
    const course = doc.data();

    courseHTML += `
      <div class="col-md-4 mb-4">
        <div class="card h-100 shadow-sm">
          <img src="${course.image}" class="card-img-top col-12 course_img_home" alt="${course.name}">
          <div class="card-body">
            <h5 class="card-title">${course.name}</h5>
            <ul class="list-unstyled d-flex flex-row justify-content-start gap-2 mt-3 li_course_dec ">
              <li class="border border-1 px-2 py-1 rounded-3"> ${course.instructor}</li>
              <li class="border border-1 px-2 py-1 rounded-3"> ${course.rating} </li>
              <li class="border border-1 px-2 py-1 rounded-3"> ${course.duration}</li>
            </ul>
          </div>
        </div>
      </div>
    `;
  });

  home_course.innerHTML = courseHTML;
}
