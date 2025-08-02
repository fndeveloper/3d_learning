
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
      <div class="col-md-4 mb-4 ">

        <div class="card_of_course_home h-100  p-2 ">
          <img src="${course.image}" class="card-img-top col-12 course_img_home rounded-3" alt="${course.name}">
          <div class="card-body">
            <h5 class="card-title">${course.name}</h5>
            <ul class="list-unstyled d-flex flex-row justify-content-start gap-2 mt-3 li_course_dec ">
              <li class="border border-1 px-2 py-1 rounded-3 text-truncate"> ${course.instructor}</li>
              <li class="border border-1 px-2 py-1 rounded-3"> ${course.rating} </li>
              <li class="border border-1 px-2 py-1 rounded-3"> ${course.duration}</li>
            </ul>
            <a href="view_course.html?=${course.course_id}" class="text-decoration-none  ">
            <button class="bg_light border border-0 px-4 shadow border border-2  rounded-3 py-2 "> View Course </button>
          </a>
            </div>
        </div>

      </div>
    `;
  });

  home_course.innerHTML = courseHTML;
}


// ============================= VIEW_CORUSE.HTML;?=1 CODE START =======================
var location_of_view_page=location.href.split("?=")[1];
if(location_of_view_page ){
    
    var view_course_banner_div_col_6=document.getElementById("view_course_banner_div_col_6")
    var course_detail_of_view_page=document.getElementById("course_detail_of_view_page"); 
    var course_name_of_view_page=document.getElementById("course_name_of_view_page")
    const querySnapshot = await getDocs(collection(db, "courses"))
      querySnapshot.forEach((e)=>{
        // console.log(e.data().course_id);
        if(e.data().course_id == location_of_view_page){
          console.log(e.data().details.split("<newline>"));
          
          if(course_name_of_view_page){
            course_name_of_view_page.innerHTML=`
          ${e.data().name}
          `
          }
            
         if(view_course_banner_div_col_6){
               view_course_banner_div_col_6.innerHTML=`
            <h2> ${e.data().name}</h2>
            <p class="fs_14 py-2">Duration : ${e.data().details.split("<newline>")[0]}</p>

            <div class="d-flex flex-wrap gap-2">
            <span class="fs_14 py-2 border border-1 px-2 rounded-3">
     <i class="fas fa-clock me-1 col-org"></i> Duration: ${e.data().duration ? e.data().duration : "-" }
   </span>
  <span class="fs_14 py-2 border border-1 px-2 rounded-3">
    <i class="fas fa-star me-1 col-org"></i> Rating: ${e.data().rating ? e.data().rating : "-" }
  </span>
  <span class="fs_14 py-2 border border-1 px-2 rounded-3">
    <i class="fas fa-user me-1 col-org"></i> Instructor: ${e.data().instructor ? e.data().instructor : "-"}
  </span>
  <span class="fs_14 py-2 border border-1 px-2 rounded-3">
    <i class="fas fa-dollar-sign me-1 col-org"></i> Charges: ${e.data().price ? e.data().price: "-"}
  </span>
</div>


      <div class="my-3">
                <button class="bg border border-0 col-lg-4 py-2 rounded-3">
          <a href="apply_now.html?=${e.data().course_id}" class="text-decoration-none text-white">Apply Now</a>
          </button>
</div>
          `
         }

        if(course_detail_of_view_page){
              course_detail_of_view_page.innerHTML=`
          <h4>Course Description:</h4>
          <p class="para_of_view pt-3">
          ${e.data().details.split("<newline>").join("</br> </br>")}
          </p>
          `
        }
        }
        
      })
}

// ============================= VIEW_CORUSE.HTML;?=1 CODE END =======================
