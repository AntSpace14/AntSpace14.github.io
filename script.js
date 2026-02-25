const body = document.body;

/* CURSOR_REMOVED_START */
/*
// ===== ADVANCED CUSTOM CURSOR SYSTEM =====

// Create main cursor elements
const cursor = document.createElement("div");
cursor.classList.add("cursor");
document.body.appendChild(cursor);

const cursorDot = document.createElement("div");
cursorDot.classList.add("cursor-dot");
cursor.appendChild(cursorDot);

const cursorOutline = document.createElement("div");
cursorOutline.classList.add("cursor-outline");
cursor.appendChild(cursorOutline);

// Create trailing dots
const trailDots = [];
const trailLength = 8;
for (let i = 0; i < trailLength; i++) {
  const dot = document.createElement("div");
  dot.classList.add("cursor-trail-dot");
  document.body.appendChild(dot);
  trailDots.push({
    element: dot,
    x: 0,
    y: 0,
    currentX: 0,
    currentY: 0,
  });
}

// Cursor state
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let isHovering = false;
let isClicking = false;

// Track mouse movement
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Track mouse clicks
document.addEventListener("mousedown", () => {
  isClicking = true;
  cursor.classList.add("clicking");
});

document.addEventListener("mouseup", () => {
  isClicking = false;
  cursor.classList.remove("clicking");
});

// Ultra-smooth cursor animation with easing
function animateCursor() {
  // Smooth easing for main cursor (higher value = faster)
  const ease = 0.15;
  cursorX += (mouseX - cursorX) * ease;
  cursorY += (mouseY - cursorY) * ease;

  cursor.style.left = cursorX + "px";
  cursor.style.top = cursorY + "px";

  // Animate trailing dots with progressive delay
  trailDots.forEach((dot, index) => {
    const delay = (index + 1) * 0.08;
    const targetX = index === 0 ? cursorX : trailDots[index - 1].currentX;
    const targetY = index === 0 ? cursorY : trailDots[index - 1].currentY;

    dot.currentX += (targetX - dot.currentX) * (ease - delay * 0.01);
    dot.currentY += (targetY - dot.currentY) * (ease - delay * 0.01);

    dot.element.style.left = dot.currentX + "px";
    dot.element.style.top = dot.currentY + "px";

    // Progressive opacity for trail effect
    const opacity = 1 - (index / trailLength) * 0.8;
    dot.element.style.opacity = opacity;

    // Progressive scale for trail effect
    const scale = 1 - (index / trailLength) * 0.5;
    dot.element.style.transform = `translate(-50%, -50%) scale(${scale})`;
  });

  requestAnimationFrame(animateCursor);
}
animateCursor();

// Advanced hover effects with magnetic attraction
const hoverElements = document.querySelectorAll(
  "a, button, .project-card, .skill-tag, .btn, .hamburger, input, textarea"
);

hoverElements.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    isHovering = true;
    cursor.classList.add("hovering");

    // Add specific classes for different element types
    if (element.classList.contains("btn") || element.tagName === "BUTTON") {
      cursor.classList.add("hovering-button");
    } else if (element.classList.contains("project-card")) {
      cursor.classList.add("hovering-card");
    } else if (element.tagName === "A") {
      cursor.classList.add("hovering-link");
    } else if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
      cursor.classList.add("hovering-input");
    }
  });

  element.addEventListener("mouseleave", () => {
    isHovering = false;
    cursor.classList.remove(
      "hovering",
      "hovering-button",
      "hovering-card",
      "hovering-link",
      "hovering-input"
    );
  });

  // Magnetic effect - cursor slightly attracted to element center
  element.addEventListener("mousemove", (e) => {
    if (
      element.classList.contains("btn") ||
      element.classList.contains("project-card")
    ) {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (centerX - e.clientX) * 0.15;
      const deltaY = (centerY - e.clientY) * 0.15;

      mouseX = e.clientX + deltaX;
      mouseY = e.clientY + deltaY;
    }
  });
});

*/





