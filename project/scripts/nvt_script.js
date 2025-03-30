document.addEventListener("DOMContentLoaded", function () {
    insertHeader();
    insertFooter();
    setupDarkMode();
    setupLazyLoading();
    setupHamburgerMenu();
    setupFAQs();
    setupScrollToTop();
    setupAppointmentForm();
});

// 🏗️ Insert Header Dynamically
function insertHeader() {
    const headerElement = document.getElementById("header");
    if (headerElement) {
        headerElement.innerHTML = `
            <header>
                <div class="logo"><a href="index.html"><img src="images/logo_primary_optimized.svg" alt="New Venture Therapy Logo" id="header-logo"/></a>
                </div>
                <nav class="nav-wrapper">
                    <ul class="nav-links">
                        <li><a href="about.html">About</a></li>
                        <li><a href="#">Services (not coded)</a></li>
                        <li><a href="#">FAQs (not coded)</a></li>
                    </ul>
                </nav>
                <div class="book-now-desktop">
                    <a href="book.html" class="btn-book-now">Book Now</a>
                </div>
                <div class="hamburger-menu">
                    <span></span><span></span><span></span>
                </div>
                <div class="nav-links-mobile">
                    <ul>
                        <li><a href="about.html">About</a></li>
                        <li><a href="#">Services (not coded)</a></li>
                        <li><a href="#">FAQs (not coded)</a></li>
                        <li class="book-now-mobile">
                            <a href="book.html" class="btn-book-now">Book Now</a>
                        </li>
                    </ul>
                </div>
            </header>
        `;
    }
}

// 🏗️ Insert Footer Dynamically
function insertFooter() {
    const footerElement = document.getElementById("footer");
    if (footerElement) {
        footerElement.innerHTML = `
            <footer class="footer">
                <div class="footer-logo">
                                <div class="logo"><a href="index.html"><img src="images/logo_primary_optimized.svg" alt="New Venture Therapy Logo" id="footer-logo" /></a>
                    
                </div>
                <div class="footer-info-grid">
                    <div class="footer-info-item">
                        <h3>Location</h3>
                        <p>456 Imaginary Road, Suite 4<br />Tooele, Utah #####</p>
                    </div>
                    <div class="footer-info-item">
                        <h3>Schedule</h3>
                        <p>Mon-Fri / 8:00 AM - 7:00 PM<br />Sat-Sun / 10:00 AM - 5:00 PM</p>
                    </div>
                    <div class="footer-info-item">
                        <h3>Contact</h3>
                        <p>(917) - 707 - 9336<br />emailaddress@email.com</p>
                    </div>
                </div>
                <div class="footer-social">
                    <button class="dark-mode-toggle">Toggle Dark Mode</button>
                    <a href="#" class="social-icon"><img src="images/icon_facebook.svg" alt="Facebook"></a>
                    <a href="#" class="social-icon"><img src="images/icon-x.svg" alt="X"></a>
                    <a href="#" class="social-icon"><img src="images/icon_instagram.svg" alt="Instagram"></a>
                </div>
                <div class="footer-copyright">
                    <p>&copy; 2025 New Venture Therapy</p>
                </div>
            </footer>
        `;
    }
}

// 🌙 Dark Mode Handling
function setupDarkMode() {
    const headerLogo = document.getElementById("header-logo");
    const footerLogo = document.getElementById("footer-logo");
    const lightModeLogo = "images/logo_primary_optimized.svg";
    const darkModeLogo = "images/darkMode_logo_primary_optimized.svg";

    function updateLogo(isDarkMode) {
        const newLogo = isDarkMode ? darkModeLogo : lightModeLogo;
        if (headerLogo) headerLogo.src = newLogo;
        if (footerLogo) footerLogo.src = newLogo;
    }

    const toggleButton = document.querySelector(".dark-mode-toggle");
    if (toggleButton) {
        toggleButton.addEventListener("click", () => {
            const isDarkMode = document.body.classList.toggle("dark-mode");
            localStorage.setItem("darkMode", isDarkMode);
            updateLogo(isDarkMode);
        });
    }

    const isDarkModeSaved = localStorage.getItem("darkMode") === "true";
    if (isDarkModeSaved) document.body.classList.add("dark-mode");
    updateLogo(isDarkModeSaved);
}

// 🖼️ Lazy Loading Images
function setupLazyLoading() {
    const images = document.querySelectorAll("img");
    if ("IntersectionObserver" in window) {
        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove("lazy");
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            if (img.getBoundingClientRect().top > window.innerHeight) {
                img.dataset.src = img.src;
                img.src = "";
                img.classList.add("lazy");
                observer.observe(img);
            }
        });
    }
}

// 🍔 Hamburger Menu Toggle
function setupHamburgerMenu() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinksMobile = document.querySelector('.nav-links-mobile');

    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', () => {
            navLinksMobile.classList.toggle('active');
        });
    }
}

