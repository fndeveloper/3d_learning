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

      // ============= CODE FOR CHECK COLLPASE OF SHEDULE APPOINTMENT START ===============
setTimeout(() => {
const el = document.querySelector(".shedule_collapse");
if (el && el.offsetHeight > 0) {
  console.log("Collapse is OPEN (visible)");
} else {
  console.log("Collapse is CLOSED (hidden)");
}

}, 500);
// ============= CODE FOR CHECK COLLPASE OF SHEDULE APPOINTMENT END ===============



      initNavbarTabHover?.(); 


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

