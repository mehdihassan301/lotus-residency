(function () {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile navbar toggle
  const toggleBtn = document.querySelector(".nav-toggle");
  const navMenu = document.getElementById("navMenu");
  const hamburger = document.querySelector(".hamburger");

  function setMenu(open) {
    if (!toggleBtn || !navMenu) return;
    toggleBtn.setAttribute("aria-expanded", String(open));
    navMenu.classList.toggle("is-open", open);

    // Optional: animate hamburger into X
    if (hamburger) {
      if (open) {
        hamburger.style.background = "transparent";
        hamburger.style.position = "relative";
        hamburger.style.setProperty("--open", "1");
        hamburger.style.setProperty("opacity", "1");
        hamburger.style.setProperty("transform", "none");
        hamburger.style.setProperty("transition", "none");
        hamburger.style.setProperty("background", "transparent");
        // CSS pseudo elements can't be directly controlled here; keep simple.
      } else {
        hamburger.style.background = "";
      }
    }
  }

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener("click", () => {
      const isOpen = toggleBtn.getAttribute("aria-expanded") === "true";
      setMenu(!isOpen);
    });

    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll("[data-navlink]");
    navLinks.forEach((a) => {
      a.addEventListener("click", () => setMenu(false));
    });

    // Close menu on outside click
    document.addEventListener("click", (e) => {
      const isOpen = toggleBtn.getAttribute("aria-expanded") === "true";
      if (!isOpen) return;
      const target = e.target;
      const clickedInside = navMenu.contains(target) || toggleBtn.contains(target);
      if (!clickedInside) setMenu(false);
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      const isOpen = toggleBtn.getAttribute("aria-expanded") === "true";
      if (isOpen && e.key === "Escape") setMenu(false);
    });
  }

  // FAQ accordion
  const accordion = document.querySelector("[data-accordion]");
  if (accordion) {
    const items = accordion.querySelectorAll(".faq-item");

    function closeAll(exceptBtn) {
      items.forEach((item) => {
        const btn = item.querySelector(".faq-q");
        const panel = item.querySelector(".faq-a");
        if (!btn || !panel) return;

        if (exceptBtn && btn === exceptBtn) return;

        btn.setAttribute("aria-expanded", "false");
        panel.hidden = true;
      });
    }

    items.forEach((item) => {
      const btn = item.querySelector(".faq-q");
      const panel = item.querySelector(".faq-a");
      if (!btn || !panel) return;

      btn.addEventListener("click", () => {
        const isOpen = btn.getAttribute("aria-expanded") === "true";
        // Single-open behavior (premium UX)
        closeAll(btn);

        btn.setAttribute("aria-expanded", String(!isOpen));
        panel.hidden = isOpen;
      });
    });
  }

  // Basic contact form behavior (no backend)
  const form = document.getElementById("availabilityForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = form.querySelector("#name")?.value?.trim();
      const phone = form.querySelector("#phone")?.value?.trim();
      const guests = form.querySelector("#guests")?.value?.trim();
      const checkin = form.querySelector("#checkin")?.value;
      const nights = form.querySelector("#nights")?.value?.trim();
      const notes = form.querySelector("#notes")?.value?.trim();

      if (!name || !phone || !guests || !checkin || !nights) {
        alert("Please fill in name, phone/WhatsApp, guests, check-in date, and number of nights.");
        return;
      }

      // Convert inquiry into a WhatsApp-ready message (still keeps form useful without a server)
      const msg =
        `BeachViewStays.pk Availability Inquiry%0A` +
        `Name: ${encodeURIComponent(name)}%0A` +
        `Phone/WhatsApp: ${encodeURIComponent(phone)}%0A` +
        `Guests: ${encodeURIComponent(guests)}%0A` +
        `Preferred check-in date: ${encodeURIComponent(checkin)}%0A` +
        `Nights: ${encodeURIComponent(nights)}%0A` +
        (notes ? `Notes: ${encodeURIComponent(notes)}%0A` : "");

      const waUrl = `https://wa.me/923068230101?text=${msg}`;

      // Open WhatsApp in a new tab for fastest conversion
      window.open(waUrl, "_blank", "noopener");

      // Optional: reset after opening WhatsApp
      form.reset();
    });
  }
})();