// 📚 Dynamic FAQs (Reusable)
function setupFAQs() {
    const faqContainer = document.querySelector('.accordion');
    if (!faqContainer) return;

    const faqs = [
        { question: "How long does the session last?", answer: "Sessions typically last 50 minutes to 1 hour, depending on the type of therapy." },
        { question: "Do you offer appointments on weekends?", answer: "Yes, weekend appointments are available based on therapist availability." },
        { question: "What payment methods do you offer?", answer: "We accept credit cards, PayPal, and insurance billing where applicable." },
        { question: "Do you offer virtual/remote appointments?", answer: "Yes, we provide secure and confidential virtual sessions for clients." }
    ];

    // Clear existing content
    faqContainer.innerHTML = "";

    // Add FAQ items dynamically
    faqs.forEach(faq => {
        const faqItem = document.createElement('div');
        faqItem.classList.add('accordion-item');
        faqItem.innerHTML = `
            <button class="accordion-header" aria-expanded="false">
                ${faq.question}
                <span class="accordion-icon">+</span>
            </button>
            <div class="accordion-body">
                <p>${faq.answer}</p>
            </div>
        `;
        faqContainer.appendChild(faqItem);
    });

    // Add event listeners to headers for expanding/collapsing
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', function () {
            const body = this.nextElementSibling;
            const isExpanded = this.getAttribute('aria-expanded') === "true";

            // Collapse all other items
            document.querySelectorAll('.accordion-header').forEach(h => {
                h.setAttribute("aria-expanded", "false");
                h.nextElementSibling.style.maxHeight = "0";
                h.querySelector(".accordion-icon").textContent = "+";
            });

            // Expand this one if it was collapsed
            if (!isExpanded) {
                this.setAttribute("aria-expanded", "true");
                body.style.maxHeight = body.scrollHeight + "px";
                this.querySelector(".accordion-icon").textContent = "−";
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const testimonials = [
        { 
            quote: "Therapy with Amandamae has truly transformed our family dynamics.", 
            text: "We used to struggle with communication and unresolved conflicts, but with her guidance, we've learned how to listen, support, and understand each other in ways we never thought possible. Our home feels lighter, more peaceful, and filled with connection again.",
            author: "Johnson - Family", 
            date: "April 2024" 
        },
        { 
            quote: "I was hesitant about therapy at first, but now I can't imagine my life without it.", 
            text: "Amandamae created a safe space where I could process my emotions, work through my anxiety, and develop healthier coping mechanisms. This experience has been life-changing, and I can’t recommend her enough!",
            author: "MS. - Individual", 
            date: "June 2024" 
        },
        { 
            quote: "Therapy helped us rebuild trust and improve our communication.", 
            text: "We now have the tools to navigate challenges together rather than against each other. Our relationship has never been stronger, and we owe so much of that to this journey!",
            author: "M&R T. - Couple", 
            date: "February 2024" 
        },
        { 
            quote: "Therapy gave my child the confidence to express themselves.", 
            text: "They’ve gone from feeling overwhelmed to embracing their strengths, and I can see such a positive change in their happiness and resilience. As a parent, I couldn't ask for more!",
            author: "LR. - Parent", 
            date: "December 2023"
        }
    ];

    const carousel = document.querySelector('.testimonials-carousel');
    
    // Populate the testimonials dynamically
    testimonials.forEach((testimonial) => {
        const testimonialDiv = document.createElement('div');
        testimonialDiv.classList.add('testimonial');
        testimonialDiv.innerHTML = `
            <div class="testimonial-content">
                <span class="quote-mark">“</span>
                <p class="testimonial-quote">${testimonial.quote}</p>
                <p class="testimonial-text">${testimonial.text}</p>
                <p class="testimonial-author">${testimonial.author}</p>
                <p class="testimonial-date">${testimonial.date}</p>
            </div>
        `;
        carousel.appendChild(testimonialDiv);
    });

    // Testimonial Carousel Navigation
    const prevButton = document.querySelector('.control-button.left');
    const nextButton = document.querySelector('.control-button.right');
    let scrollAmount = 0;

    if (prevButton && nextButton && carousel) {
        prevButton.addEventListener('click', () => {
            scrollAmount = Math.max(scrollAmount - 300, 0); // Prevent scrolling beyond the start
            carousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
        });

        nextButton.addEventListener('click', () => {
            scrollAmount = Math.min(scrollAmount + 300, carousel.scrollWidth - carousel.offsetWidth);
            carousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
        });
    }
});


// ⬆️ Scroll to Top Button
function setupScrollToTop() {
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.classList.add('scroll-to-top');
    scrollToTopButton.innerHTML = '↑';
    document.body.appendChild(scrollToTopButton);

    window.addEventListener('scroll', () => {
        scrollToTopButton.classList.toggle('visible', window.scrollY > 200);
    });

    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// 📅 Booking Page Form Submission
function setupAppointmentForm() {
    const form = document.getElementById("appointmentForm");
    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            document.getElementById("successModal").style.display = "block";
        });

        document.querySelector(".close-btn").addEventListener("click", function() {
            document.getElementById("successModal").style.display = "none";
        });

        window.addEventListener("click", function(event) {
            if (event.target === document.getElementById("successModal")) {
                document.getElementById("successModal").style.display = "none";
            }
        });
    }
}