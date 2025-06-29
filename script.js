document.addEventListener("DOMContentLoaded", function () {
  // Sticky Navigation
  const navbar = document.getElementById("navbar");
  const navLogo = document.getElementById("nav-logo");

  //contact form
  const contactForm = document.getElementById("contact-form");
  const serviceType = document.getElementById("service-type");
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const emailInput = document.getElementById("email");
  const successMessage = document.getElementById("form-success");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.style.padding = "10px 0";
      navLogo.style.width = "40px";
      navLogo.style.height = "40px";
    } else {
      navbar.style.padding = "15px 0";
      navLogo.style.width = "50px";
      navLogo.style.height = "50px";
    }
  });

  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", function () {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // Smooth Scrolling for Navigation Links
  document.querySelectorAll("nav a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      navLinks.classList.remove("active");
      hamburger.classList.remove("active");

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      window.scrollTo({
        top: targetSection.offsetTop - 70,
        behavior: "smooth",
      });
    });
  });

  // Highlight Active Navigation Item on Scroll
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 300) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active");
      }
    });
  });

  // Testimonial Carousel
  const testimonials = [
    {
      text: "The team did an amazing job on our end of lease clean. The real estate was very impressed and we got our full bond back. Highly recommend!",
      name: "Sarah Johnson",
      location: "Reservoir, VIC",
    },
    {
      text: "I've been using NextGen 360 for my office cleaning for 6 months now and couldn't be happier. They're reliable, thorough and reasonably priced.",
      name: "Michael Chen",
      location: "Business Owner, Preston",
    },
    {
      text: "After our renovation, the builders left the place a mess. NextGen 360 transformed it completely - it looks better than when we moved in!",
      name: "The Wilson Family",
      location: "Wollert, VIC",
    },
    {
      text: "The carpet steam cleaning service was exceptional. They removed stains I thought were permanent and left the place smelling fresh.",
      name: "Lisa Thompson",
      location: "Epping, VIC",
    },
    {
      text: "Prompt, professional and perfect results every time. We use them for our commercial cleaning and they never disappoint.",
      name: "James Robertson",
      location: "Commercial Client, Melbourne",
    },
    {
      text: "The window cleaning service was outstanding. They reached high windows safely and left them streak-free. Will definitely book again.",
      name: "Emma Davis",
      location: "Mill Park, VIC",
    },
    {
      text: "Our driveway looked brand new after their pressure washing service. Very impressed with their attention to detail.",
      name: "David Wilson",
      location: "South Morang, VIC",
    },
    {
      text: "The tile and grout cleaning restored our bathroom to like-new condition. The team was friendly and efficient.",
      name: "Sophia Martinez",
      location: "Bundoora, VIC",
    },
  ];

  let currentTestimonial = 0;
  const testimonialPrev = document.querySelector(".testimonial-prev");
  const testimonialCurrent = document.querySelector(".testimonial-current");
  const testimonialNext = document.querySelector(".testimonial-next");
  const dots = document.querySelectorAll(".dot");

  function updateTestimonials() {
    let prevIndex =
      (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    let nextIndex = (currentTestimonial + 1) % testimonials.length;

    testimonialPrev.innerHTML = `
            <div class="testimonial-content">
                <p>"${testimonials[prevIndex].text}"</p>
                <div class="client-info">
                    <span class="client-name">${testimonials[prevIndex].name}</span>
                    <span class="client-location">${testimonials[prevIndex].location}</span>
                </div>
            </div>
        `;

    testimonialCurrent.innerHTML = `
            <div class="testimonial-content">
                <p>"${testimonials[currentTestimonial].text}"</p>
                <div class="client-info">
                    <span class="client-name">${testimonials[currentTestimonial].name}</span>
                    <span class="client-location">${testimonials[currentTestimonial].location}</span>
                </div>
            </div>
        `;

    testimonialNext.innerHTML = `
            <div class="testimonial-content">
                <p>"${testimonials[nextIndex].text}"</p>
                <div class="client-info">
                    <span class="client-name">${testimonials[nextIndex].name}</span>
                    <span class="client-location">${testimonials[nextIndex].location}</span>
                </div>
            </div>
        `;

    dots.forEach((dot, index) => {
      dot.classList.remove("active");
      if (index === currentTestimonial) {
        dot.classList.add("active");
      }
    });
  }

  document
    .querySelector(".next-testimonial")
    .addEventListener("click", function () {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      updateTestimonials();
    });

  document
    .querySelector(".prev-testimonial")
    .addEventListener("click", function () {
      currentTestimonial =
        (currentTestimonial - 1 + testimonials.length) % testimonials.length;
      updateTestimonials();
    });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", function () {
      currentTestimonial = index;
      updateTestimonials();
    });
  });

  // Auto-rotate testimonials
  let testimonialInterval = setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    updateTestimonials();
  }, 5000);

  // Pause auto-rotation on hover
  const testimonialContainer = document.querySelector(".testimonial-container");
  testimonialContainer.addEventListener("mouseenter", () => {
    clearInterval(testimonialInterval);
  });

  testimonialContainer.addEventListener("mouseleave", () => {
    testimonialInterval = setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      updateTestimonials();
    }, 5000);
  });

  // Initialize testimonials
  updateTestimonials();

  // Form validation
  function validateForm() {
    let isValid = true;

    // Reset error states
    document.querySelectorAll(".form-group").forEach((group) => {
      group.classList.remove("error");
    });

    // Validate service type
    if (serviceType.value === "") {
      document.getElementById("service-type-error").textContent =
        "Please select a service type";
      serviceType.parentElement.classList.add("error");
      isValid = false;
    }

    // Validate name
    if (nameInput.value.trim() === "") {
      document.getElementById("name-error").textContent =
        "Please enter your name";
      nameInput.parentElement.classList.add("error");
      isValid = false;
    }

    // Validate phone
    const phoneRegex = /^[\d\s+()-]+$/;
    if (phoneInput.value.trim() === "" || !phoneRegex.test(phoneInput.value)) {
      document.getElementById("phone-error").textContent =
        "Please enter a valid phone number";
      phoneInput.parentElement.classList.add("error");
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === "" || !emailRegex.test(emailInput.value)) {
      document.getElementById("email-error").textContent =
        "Please enter a valid email address";
      emailInput.parentElement.classList.add("error");
      isValid = false;
    }

    return isValid;
  }

  // Form submission
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (validateForm()) {
      const submitBtn = contactForm.querySelector(".submit-btn");
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      try {
        // Create new FormData and exclude captcha fields
        const filteredFormData = new FormData();
        const originalFormData = new FormData(contactForm);

        // Copy all fields except captcha responses
        for (let [key, value] of originalFormData.entries()) {
          if (!["g-recaptcha-response", "h-captcha-response"].includes(key)) {
            filteredFormData.append(key, value);
          }
        }

        const response = await fetch(contactForm.action, {
          method: "POST",
          body: filteredFormData,
          headers: {
            Accept: "application/json",
          },
        });

        const result = await response.json();

        if (result.success) {
          successMessage.textContent =
            "Thank you for your request! We will contact you shortly.";
          successMessage.style.display = "block";
          contactForm.reset();

          // Hide success message after 5 seconds
          setTimeout(() => {
            successMessage.style.display = "none";
          }, 5000);
        }
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit Request";
      }
    }
  });

  // Real-time validation
  serviceType.addEventListener("change", function () {
    if (this.value !== "") {
      this.parentElement.classList.remove("error");
    }
  });

  nameInput.addEventListener("input", function () {
    if (this.value.trim() !== "") {
      this.parentElement.classList.remove("error");
    }
  });

  phoneInput.addEventListener("input", function () {
    const phoneRegex = /^[\d\s+()-]+$/;
    if (this.value.trim() !== "" && phoneRegex.test(this.value)) {
      this.parentElement.classList.remove("error");
    }
  });

  emailInput.addEventListener("input", function () {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.value.trim() !== "" && emailRegex.test(this.value)) {
      this.parentElement.classList.remove("error");
    }
  });
});

// Enhanced Parallax Effect
document.addEventListener("DOMContentLoaded", function () {
  const hero = document.querySelector(".hero");
  const heroContent = document.querySelector(".hero-content");

  // Only apply parallax on larger screens
  if (window.innerWidth > 768) {
    window.addEventListener("scroll", function () {
      const scrollPosition = window.pageYOffset;
      const heroHeight = hero.offsetHeight;

      // Calculate the parallax effect (slower movement than scroll)
      const backgroundPosition = scrollPosition * 0.3;
      const contentPosition = scrollPosition * 0.15;

      // Apply the effect
      hero.style.backgroundPositionY = `calc(50% + ${backgroundPosition}px)`;

      // Optional: Add subtle content movement
      heroContent.style.transform = `translateY(${contentPosition}px)`;
      heroContent.style.opacity = 1 - (scrollPosition / heroHeight) * 1.5;
    });
  }
});