// Animated Background
const bgAnimation = document.createElement("div");
bgAnimation.classList.add("bg-animation");
document.body.appendChild(bgAnimation);

// Create floating shapes
for (let i = 1; i <= 5; i++) {
  const shape = document.createElement("div");
  shape.classList.add("floating-shape", `shape-${i}`);
  bgAnimation.appendChild(shape);
}

// Create particles
function createParticles() {
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 15 + "s";
    particle.style.animationDuration = Math.random() * 10 + 10 + "s";
    bgAnimation.appendChild(particle);
  }
}
createParticles();

// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

/*
// Form submission handler
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  const inputs = contactForm.querySelectorAll("input, textarea");

  // Add floating label effect
  inputs.forEach((input) => {
    input.addEventListener("focus", () => {
      input.parentElement.classList.add("focused");
    });

    input.addEventListener("blur", () => {
      if (!input.value) {
        input.parentElement.classList.remove("focused");
      }
    });

    // Add typing animation effect
    input.addEventListener("input", () => {
      input.style.borderColor = "var(--primary-color)";
      setTimeout(() => {
        if (!input.matches(":focus")) {
          input.style.borderColor = "";
        }
      }, 300);
    });
  });

  
  // Form submission handler
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector(".btn-primary");
    const originalText = submitBtn.textContent;

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Disable button and show loading
    submitBtn.disabled = true;
    submitBtn.textContent = "Opening Email...";
    submitBtn.style.opacity = "0.7";

    // Create mailto link
    const mailtoLink = `mailto:vineetkotari98@gmail.com?subject=${encodeURIComponent(
      subject || "Contact Form Message"
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;

    // Open email client
    window.location.href = mailtoLink;

    // Show success message
    setTimeout(() => {
      submitBtn.textContent = "✓ Email Client Opened!";
      submitBtn.style.background = "linear-gradient(135deg, #2ecc71, #27ae60)";

      const successMsg = document.createElement("div");
      successMsg.textContent =
        "Your email client has been opened. Please send the email from there.";
      successMsg.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: linear-gradient(135deg, #2ecc71, #27ae60);
                color: white;
                padding: 1rem 2rem;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(46, 204, 113, 0.3);
                z-index: 10000;
                animation: slideInRight 0.5s ease;
                max-width: 300px;
            `;
      document.body.appendChild(successMsg);

      // Remove success message after 4 seconds
      setTimeout(() => {
        successMsg.style.animation = "slideOutRight 0.5s ease";
        setTimeout(() => successMsg.remove(), 500);
      }, 4000);

      // Reset button after 3 seconds
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        submitBtn.style.opacity = "1";
        submitBtn.style.background = "";
      }, 3000);
    }, 500);
  });
}
*/

// Add scroll effect to navbar
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
  } else {
    navbar.style.boxShadow =
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
  }
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(20px)";
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(section);
});

// ===== ADVANCED EFFECTS =====

// Typing Animation (modified to avoid collapsing/overlap)
const typingText = document.querySelector(".typing-text");
if (typingText) {
  const texts = [
    "Data Analyst",
    "Building Data Pipelines with Snowflake",
    "ETL Automation via Alteryx",
    "Visualizing Insights in Power BI",
    "Leveraging AWS for Scalable Analytics",
  ];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentText = texts[textIndex];
    // compute the visible substring
    const visible = isDeleting
      ? currentText.substring(0, Math.max(0, charIndex - 1))
      : currentText.substring(0, Math.min(currentText.length, charIndex + 1));

    // If visible becomes empty, use a non-breaking space so the element keeps its height.
    typingText.textContent = visible.length ? visible : "\u00A0";

    // update counters after applying text
    if (isDeleting) {
      charIndex = Math.max(0, charIndex - 1);
    } else {
      charIndex = Math.min(currentText.length, charIndex + 1);
    }

    let typeSpeed = isDeleting ? 30 : 80;

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2500; // pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 500; // pause before typing next
      // ensure we keep a stable placeholder (we already set NBSP above)
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

// 3D Tilt Effect
const tiltElements = document.querySelectorAll("[data-tilt]");
tiltElements.forEach((element) => {
  element.addEventListener("mousemove", (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  });

  element.addEventListener("mouseleave", () => {
    element.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
  });
});

// Ripple Effect for Buttons
const rippleButtons = document.querySelectorAll(".ripple-btn");
rippleButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");

    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";

    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// Skill Progress Bars Animation
const progressBars = document.querySelectorAll(".progress-bar");
const progressObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const progress = progressBar.getAttribute("data-progress");
        setTimeout(() => {
          progressBar.style.width = progress + "%";
        }, 200);
        progressObserver.unobserve(progressBar);
      }
    });
  },
  { threshold: 0.5 }
);

