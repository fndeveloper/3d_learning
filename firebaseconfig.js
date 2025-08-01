
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  const analytics = getAnalytics(app);
