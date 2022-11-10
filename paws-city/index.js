const appVars = {
  displayedTestimonial: 0,
  testimonials: [
    {
      name: "Elaine Bennet",
      statement:
        "I often order food for my dog from this store as they offer free shipping. The prices here are quite low, and you can order a lot of goods by top manufacturers.",
      image: "assets/photos/testimonial-elaineb.jpg",
    },

    {
      name: "Todd Preston",
      statement:
        "I buy all of my dog food and toys from here. They have an amazing selection, and if something I need is out of stock, they'll have it rush delivered straight to my door.",
      image: "assets/photos/testimonial-toddp.jpg",
    },

    {
      name: "Cathy Morgan",
      statement:
        "This store carries a lot of hard to find products. My cat is a senior and has to be fed a specific type of food. This is the only place I've been able to find it, and it's also really affordable!",
      image: "assets/photos/testimonial-cathym.jpg",
    },
  ],
  siteBody: document.querySelector("body"),
  scrollY: 0,
};

function updateTestimonial(direction) {
  const statement = document.querySelector(".testimonial-text p:first-of-type");
  const name = document.querySelector(".testimonial-text p:last-of-type");
  const photo = document.querySelector(".testimonial-photo");

  if (direction === "next") {
    if (appVars.displayedTestimonial >= appVars.testimonials.length - 1) {
      appVars.displayedTestimonial = 0;
    } else {
      appVars.displayedTestimonial++;
    }
  } else if (direction === "previous") {
    if (appVars.displayedTestimonial <= 0) {
      appVars.displayedTestimonial = appVars.testimonials.length - 1;
    } else {
      appVars.displayedTestimonial--;
    }
  }

  // Fade all elements of the testimonial
  statement.classList.remove("fadeIn");
  statement.classList.add("fadeOut");
  name.classList.remove("fadeIn");
  name.classList.add("fadeOut");
  photo.classList.remove("fadeIn");
  photo.classList.add("fadeOut");

  // Update now faded elements with new values
  // and fade back in after 0.6 seconds.
  setTimeout(() => {
    statement.classList.remove("fadeOut");
    statement.innerHTML =
      "&ldquo;" +
      appVars.testimonials[appVars.displayedTestimonial].statement +
      "&rdquo;";
    statement.classList.add("fadeIn");

    name.classList.remove("fadeOut");
    name.innerHTML = appVars.testimonials[appVars.displayedTestimonial].name;
    name.classList.add("fadeIn");

    photo.classList.remove("fadeOut");
    photo.style.backgroundImage =
      "url('" + appVars.testimonials[appVars.displayedTestimonial].image + "')";
    photo.classList.add("fadeIn");
  }, 600);
}

function validateName(name) {
  if (name === "" || name.length < 2) {
    return false;
  } else {
    const nameRegex = /^[a-zA-Z]{2}/;
    return nameRegex.test(name);
  }
}

// Email regex from:
// https://www.javascripttutorial.net/javascript-dom/javascript-form-validation/
function validateEmail(email) {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
}

