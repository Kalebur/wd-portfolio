window.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const navMenu = document.querySelector("nav");
  const menuBtn = document.querySelector(".header-top i");
  const headerHeightWithNav = "25.3rem";
  const defaultHeaderHeight = "6.5rem";
  let menuActive = false;

  menuBtn.addEventListener("click", () => {
    const closeIcon = '<i class="fa-solid fa-xmark"></i>';
    const menuIcon = '<i class="fa-solid fa-bars"></i>';

    if (menuActive) {
      header.style.height = defaultHeaderHeight;
      navMenu.style.transform = "translateY(-100%)";
      menuActive = false;
      menuBtn.classList.remove("fa-xmark");
      menuBtn.classList.add("fa-bars");
    } else {
      header.style.height = headerHeightWithNav;
      navMenu.style.transform = "translateY(0)";
      menuActive = true;
      menuBtn.classList.add("fa-xmark");
      menuBtn.classList.remove("fa-bars");
    }
  });

  window.addEventListener("resize", (e) => {
    header.style = "";

    if (window.innerWidth >= 600) {
      navMenu.style = "";
    }
  });
});
