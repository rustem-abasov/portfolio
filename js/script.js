// live clock
function tick() {
  const d = new Date();
  const clock = document.getElementById("clock");
  if (!clock) return;
  clock.textContent =
    d.getHours().toString().padStart(2, "0") +
    ":" +
    d.getMinutes().toString().padStart(2, "0");
}
tick();
setInterval(tick, 1000 * 20);

// Hero typing effect
const typingTexts = ["Salam", "Hello", "Selam"];
const typedText = document.getElementById("typed-text");
if (typedText) {
  let textIndex = 0;
  let characterIndex = 0;
  let isDeleting = false;

  function typeHeroText() {
    const currentText = typingTexts[textIndex];
    characterIndex += isDeleting ? -1 : 1;
    typedText.textContent = currentText.substring(0, characterIndex);

    let typeSpeed = isDeleting ? 45 : 75;
    if (!isDeleting && characterIndex === currentText.length) {
      isDeleting = true;
      typeSpeed = 1600;
    } else if (isDeleting && characterIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % typingTexts.length;
      typeSpeed = 450;
    }

    setTimeout(typeHeroText, typeSpeed);
  }

  setTimeout(typeHeroText, 500);
}

// mobile nav toggle
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");
if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen);
    navToggle.setAttribute(
      "aria-label",
      isOpen ? "Menyunu bağla" : "Menyunu aç",
    );
    navToggle.textContent = isOpen ? "×" : "☰";
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (!window.matchMedia("(max-width: 960px)").matches) return;
      mainNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Menyunu aç");
      navToggle.textContent = "☰";
    });
  });
}

// Sidebar submenus
document.querySelectorAll(".has-submenu").forEach((submenuParent) => {
  const submenuToggle = submenuParent.querySelector(
    ":scope > .menu-parent > .submenu-toggle",
  );
  if (!submenuToggle) return;

  submenuToggle.addEventListener("click", () => {
    const isOpen = submenuParent.classList.toggle("is-open");
    submenuToggle.setAttribute("aria-expanded", isOpen);
    submenuToggle.setAttribute(
      "aria-label",
      isOpen ? "Alt menyunu bağla" : "Alt menyunu aç",
    );
  });
});

// Animate skill bars and percentages when the section enters the viewport.
const skillsGrid = document.querySelector(".skills-grid");
if (skillsGrid) {
  const animateSkills = () => {
    skillsGrid.querySelectorAll(".skill-fill").forEach((fill) => {
      fill.style.width = `${fill.dataset.level}%`;
    });

    skillsGrid.querySelectorAll(".skill-value").forEach((value, index) => {
      const target = Number(
        skillsGrid.querySelectorAll(".skill-fill")[index].dataset.level,
      );
      let current = 0;
      const step = () => {
        current = Math.min(current + 2, target);
        value.textContent = `${current}%`;
        if (current < target) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  };

  const skillsObserver = new IntersectionObserver(
    (entries, observer) => {
      if (!entries[0].isIntersecting) return;
      animateSkills();
      observer.disconnect();
    },
    { threshold: 0.25 },
  );
  skillsObserver.observe(skillsGrid);
}

// active link on scroll
const links = document.querySelectorAll("#mainNav a");
const sections = [...links]
  .map((l) => document.querySelector(l.getAttribute("href")))
  .filter(Boolean);
window.addEventListener("scroll", () => {
  let idx = 0;
  sections.forEach((sec, i) => {
    if (window.scrollY + 120 >= sec.offsetTop) idx = i;
  });
  links.forEach((l) => l.closest("li")?.classList.remove("active-menu"));
  links[idx]?.closest("li")?.classList.add("active-menu");
});

// contact form
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const toast = document.getElementById("toast");
  toast.classList.add("show");
  this.reset();
  setTimeout(() => toast.classList.remove("show"), 2600);
});

const backToTop = document.getElementById("backToTop");
backToTop?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
});

// project portfolio filter (eael-filter-gallery)
const filterButtons = document.querySelectorAll(".eael-filter-gallery-control");
const filterItems = document.querySelectorAll(".filter-item");
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    const f = btn.dataset.filter;
    filterItems.forEach((item) => {
      const show = f === "all" || item.dataset.category === f;
      item.classList.toggle("hidden", !show);
    });
  });
});

// Open project previews in a modal.
const projectModal = document.getElementById("projectModal");
const projectModalImage = document.getElementById("projectModalImage");
const projectModalTitle = document.getElementById("projectModalTitle");
const previewButtons = document.querySelectorAll(".preview-project");
const closeModal = () => {
  projectModal?.classList.remove("is-open");
  projectModal?.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

previewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!projectModal || !projectModalImage || !projectModalTitle) return;
    projectModalImage.src = button.dataset.image;
    projectModalImage.alt = button.dataset.title;
    projectModalTitle.textContent = button.dataset.title;
    projectModal.classList.add("is-open");
    projectModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

projectModal?.querySelectorAll("[data-close-modal]").forEach((element) => {
  element.addEventListener("click", closeModal);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

setInterval(() => {
  plusSlides(1);
}, 5000);