progressBars.forEach((bar) => progressObserver.observe(bar));

// Parallax Effect - Disabled to prevent visual issues
// Uncomment if you want subtle parallax on hero section
/*
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        const speed = 0.3;
        hero.style.transform = `translateY(${scrolled * speed}px)`;
    }
});
*/

// Scroll Reveal Animation
const revealElements = document.querySelectorAll(
  ".skill-category, .project-card, .contact-item"
);
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
);

revealElements.forEach((element) => {
  element.style.opacity = "0";
  element.style.transform = "translateY(30px)";
  element.style.transition = "all 0.6s ease";
  revealObserver.observe(element);
});

// Navbar Scroll Effect - Fixed to stay visible
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Keep navbar always visible - removed auto-hide behavior
  navbar.style.transform = "translateY(0)";
});

// Smooth Scroll with Offset
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offset = 80;
      const targetPosition = target.offsetTop - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

// Magnetic Effect for Buttons
const magneticButtons = document.querySelectorAll(".btn");
magneticButtons.forEach((button) => {
  button.addEventListener("mousemove", (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "translate(0, 0)";
  });
});

// Image Lazy Loading with Blur Effect
const images = document.querySelectorAll("img[data-src]");
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.add("loaded");
      imageObserver.unobserve(img);
    }
  });
});

images.forEach((img) => imageObserver.observe(img));

// Particle Mouse Trail - Reduced for better performance
let particles = [];
const particleCount = 5;
let particleThrottle = 0;

document.addEventListener("mousemove", (e) => {
  particleThrottle++;
  if (particles.length < particleCount && particleThrottle % 5 === 0) {
    createParticleTrail(e.clientX, e.clientY);
  }
});

function createParticleTrail(x, y) {
  const particle = document.createElement("div");
  particle.className = "mouse-particle";
  particle.style.left = x + "px";
  particle.style.top = y + "px";
  document.body.appendChild(particle);

  particles.push(particle);

  setTimeout(() => {
    particle.remove();
    particles = particles.filter((p) => p !== particle);
  }, 800);
}

/*
// Add CSS for mouse particles
const style = document.createElement("style");
style.textContent = `
    .mouse-particle {
        position: fixed;
        width: 4px;
        height: 4px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9997;
        opacity: 0.4;
        animation: particle-fade 0.8s ease-out forwards;
    }
    
    @keyframes particle-fade {
        to {
            opacity: 0;
            transform: scale(0) translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

*/

// Text Scramble Effect
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }

    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = "";
    let complete = 0;

    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];

      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += char;
      } else {
        output += from;
      }
    }

    this.el.innerHTML = output;

    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

// Enhanced Scroll Progress Indicator
const scrollProgress = document.createElement("div");
scrollProgress.className = "scroll-progress";
scrollProgress.innerHTML = '<div class="scroll-progress-bar"></div>';
document.body.appendChild(scrollProgress);

