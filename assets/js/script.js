"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// Smooth navbar scrolling
function smoothScroll(targetElement, duration) {
  const target = document.querySelector(targetElement);
  const targetPosition = target.getBoundingClientRect().top;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t + b;
    t -= 2;
    return (c / 2) * (t * t * t + 2) + b;
  }

  requestAnimationFrame(animation);
}

// Navbar smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    smoothScroll(targetId, 1000); // Duration is 1000 milliseconds
  });
});

document.addEventListener("DOMContentLoaded", function () {
  let index = 0;
  const items = document.querySelectorAll(".project-item");
  // const modal = document.getElementById("modal");
  const modals = document.getElementsByClassName("modal");
  // const modalText = document.getElementById("modal-text");
  const closeButtons = document.getElementsByClassName("modal-close-btn");
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  document.body.appendChild(overlay);

  items.forEach((item, itemIdx) => {
    item.addEventListener("click", function (event) {
      event.preventDefault();
      openModal(itemIdx);
    });
  });

  function openModal(itemIdx) {
    index = itemIdx;
    modals[itemIdx].style.display = "flex";
    overlay.style.display = "block";
    document.body.style.overflow = "hidden"; // Disable scrolling on the body
  }

  function closeModal() {
    modals[index].style.display = "none";
    overlay.style.display = "none";
    document.body.style.overflow = "auto"; // Re-enable scrolling on the body
  }

  // Close modal with close button
  for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener("click", function () {
      closeModal();
    });
  }

  // Close overlay with click on overlay
  for (let i = 0; i < modals.length; i++) {
    modals[i].addEventListener("click", function (event) {
      if (event.target === modals[i]) {
        closeModal();
      }
    });
  }

  // Close overlay with escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal();
    }
  });
});