window.addEventListener("DOMContentLoaded", () => {
  const siteBody = document.querySelector("body");
  const menuBtn = document.querySelector(".menu-button");
  const searchBtn = document.querySelector(".header-bottom button");
  const cartBtns = document.querySelectorAll(".product-card .button");
  const submitBtn = document.querySelector(".contact-form button");
  const modalBtn = document.querySelector(".modal-content button");
  const navMenu = document.querySelector("nav");
  const nextTestimonialBtn = document.querySelector(".next-button");
  const previousTestimonialBtn = document.querySelector(".previous-button");
  const formFullName = document.querySelector("#full-name");
  const formEmail = document.querySelector("#email");
  const formMessage = document.querySelector("#message");
  const shopButtons = document.querySelectorAll(".card-info .button");
  const petButtons = document.querySelectorAll("nav ul a");

  // Handle displaying/hiding mobile nav menu
  menuBtn.addEventListener("click", (e) => {
    appVars.scrollY = window.scrollY;
    const closeIconHTML = '<i class="fa-solid fa-xmark"></i>';
    const hamburgerHTML = '<i class="fa-solid fa-bars"></i>';

    // Created with help from CSS Tricks
    // https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/
    if (navMenu.classList.contains("nav-active")) {
      const currentScroll = siteBody.style.top;
      navMenu.classList.toggle("nav-active");
      siteBody.classList.toggle("no-scroll");
      window.scrollTo(0, parseInt(currentScroll || 0) * -1);
      menuBtn.innerHTML = hamburgerHTML;
    } else {
      navMenu.classList.toggle("nav-active");
      siteBody.classList.toggle("no-scroll");
      siteBody.style.top = `-${appVars.scrollY}px`;
      menuBtn.innerHTML = closeIconHTML;
    }
  });

  // Handle header search button functionality
  // Site only has one page, so searching will
  // pull up the query on Google shopping
  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const searchQuery = document.querySelector("#search").value;
    const adjustedQuery = searchQuery.split(" ").join("+");
    window.open(
      "https://www.google.com/search?q=" + adjustedQuery + "&tbm=shop"
    );
  });

  // Hide mobile window when clicking links on mobile
  petButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      appVars.siteBody.classList.remove("no-scroll");
      navMenu.classList.remove("nav-active");
      menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });

  // Disable default effect on pet "Shop Now" links
  shopButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
    });
  });

  // Handle effects on the "Add to Cart" buttons
  cartBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      if (!this.classList.contains("cart-success")) {
        this.classList.add("cart-success");
        this.innerHTML = '<i class="fa-solid fa-check"></i> added';

        setTimeout(
          function () {
            this.innerHTML = "Add to Cart";
            this.classList.remove("cart-success");
            this.blur();
          }.bind(this),
          2000
        );
      }
    });
  });

  // Handle changing testimonials
  nextTestimonialBtn.addEventListener("click", () => {
    updateTestimonial("next");
  });

  previousTestimonialBtn.addEventListener("click", () => {
    updateTestimonial("previous");
  });

  // Handle form submission
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const name = document.querySelector("#full-name");
    const email = document.querySelector("#email");
    const message = document.querySelector("#message");
    const modalHeading = document.querySelector(
      '[data-id="modal-customer-name"]'
    );
    const validName = validateName(name.value);
    const validEmail = validateEmail(email.value);
    const validMessage = validateName(message.value); // Uses same validation checks as name
    const modal = document.querySelector(".modal");
    appVars.scrollY = window.scrollY;

    if (!validName) {
      name.focus();
      name.classList.add("invalid");
      document
        .querySelector("#name-group .invalid-alert")
        .classList.remove("no-display");
      return;
    }
    if (!validEmail) {
      email.focus();
      email.classList.add("invalid");
      document
        .querySelector("#email-group .invalid-alert")
        .classList.remove("no-display");
      return;
    }
    if (!validMessage) {
      message.focus();
      message.classList.add("invalid");
      document
        .querySelector("#message-group .invalid-alert")
        .classList.remove("no-display");
      return;
    }

    let fullName = name.value.split(" ");
    modalHeading.innerText = fullName[0];
    modal.style.top = `${appVars.scrollY}px`;
    appVars.siteBody.classList.add("no-scroll");
    modal.classList.remove("no-display");
    appVars.siteBody.style.top = `-${appVars.scrollY}px`;

    name.value = "";
    email.value = "";
    message.value = "";
  });

  // Handle closing of modal window
  modalBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const currentScroll = appVars.siteBody.style.top;
    appVars.siteBody.classList.remove("no-scroll");
    appVars.siteBody.style.top = "";
    window.scrollTo(0, parseInt(currentScroll || 0) * -1);
    document.querySelector(".modal").classList.add("no-display");
  });

  // Handle clearing styles from invalid inputs
  formFullName.addEventListener("focusout", function () {
    this.classList.remove("invalid");
    document
      .querySelector("#name-group .invalid-alert")
      .classList.add("no-display");
  });

  formEmail.addEventListener("focusout", function () {
    this.classList.remove("invalid");
    document
      .querySelector("#email-group .invalid-alert")
      .classList.add("no-display");
  });

  formMessage.addEventListener("focusout", function () {
    this.classList.remove("invalid");
    document
      .querySelector("#message-group .invalid-alert")
      .classList.add("no-display");
  });
});