const scrollProgressStyle = document.createElement("style");
scrollProgressStyle.textContent = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: rgba(42, 157, 143, 0.1);
        z-index: 10000;
    }
    
    .scroll-progress-bar {
        height: 100%;
        background: linear-gradient(90deg, var(--primary-color), var(--burnt-peach));
        width: 0%;
        transition: width 0.1s ease;
    }
`;
document.head.appendChild(scrollProgressStyle);

window.addEventListener("scroll", () => {
  const windowHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (window.pageYOffset / windowHeight) * 100;
  document.querySelector(".scroll-progress-bar").style.width = scrolled + "%";
});

// Console Easter Egg
console.log(
  "%c👋 Hello, curious developer!",
  "font-size: 20px; color: #2a9d8f; font-weight: bold;"
);
console.log(
  "%cLike what you see? Let's connect!",
  "font-size: 14px; color: #264653;"
);
console.log(
  "%c🚀 Built with passion and attention to detail",
  "font-size: 12px; color: #f4a261;"
);

// ===== DARK/LIGHT THEME TOGGLE =====

document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  if (!themeToggle) {
    console.warn("Theme toggle button not found.");
    return;
  }

  // Load saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
  }

  // Toggle theme
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    const theme = body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("theme", theme);

    // Restart stars animation if needed
    if (theme === "dark" && typeof initStars === "function") {
      initStars();
    }
  });
});

// ===== COSMIC STARS ANIMATION (DARK MODE ONLY) =====

const canvas = document.getElementById("starsCanvas");
const ctx = canvas.getContext("2d");

let stars = [];
const numStars = 150;

// Set canvas size
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Star class
class Star {
  constructor() {
    this.reset();
    this.y = Math.random() * canvas.height;
    this.opacity = Math.random() * 0.5 + 0.1;
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = -10;
    this.size = Math.random() * 1.5 + 0.5;
    this.speed = Math.random() * 0.3 + 0.1;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.twinkleSpeed = Math.random() * 0.02 + 0.01;
    this.twinkleDirection = Math.random() > 0.5 ? 1 : -1;
  }

  update() {
    // Slow downward drift
    this.y += this.speed;

    // Twinkling effect
    this.opacity += this.twinkleSpeed * this.twinkleDirection;
    if (this.opacity <= 0.1 || this.opacity >= 0.6) {
      this.twinkleDirection *= -1;
    }

    // Reset if star goes off screen
    if (this.y > canvas.height) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 206, 209, ${this.opacity})`;
    ctx.fill();

    // Add subtle glow
    ctx.shadowBlur = 3;
    ctx.shadowColor = `rgba(0, 206, 209, ${this.opacity * 0.5})`;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

// Initialize stars
function initStars() {
  stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push(new Star());
  }
}

// Animation loop
function animateStars() {
  if (!body.classList.contains("dark-mode")) {
    requestAnimationFrame(animateStars);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach((star) => {
    star.update();
    star.draw();
  });

  requestAnimationFrame(animateStars);
}

// Initialize and start animation
resizeCanvas();
initStars();
animateStars();

// Resize canvas on window resize
window.addEventListener("resize", () => {
  resizeCanvas();
  initStars();
});

// Add shooting stars occasionally
function createShootingStar() {
  if (!body.classList.contains("dark-mode")) return;

  const shootingStar = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height * 0.5,
    length: Math.random() * 80 + 40,
    speed: Math.random() * 10 + 10,
    opacity: 1,
    angle: Math.PI / 4,
  };

  function animateShootingStar() {
    if (shootingStar.opacity <= 0) return;

    ctx.beginPath();
    ctx.moveTo(shootingStar.x, shootingStar.y);
    ctx.lineTo(
      shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length,
      shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length
    );
    ctx.strokeStyle = `rgba(0, 206, 209, ${shootingStar.opacity})`;
    ctx.lineWidth = 2;
    ctx.stroke();

    shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
    shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
    shootingStar.opacity -= 0.02;

    requestAnimationFrame(animateShootingStar);
  }

  animateShootingStar();
}

