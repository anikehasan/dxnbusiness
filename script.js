/**
 * Grow With CA Team · DXN Business Opportunity Platform
 * Core Frontend Interactions & Unchanged Form Submission Engine
 */

document.addEventListener("DOMContentLoaded", function () {
    // 1. Preloader Handler
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.visibility = 'hidden';
            if (typeof AOS !== 'undefined') {
                AOS.init({
                    duration: 800,
                    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                    once: true,
                    offset: 50
                });
            }
        }, 400);
    }

    // 2. Swiper Sliders Initialization
    if (typeof Swiper !== 'undefined') {
        new Swiper('.product-swiper', {
            slidesPerView: 1,
            spaceBetween: 25,
            loop: true,
            autoplay: { delay: 3500, disableOnInteraction: false },
            pagination: { el: '.product-pagination', clickable: true },
            breakpoints: {
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 }
            }
        });

        new Swiper('.leader-swiper', {
            slidesPerView: 1,
            spaceBetween: 25,
            loop: true,
            autoplay: { delay: 5000, disableOnInteraction: false },
            pagination: { el: '.leader-pagination', clickable: true },
            breakpoints: {
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 }
            }
        });

        new Swiper('.story-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: { delay: 5000, disableOnInteraction: false },
            pagination: { el: '.swiper-pagination', clickable: true }
        });
    }

    // 3. Dynamic Scroll Progress Bar & Sticky Header
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
        const progressBar = document.getElementById('scroll-progress');
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }

        const backToTop = document.getElementById('back-to-top');
        if (backToTop) {
            if (window.scrollY > 450) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }

        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 60) {
                navbar.classList.add('sticky');
            } else {
                navbar.classList.remove('sticky');
            }
        }
    });

    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 4. Mobile Menu Navigation
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const navMenu = document.querySelector('.nav-menu');
    if (menuToggleBtn && navMenu) {
        menuToggleBtn.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const icon = menuToggleBtn.querySelector('i');
            if (icon) {
                icon.className = navMenu.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
            }
        });

        // Close menu when a navigation link is clicked
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                const icon = menuToggleBtn.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            });
        });
    }

    // 5. Theme Toggle Logic (Dark / Light with LocalStorage)
    const themeBtn = document.getElementById('theme-btn');
    if (themeBtn) {
        const savedTheme = localStorage.getItem('gwca_theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            themeBtn.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        }

        themeBtn.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const nextTheme = isDark ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', nextTheme);
            localStorage.setItem('gwca_theme', nextTheme);
            themeBtn.innerHTML = nextTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        });
    }

    // 6. Intersection Observer for Numerical Counters
    const counterValues = document.querySelectorAll('.counter-val');
    if (counterValues.length > 0) {
        const observerStats = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counterValues.forEach(counter => {
                        const target = +counter.getAttribute('data-target');
                        if (!target) return;
                        let current = 0;
                        const increment = Math.ceil(target / 45);
                        const updateCount = () => {
                            current += increment;
                            if (current < target) {
                                counter.innerText = current;
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
        }, { threshold: 0.25 });

        const statsSection = document.querySelector('.hero-stats-row') || document.querySelector('.stats-section');
        if (statsSection) {
            observerStats.observe(statsSection);
        }
    }

    // 7. Interactive Video Player Switcher
    const videoCards = document.querySelectorAll('.video-thumb-card');
    const mainPlayer = document.getElementById('main-video-iframe');

    videoCards.forEach(card => {
        const videoUrl = card.getAttribute('data-video-url');
        if (videoUrl && (videoUrl.includes("youtube") || videoUrl.includes("youtu.be"))) {
            const videoId = videoUrl.split('embed/')[1]?.split('?')[0];
            if (videoId) {
                const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                const imgTag = card.querySelector('.thumb-preview img') || card.querySelector('.thumb-img-wrapper img');
                if (imgTag) {
                    imgTag.src = thumbnailUrl;
                }
            }
        }

        card.addEventListener('click', function () {
            videoCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            const vUrl = this.getAttribute('data-video-url');
            if (mainPlayer && vUrl) {
                if (vUrl.includes("youtube") || vUrl.includes("youtu.be")) {
                    mainPlayer.src = vUrl.includes("?") ? vUrl + "&autoplay=1" : vUrl + "?autoplay=1";
                } else {
                    mainPlayer.src = vUrl;
                }
            }
        });
    });

    // 8. FAQ Accordion Code
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
                const content = i.querySelector('.accordion-content');
                if (content) content.style.maxHeight = '0';
            });
            if (!isActive) {
                item.classList.add('active');
                const content = item.querySelector('.accordion-content');
                if (content) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            }
        });
    });

    // 9. FORM SUBMISSION CORE (Direct Google Sheet Processing + WhatsApp Trigger)
    // 100% PRESERVED FROM ORIGINAL SOURCE - STRICT ZERO-MODIFICATION REQUIREMENT
    const FORM_ENDPOINT = "https://script.google.com/macros/s/AKfycbzEsJsq5kfdmvpsmuCIVSSJyChUyyNyI30DC-NsLXMHItHAjFJsU-R7j2J5Q5iOvbNmBg/exec";
    const joinForm = document.getElementById("joinForm");
    const statusSuccess = document.getElementById("statusSuccess");
    const statusError = document.getElementById("statusError");

    if (joinForm) {
        const submitBtn = joinForm.querySelector(".submit-btn");
        const btnOriginalText = submitBtn ? submitBtn.innerHTML : "সাবমিট করুন";

        joinForm.addEventListener("submit", async function (e) {
            e.preventDefault();
            if (statusSuccess) statusSuccess.style.display = "none";
            if (statusError) statusError.style.display = "none";

            const name = joinForm.full_name.value.trim();
            const dob = joinForm.dob.value.trim();
            const mobile = joinForm.mobile.value.trim();
            const email = joinForm.email.value.trim();
            const address = joinForm.address.value.trim();
            const postcode = joinForm.postcode.value.trim();
            const division = joinForm.division.value;
            const nid_passport = joinForm.nid_passport.value.trim();
            const reason = joinForm.reason ? joinForm.reason.value.trim() : "";

            // Validation matching original custom criteria
            if (mobile.length < 10 || nid_passport.length < 5) {
                if (statusError) statusError.style.display = "block";
                return;
            }

            // Processing Loader state
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> প্রসেসিং হচ্ছে...';
            }

            const formData = new FormData(joinForm);

            try {
                // 1. Submitting directly to original explicit web app endpoint
                const response = await fetch(FORM_ENDPOINT, {
                    method: "POST",
                    body: formData,
                });

                // 2. Triggers success notification and form resets upon execution
                if (statusSuccess) statusSuccess.style.display = "block";
                
                // 3. Seamlessly triggers custom structured WhatsApp message fallback open
                // সুন্দর সিরিয়াল ও আইকন সহ মেসেজ টেমপ্লেট
const textMsg = 
    `🌟 *NEW DXN TEAM REGISTRATION*\n` +
    `*Grow With CA Team*\n` +
    `━━━━━━━━━━━━━━━━━━━━━\n` +
    `👤 *Full Name:* ${name}\n` +
    `📅 *Date of Birth:* ${dob}\n` +
    `📱 *Mobile Number:* ${mobile}\n` +
    `📧 *Email Address:* ${email}\n` +
    `🏠 *Full Address:* ${address}\n` +
    `📮 *Post Code:* ${postcode}\n` +
    `📍 *Division:* ${division}\n` +
    `🆔 *NID / Passport:* ${nid_passport}\n` +
    `🎯 *Reason / Goal:* ${reason || "N/A"}\n` +
    `━━━━━━━━━━━━━━━━━━━━━`;

// সরাসরি api.whatsapp.com এ ফুললি এনকোডেড পাঠানো
const whatsappUrl = `https://api.whatsapp.com/send?phone=8801567884423&text=${encodeURIComponent(textMsg)}`;
window.open(whatsappUrl, '_blank');
                joinForm.reset();
            } catch (error) {
                console.error("Form submission error:", error);
                if (statusError) statusError.style.display = "block";
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = btnOriginalText;
                }
            }
        });
    }

    // 10. Footer dynamic year setup
    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // 11. Intersection observer for animation modules
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
            }
        });
    });
    document.querySelectorAll("[data-animate]").forEach((el) => scrollObserver.observe(el));
});

// Gallery Lightbox Modal Trigger
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(element) {
    if (!lightbox || !lightboxImg) return;
    const img = element.querySelector('img');
    if (img) {
        lightboxImg.setAttribute('src', img.getAttribute('src'));
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('show');
    document.body.style.overflow = 'auto';
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('show')) {
            closeLightbox();
        }
    });
}
