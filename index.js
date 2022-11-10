window.addEventListener("DOMContentLoaded", () => {
  const globalVars = {};
  const alertBox = document.querySelector(".alert-box");
  const btnCloseAlert = document.querySelector(".close-button");
  const today = new Date();
  const lastVisitDate = new Date(localStorage.getItem("last-seen-date"));
  const btnSendMsg = document.querySelector("#btn-send-message");
  const name = document.querySelector("#name");
  const email = document.querySelector("#email");
  const msg = document.querySelector("#comments");

  // Reset time to midnight on today's date
  // for easier date comparison
  today.setHours(0, 0, 0, 0);

  // If user hasn't visited the site today, display alert box
  if (today > lastVisitDate) {
    localStorage.setItem("last-seen-date", "" + "" + today);
    alertBox.classList.add("displayed");
  }

  globalVars.hamburgerBtn = document.querySelector(".hamburger");
  globalVars.hamburgerBtn.addEventListener("click", function (e) {
    if (this.classList.contains("nav-active")) {
      this.classList.remove("nav-active");
    } else {
      this.classList.add("nav-active");
    }
  });

  // Add blur event listeners to form inputs
  name.addEventListener("blur", function () {
    clearInvalidOnBlur(this);
  });
  email.addEventListener("blur", function () {
    clearInvalidOnBlur(this);
  });
  msg.addEventListener("blur", function () {
    clearInvalidOnBlur(this);
  });

  // Nav links close mobile nav menu when clicked
  document.querySelectorAll("nav a").forEach(function (item) {
    item.addEventListener("click", function () {
      globalVars.hamburgerBtn.classList.remove("nav-active");
    });
  });

  // Functionality to close the employment status alert box
  btnCloseAlert.addEventListener("click", () => {
    alertBox.classList.remove("displayed");
    setTimeout(() => {
      alertBox.remove();
    }, 1000);
  });

  btnSendMsg.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("MEOW");
    let isFormValid = true;

    if (!validateName(name.value.trim())) {
      name.classList.add("invalid");
      name.focus();
      return;
    }

    if (!validateEmail(email.value.trim())) {
      email.classList.add("invalid");
      email.focus();
      return;
    }

    if (!validateName(comments.value.trim())) {
      msg.classList.add("invalid");
      msg.focus();
      return;
    }

    if (isFormValid) {
      const msgIcon = document.querySelector(".message-icon");
      const btnText = document.querySelector(".btn-text");
      msgIcon.classList.add("displayed");
      btnText.innerHTML = "&nbsp;";

      name.value = "";
      email.value = "";
      msg.value = "";

      setTimeout(() => {
        btnText.innerHTML = "Message Sent!";

        setTimeout(() => {
          msgIcon.classList.remove("displayed");
          btnText.innerHTML = "Send Message";
        }, 1250);
      }, 750);
    }
  });
});

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

function clearInvalidOnBlur(field) {
  field.classList.remove("invalid");
}