// Create shooting star every 8-15 seconds
setInterval(() => {
  if (body.classList.contains("dark-mode") && Math.random() > 0.5) {
    createShootingStar();
  }
}, 10000);

console.log(
  "%c🌟 Cosmic Theme Activated!",
  "font-size: 16px; color: #00CED1; font-weight: bold;"
);
console.log(
  "%cToggle between Light and Dark modes using the button in the top-right corner",
  "font-size: 12px; color: #00A8AA;"
);

// ===== JOURNEY TIMELINE ANIMATIONS =====

// Animate timeline items on scroll
const timelineItems = document.querySelectorAll(".timeline-item");
const timelineProgress = document.querySelector(".timeline-progress");

const timelineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Update progress line
        updateTimelineProgress();
      }
    });
  },
  {
    threshold: 0.3,
    rootMargin: "0px 0px -100px 0px",
  }
);

timelineItems.forEach((item) => {
  timelineObserver.observe(item);
});

// Update timeline progress line based on scroll
function updateTimelineProgress() {
  const timelineContainer = document.querySelector(".timeline-container");
  if (!timelineContainer) return;

  const containerRect = timelineContainer.getBoundingClientRect();
  const containerTop = containerRect.top;
  const containerHeight = containerRect.height;
  const windowHeight = window.innerHeight;

  // Calculate progress percentage
  let progress = 0;
  if (containerTop < windowHeight) {
    const visibleHeight = Math.min(
      windowHeight - containerTop,
      containerHeight
    );
    progress = (visibleHeight / containerHeight) * 100;
    progress = Math.max(0, Math.min(100, progress));
  }

  if (timelineProgress) {
    timelineProgress.style.height = progress + "%";
  }
}

// Update progress on scroll
window.addEventListener("scroll", updateTimelineProgress);

// Stagger animation for timeline items
timelineItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 0.15}s`;
});

// Add hover effect to timeline markers
const timelineMarkers = document.querySelectorAll(".timeline-marker");
timelineMarkers.forEach((marker) => {
  marker.addEventListener("mouseenter", function () {
    this.querySelector(".marker-dot").style.transform =
      "translate(-50%, -50%) scale(1.2)";
  });

  marker.addEventListener("mouseleave", function () {
    this.querySelector(".marker-dot").style.transform =
      "translate(-50%, -50%) scale(1)";
  });
});

// Animate timeline on page load
window.addEventListener("load", () => {
  setTimeout(() => {
    updateTimelineProgress();
  }, 500);
});

// Add parallax effect to timeline items
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;

  timelineItems.forEach((item, index) => {
    const rect = item.getBoundingClientRect();
    const itemTop = rect.top + scrolled;
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      const speed = index % 2 === 0 ? 0.05 : -0.05;
      const yPos = (scrolled - itemTop) * speed;
      item.style.transform = `translateY(${yPos}px)`;
    }
  });
});

console.log(
  "%c🗺️ Journey Timeline Loaded!",
  "font-size: 14px; color: #2a9d8f; font-weight: bold;"
);

// ===== TECHNICAL SKILLS ADVANCED EFFECTS =====

const techCards = document.querySelectorAll(".tech-skill-card");

// 3D Tilt Effect on Mouse Move
techCards.forEach((card) => {
  card.addEventListener("mousemove", function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 8;
    const rotateY = (centerX - x) / 8;

    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.05)`;
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "";
  });
});

