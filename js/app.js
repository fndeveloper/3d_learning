
// ===================== HEADER CODE START ======================
document.addEventListener("DOMContentLoaded", () => {

  document.body.classList.add("fade-in");
});

var header = document.getElementById("header");

if (header) {
  fetch("../header.html")
    .then((e) => e.text())
    .then((data) => {
      header.innerHTML = data;
// =============== TO CHECK A CURRENT USER LOGIN COCDE START ======================
var current_use=JSON.parse(localStorage.getItem("current_user_data_docs"))
var profile_div=document.getElementById("profile_div");
var porfile_modal_body=document.getElementById("porfile_modal_body");


if(current_use){
  console.log(current_use);
  
profile_div.innerHTML=`
<button type="button"  class="  border-0 rounded-3 px-3 d-flex flex-row align-items-center"
    data-bs-toggle="modal" data-bs-target="#exampleModal">
<img src="${current_use.profiel_pic ? current_use.profiel_pic: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"}" class="img-fluid col-10 rounded-circle" alt="">

    <i class="fa-solid fa-caret-down"></i>
</button>

`

porfile_modal_body.innerHTML=`
   <div class="d-flex flex-column align-items-center mb-2">
        <img src="${current_use.profiel_pic ? current_use.profiel_pic: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"}" class="img-fluid col-3 rounded-circle" alt=""> 
        <h6 class="py-2">${current_use.name}</h6>
      </div>

      <div>
 
        <p class"fw-lighter"> Email : ${current_use.email_user}</p>
        <p class"fw-lighter">Qualification : ${current_use.qualification}</p>
     <p class"fw-lighter">Level: ${current_use.Account_Type}</p>
     
     <p class"fw-lighter">Feild : ${current_use.fieldOfStudy}</p>
      </div>
      </div>
      <div class="modal-footer d-flex flex-row justify-content-center align-items-center">
        <button type="button" class="btn col-lg-6 col-10 bg_light text-dark "  id="logout_user">
        Logout
        </button>
      </div>
`


} 

// =============== TO CHECK A CURRENT USER LOGIN COCDE END ======================

   
      document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');

        if (href && !href.startsWith('http') && !href.startsWith('#') && !link.hasAttribute('target')) {
          link.addEventListener('click', function (e) {
            e.preventDefault();

            document.body.classList.remove("fade-in"); 
            document.body.style.opacity = 0;

            setTimeout(() => {
              window.location.href = href;
            }, 600); 
          });
        }
      });
    });
}

// ===================== HEADER CODE END ======================

// ===================== HEADER CODE START ======================
var footer=document.getElementById("footer");
if(footer){
// ===================== footer CODE START ======================
  fetch("../footer.html")
  .then(e=>e.text())
  .then((data)=>{
  footer.innerHTML=data})
}
// ===================== HEADER CODE END ======================



