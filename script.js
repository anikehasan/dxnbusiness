document.addEventListener("DOMContentLoaded", function () {
    
  // 1. Initialize Swiper Slider
  var swiper = new Swiper(".hero-swiper", {
    spaceBetween: 0, 
    centeredSlides: true, 
    loop: true,
    autoplay: { delay: 3000, disableOnInteraction: false },
    pagination: { el: ".swiper-pagination", clickable: true },
  });

  // 2. Scroll Animation Observer
  const animatedElements = document.querySelectorAll("[data-animate]");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animatedElements.forEach((el) => observer.observe(el));

  // 3. Form Submission Logic

  // YOUR GOOGLE SCRIPT URL
  
  const FORM_ENDPOINT = "https://script.google.com/macros/s/AKfycbzEsJsq5kfdmvpsmuCIVSSJyChUyyNyI30DC-NsLXMHItHAjFJsU-R7j2J5Q5iOvbNmBg/exec";

  const form = document.getElementById("dxnForm");
  const statusSuccess = document.getElementById("msg-success");
  const statusError = document.getElementById("msg-error");
  const submitBtn = form.querySelector(".submit-btn");
  const btnOriginalText = submitBtn.innerHTML;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    
    // Reset status
    statusSuccess.style.display = "none";
    statusError.style.display = "none";

    // Get Values
    const mobile = form.querySelector('[name="mobile"]').value.trim();
    const nid = form.querySelector('[name="nid_number"]').value.trim();

    // Simple Validation
    if (mobile.length < 10) {
      alert("মোবাইল নম্বর সঠিক নয়!");
      return;
    }

    // Loading State
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> প্রসেসিং হচ্ছে...';

    const formData = new FormData(form);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: formData,
      });

      // Assuming Google Script returns a 200 OK
      statusSuccess.style.display = "block";
      form.reset();
      
    } catch (error) {
      console.error("Error:", error);
      statusError.style.display = "block";
    } finally {
      // Reset Button
      submitBtn.disabled = false;
      submitBtn.innerHTML = btnOriginalText;
    }
  });

  // Update Year in Footer
  document.getElementById("year").textContent = new Date().getFullYear();
});const joinForm = document.getElementById("joinForm");
const statusSuccess = document.getElementById("statusSuccess");
const statusError = document.getElementById("statusError");

// এখানে Apps Script Web App URL বসাতে হবে
const FORM_ENDPOINT = "https://script.google.com/macros/s/AKfycbzEsJsq5kfdmvpsmuCIVSSJyChUyyNyI30DC-NsLXMHItHAjFJsU-R7j2J5Q5iOvbNmBg/exec";

joinForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  statusSuccess.style.display = "none";
  statusError.style.display = "none";

  const mobile = joinForm.mobile.value.trim();
  const nid = joinForm.nid_passport.value.trim();
  if (mobile.length < 10 || nid.length < 5) {
    statusError.style.display = "block";
    return;
  }

  const formData = new FormData(joinForm);

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    statusSuccess.style.display = "block";
    joinForm.reset();
  } catch (error) {
    console.error("Form submission error:", error);
    statusError.style.display = "block";
  }
});