// Magnetic Effect - Cards attract to cursor
techCards.forEach((card) => {
  card.addEventListener("mousemove", function (e) {
    const rect = this.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - cardCenterX) * 0.1;
    const deltaY = (e.clientY - cardCenterY) * 0.1;

    const icon = this.querySelector(".tech-icon-wrapper");
    if (icon) {
      icon.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.1) rotate(5deg)`;
    }
  });

  card.addEventListener("mouseleave", function () {
    const icon = this.querySelector(".tech-icon-wrapper");
    if (icon) {
      icon.style.transform = "";
    }
  });
});

// Particle Explosion on Click
techCards.forEach((card) => {
  card.addEventListener("click", function (e) {
    const rect = this.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    createTechParticles(x, y);

    // Pulse animation
    this.style.animation = "none";
    setTimeout(() => {
      this.style.animation = "";
    }, 10);
  });
});

function createTechParticles(x, y) {
  const colors = ["#f4a261", "#e76f51", "#e9c46a", "#2a9d8f"];
  const particleCount = 15;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "tech-particle";

    const angle = (Math.PI * 2 * i) / particleCount;
    const velocity = 120 + Math.random() * 60;
    const size = 6 + Math.random() * 4;

    particle.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            left: ${x}px;
            top: ${y}px;
            box-shadow: 0 0 15px currentColor;
        `;

    document.body.appendChild(particle);

    const deltaX = Math.cos(angle) * velocity;
    const deltaY = Math.sin(angle) * velocity;

    particle.animate(
      [
        {
          transform: "translate(0, 0) scale(1) rotate(0deg)",
          opacity: 1,
        },
        {
          transform: `translate(${deltaX}px, ${deltaY}px) scale(0) rotate(720deg)`,
          opacity: 0,
        },
      ],
      {
        duration: 1000,
        easing: "cubic-bezier(0, .9, .57, 1)",
      }
    ).onfinish = () => particle.remove();
  }
}

// Scroll Reveal Animation
const techCardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 100);
        techCardObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

techCards.forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(50px)";
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  techCardObserver.observe(card);
});

/*
// Glow Effect Trail
techCards.forEach((card) => {
  card.addEventListener("mousemove", function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const glow = document.createElement("div");
    glow.style.cssText = `
            position: absolute;
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, rgba(231, 111, 81, 0.4), transparent);
            border-radius: 50%;
            left: ${x - 50}px;
            top: ${y - 50}px;
            pointer-events: none;
            animation: glow-fade 1s ease-out forwards;
        `;

    this.appendChild(glow);
    setTimeout(() => glow.remove(), 1000);
  });
});

*/
// Add glow fade animation
const glowStyle = document.createElement("style");
glowStyle.textContent = `
    @keyframes glow-fade {
        from {
            opacity: 1;
            transform: scale(0);
        }
        to {
            opacity: 0;
            transform: scale(2);
        }
    }
`;
document.head.appendChild(glowStyle);

// Icon Bounce on Hover
techCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    const icon = this.querySelector(".tech-icon");
    if (icon) {
      icon.style.animation = "icon-bounce-tech 0.6s ease";
    }
  });
});

const iconBounceStyle = document.createElement("style");
iconBounceStyle.textContent = `
    @keyframes icon-bounce-tech {
        0%, 100% { transform: scale(1.15) rotate(-5deg) translateY(0); }
        25% { transform: scale(1.2) rotate(-5deg) translateY(-10px); }
        50% { transform: scale(1.15) rotate(-5deg) translateY(0); }
        75% { transform: scale(1.2) rotate(-5deg) translateY(-5px); }
    }
`;
document.head.appendChild(iconBounceStyle);

// Parallax Effect on Scroll
window.addEventListener("scroll", () => {
  const techSection = document.querySelector(".technical-skills");
  if (!techSection) return;

  const rect = techSection.getBoundingClientRect();
  const scrolled = window.pageYOffset;

  if (rect.top < window.innerHeight && rect.bottom > 0) {
    const circles = document.querySelectorAll(".tech-circle");
    circles.forEach((circle, index) => {
      const speed = 0.05 + index * 0.02;
      const yPos = -(scrolled - techSection.offsetTop) * speed;
      circle.style.transform = `translateY(${yPos}px)`;
    });
  }
});

console.log(
  "%c⚡ Technical Skills Section Loaded!",
  "font-size: 14px; color: #f4a261; font-weight: bold;"
);
