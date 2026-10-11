const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Mobile navigation
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });
}

// Menu category filters
const filterButtons = document.querySelectorAll(".filter");
const foodCards = document.querySelectorAll(".food-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;

    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");

    foodCards.forEach(card => {
      const matches =
        category === "all" || card.dataset.category === category;

      card.hidden = !matches;
    });
  });
});

// Update copyright year
const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// IMPORTANT: Replace with your restaurant's WhatsApp number.
// Include country code, without +, spaces or dashes.
const restaurantWhatsApp = "919328540992";

function openWhatsApp(message) {
  if (!/^91\d{10}$/.test(restaurantWhatsApp)) {
    alert("Please add the restaurant's correct WhatsApp number in script.js.");
    return;
  }

  const url =
    "https://wa.me/" + restaurantWhatsApp +
    "?text=" + encodeURIComponent(message);

  window.open(url, "_blank", "noopener,noreferrer");
}

// WhatsApp enquiry button
const whatsappLink = document.getElementById("whatsappLink");

if (whatsappLink) {
  whatsappLink.addEventListener("click", event => {
    event.preventDefault();
    openWhatsApp("Hello Desi Rasoi! I would like to enquire about a table.");
  });
}

// Contact form: prepare a WhatsApp message
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {
  contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const message = document.getElementById("customerMessage").value.trim();

    if (!name || !phone || !message) {
      formMessage.textContent = "Please fill in all fields.";
      return;
    }

    const whatsappMessage =
      `Hello Desi Rasoi!\n\n` +
      `Name: ${name}\n` +
      `Customer Phone: ${phone}\n` +
      `Enquiry: ${message}`;

    formMessage.textContent = "Opening WhatsApp...";
    openWhatsApp(whatsappMessage);
  });
}