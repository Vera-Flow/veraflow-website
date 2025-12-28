// Mobile menu toggle
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("mobile");
});

// Fade-in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Replace with your Brevo form endpoint (from the iframe src, extract the base and add /form)
const BREVO_FORM_ENDPOINT =
  "https://2d94d8e5.sibforms.com/serve/MUIFAOLpOpAdRFbinbDcpHr07F8EzHoDMfdrpsgyRgSvYJNgrCNCpq07YBbHBiX2MfV-T7Xhb5JwuRQliYVp200-uCmwZhp-W_24ivWHsayYYoQvVuqzD5p87AFaSfhoO9Vml03Kr1nlMpk4dflDZoP9N5Bne61X8P1c2EMUb9ysbKpCnw0foSj75HT0AMkyW_n9TYoEru5xzOXL5g==";

const form = document.getElementById("notifyForm");
const emailInput = document.getElementById("email");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const email = emailInput.value.trim();
  if (!email) return;

  // Check cookie consent
  const consent = getCookie("cookieConsent");
  if (consent === "declined") {
    alert("You have declined cookies. Newsletter signup is disabled.");
    return;
  }

  // Prepare form data as Brevo expects
  const formData = new FormData();
  formData.append("EMAIL", email);

  try {
    const response = await fetch(BREVO_FORM_ENDPOINT, {
      method: "POST",
      mode: "no-cors", // Brevo may not support CORS, so we use no-cors
      body: formData,
    });
    // Show success regardless of response due to no-cors
    successMessage.style.display = "block";
    setTimeout(() => {
      successMessage.style.opacity = "1";
    }, 10);
    emailInput.value = "";
    setTimeout(() => {
      successMessage.style.opacity = "0";
      setTimeout(() => {
        successMessage.style.display = "none";
      }, 700);
    }, 4000);
  } catch (err) {
    alert("There was a problem subscribing. Please try again later.");
  }
});

// Cookie Consent Logic
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

const cookieBanner = document.getElementById("cookie-banner");
const acceptBtn = document.getElementById("accept-cookies");
const declineBtn = document.getElementById("decline-cookies");
const notifyForm = document.getElementById("notifyForm");
const submitBtn = notifyForm.querySelector('button[type="submit"]');

const consent = getCookie("cookieConsent");

if (!consent) {
  cookieBanner.classList.remove("hidden");
} else if (consent === "declined") {
  // Hide the entire Join Us section
  document.getElementById("join-us").style.display = "none";
}

acceptBtn.addEventListener("click", () => {
  setCookie("cookieConsent", "accepted", 365);
  cookieBanner.classList.add("hidden");
});

declineBtn.addEventListener("click", () => {
  setCookie("cookieConsent", "declined", 365);
  cookieBanner.classList.add("hidden");
  // Hide the entire Join Us section
  document.getElementById("join-us").style.display = "none";
});
