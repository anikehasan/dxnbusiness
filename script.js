document.addEventListener("DOMContentLoaded", function () {
            // 1. Preloader Handler
            const preloader = document.getElementById('preloader');
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.visibility = 'hidden';
                // AOS Initialization
                AOS.init({
                    duration: 900,
                    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                    once: true
                });
            }, 500);

            // 2. Initialize Swiper Sliders
            new Swiper('.product-swiper', {
                slidesPerView: 1, spaceBetween: 25, loop: true,
                autoplay: { delay: 3500, disableOnInteraction: false },
                pagination: { el: '.swiper-pagination', clickable: true },
                breakpoints: { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 }, 1200: { slidesPerView: 4 } }
            });

            new Swiper('.story-swiper', {
                slidesPerView: 1, spaceBetween: 30, loop: true,
                autoplay: { delay: 5000, disableOnInteraction: false },
                pagination: { el: '.swiper-pagination', clickable: true }
            });

            // 3. Dynamic Progress Bar & Sticky Header
            window.addEventListener('scroll', () => {
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (winScroll / height) * 100;
                document.getElementById('scroll-progress').style.width = scrolled + '%';

                const backToTop = document.getElementById('back-to-top');
                if (window.scrollY > 500) { backToTop.classList.add('show'); } else { backToTop.classList.remove('show'); }

                const navbar = document.querySelector('.navbar');
                if (window.scrollY > 80) { navbar.classList.add('sticky'); } else { navbar.classList.remove('sticky'); }
            });

            document.getElementById('back-to-top').addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            // 4. Mobile Menu Navigation
            const menuToggleBtn = document.getElementById('menu-toggle-btn');
            const navMenu = document.querySelector('.nav-menu');
            menuToggleBtn.addEventListener('click', () => {
                navMenu.classList.toggle('open');
                menuToggleBtn.querySelector('i').className = navMenu.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
            });

           // 5. Theme Toggle Logic
const themeBtn = document.getElementById('theme-btn');

if (themeBtn) {
    themeBtn.addEventListener('click', () => {

        const isDark =
            document.documentElement.getAttribute('data-theme') === 'dark';

        document.documentElement.setAttribute(
            'data-theme',
            isDark ? 'light' : 'dark'
        );

        themeBtn.innerHTML = isDark
            ? '<i class="fas fa-moon"></i>'
            : '<i class="fas fa-sun"></i>';
    });
}

// 6. Intersection Observer for Counters
const counterValues = document.querySelectorAll('.counter-val');

const observerStats = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            counterValues.forEach(counter => {

                const updateCount = () => {

                    const target =
                        +counter.getAttribute('data-target');

                    const count =
                        +counter.innerText;

                    const speed = target / 60;

                    if (count < target) {

                        counter.innerText =
                            Math.ceil(count + speed);

                        setTimeout(updateCount, 25);

                    } else {

                        counter.innerText = target;
                    }
                };

                updateCount();
            });

            observer.unobserve(entry.target);
        }
    });

}, { threshold: 0.3 });

const statsSection =
    document.querySelector('.stats-section');

if (statsSection) {
    observerStats.observe(statsSection);
}


//-------------- Video palayer ---------------------




//-------------------------Video Playear  End  -----------------------------------



          //------------------------------------------------------------------------

            // 8. FAQ Accordion Code
            document.querySelectorAll('.accordion-header').forEach(header => {
                header.addEventListener('click', () => {
                    const item = header.parentElement;
                    const isActive = item.classList.contains('active');
                    document.querySelectorAll('.accordion-item').forEach(i => {
                        i.classList.remove('active');
                        i.querySelector('.accordion-content').style.maxHeight = '0';
                    });
                    if (!isActive) {
                        item.classList.add('active');
                        const content = item.querySelector('.accordion-content');
                        content.style.maxHeight = content.scrollHeight + 'px';
                    }
                });
            });

            // 9. FORM SUBMISSION CORE (Direct Google Sheet Processing + WhatsApp Trigger)
            const FORM_ENDPOINT = "https://script.google.com/macros/s/AKfycbzEsJsq5kfdmvpsmuCIVSSJyChUyyNyI30DC-NsLXMHItHAjFJsU-R7j2J5Q5iOvbNmBg/exec";
            const joinForm = document.getElementById("joinForm");
            const statusSuccess = document.getElementById("statusSuccess");
            const statusError = document.getElementById("statusError");
            const submitBtn = joinForm.querySelector(".submit-btn");
            const btnOriginalText = submitBtn.innerHTML;

            joinForm.addEventListener("submit", async function (e) {
                e.preventDefault();
                statusSuccess.style.display = "none";
                statusError.style.display = "none";

                const name = joinForm.full_name.value.trim();
                const dob = joinForm.dob.value.trim();
                const mobile = joinForm.mobile.value.trim();
                const email = joinForm.email.value.trim();
                const address = joinForm.address.value.trim();
                const postcode = joinForm.postcode.value.trim();
                const division = joinForm.division.value;
                const nid_passport = joinForm.nid_passport.value.trim();
                const reason = joinForm.reason.value.trim();

                // Validation matching your custom criteria
                if (mobile.length < 10 || nid_passport.length < 5) {
                    statusError.style.display = "block";
                    return;
                }

                // Processing Loader state
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> প্রসেসিং হচ্ছে...';

                const formData = new FormData(joinForm);

                try {
                    // 1. Submitting directly to your explicit web app endpoint
                    const response = await fetch(FORM_ENDPOINT, {
                        method: "POST",
                        body: formData,
                    });

                    // 2. Triggers success notification and form resets upon execution
                    statusSuccess.style.display = "block";
                    
                    // 3. Seamlessly triggers custom structured WhatsApp message fallback open
                    const textMsg = `*New DXN Team Application (Grow With CA)*%0A%0A` +
                                    `*Name:* ${encodeURIComponent(name)}%0A` +
                                    `*DOB:* ${encodeURIComponent(dob)}%0A` +
                                    `*Mobile:* ${encodeURIComponent(mobile)}%0A` +
                                    `*Email:* ${encodeURIComponent(email)}%0A` +
                                    `*Address:* ${encodeURIComponent(address)}%0A` +
                                    `*Post Code:* ${encodeURIComponent(postcode)}%0A` +
                                    `*Division:* ${encodeURIComponent(division)}%0A` +
                                    `*NID/Passport:* ${encodeURIComponent(nid_passport)}%0A` +
                                    `*Reason:* ${encodeURIComponent(reason)}`;

                    window.open(`https://wa.me/+8801567884423?text=${textMsg}`, '_blank');
                    joinForm.reset();
                } catch (error) {
                    console.error("Form submission error:", error);
                    statusError.style.display = "block";
                } finally {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = btnOriginalText;
                }
            });

            // Footer dynamic year setup
            document.getElementById("year").textContent = new Date().getFullYear();

            // Intersection observer for animation modules
            const scrollObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) { entry.target.classList.add("in-view"); }
                });
            });
            document.querySelectorAll("[data-animate]").forEach((el) => scrollObserver.observe(el));
        });

        // Gallery Modal Trigger Closures
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        function openLightbox(element) {
            lightboxImg.setAttribute('src', element.querySelector('img').getAttribute('src'));
            lightbox.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
        function closeLightbox() {
            lightbox.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
        lightbox.addEventListener('click', (e) => { if(e.target === lightbox) closeLightbox(); });
        