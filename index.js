const inputs = document.querySelectorAll("input");
const button = document.querySelector("button");
const password = document.querySelector("#password");
const passwordMessage = document.querySelector("#password-message");
const passwordConstraints =
  "Should be 8 to 40 characters. Lower case and upper case letters, at least one number and one symbol.";

inputs.forEach((input) => {
  input.addEventListener("change", checkPattern);
});

password.addEventListener("focus", showPasswordConstraints);
button.addEventListener("click", lookForInvalidValues);

function showPasswordConstraints() {
  passwordMessage.textContent = passwordConstraints;
  passwordMessage.classList.add("password-constraint");
}

function checkPattern() {
  const input = this;
  const isPatternInvalid = input.validity.patternMismatch;

  giveFeedbackToUser(input, isPatternInvalid);
}

function lookForInvalidValues(e) {
  inputs.forEach((input) => {
    if (input.validity.valid === false) {
      e.preventDefault();
    }

    const isValueMissing = input.validity.valueMissing;

    if (isValueMissing) {
      giveFeedbackToUser(input, isValueMissing);
    } else {
      return;
    }
  });
}

function giveFeedbackToUser(input, isInvalid) {
  const errorIcon = input.nextElementSibling;
  const errorMessage = errorIcon.nextElementSibling;

  if (isInvalid) {
    input.classList.add("invalid");
    errorIcon.classList.add("error");
    errorMessage.classList.add("error");

    errorMessage.textContent = selectErrorMessage(input);
  } else {
    input.classList.remove("invalid");
    errorIcon.classList.remove("error");
    errorMessage.classList.remove("error");
  }
}

function selectErrorMessage(input) {
  const label = input.getAttribute("placeholder");
  let message = "";

  if (input.value == "") {
    message = `${label} cannot be empty.`;
  } else {
    switch (label) {
      case "First Name":
      case "Last Name":
        message = `Please enter a valid ${label}.`;
        break;

      case "Email Address":
        message = `Looks like this is not an email.
                   Valid email format: name@host.tld`;
        break;

      case "Password":
        message = passwordConstraints;
        break;
    }
  }
  return message;
}
