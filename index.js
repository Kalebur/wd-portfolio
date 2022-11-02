window.addEventListener("DOMContentLoaded", () => {
  const globalVars = {};

  globalVars.hamburgerBtn = document.querySelector(".hamburger");
  globalVars.hamburgerBtn.addEventListener("click", function (e) {
    if (this.classList.contains("nav-active")) {
      this.classList.remove("nav-active");
    } else {
      this.classList.add("nav-active");
    }
  });

  document.querySelectorAll("nav a").forEach(function (item) {
    item.addEventListener("click", function () {
      globalVars.hamburgerBtn.classList.remove("nav-active");
    });
  });
});
