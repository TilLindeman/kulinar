document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();

  var inputs = document.querySelectorAll('#myForm input[type="text"]');
  var isValid = true;
  var allFieldsFilled = true;

  // Check if all fields are filled
  inputs.forEach(function (input) {
    var errorMessage = input.parentElement.querySelector(".error-message");

    if (input.value === "") {
      allFieldsFilled = false;
      errorMessage.style.display = "block";
      isValid = false;
    } else {
      errorMessage.style.display = "none";
    }
  });

  // If not all fields are filled, show a general error message
  if (!allFieldsFilled) {
    var generalErrorMessage = document.getElementById("masage-error");
    generalErrorMessage.style.display = "block";
    return;
  }

  // Check if the phone number is valid
  var phoneInput = document.querySelector('input[name="Моб.телефон"]');
  var phoneErrorMessage = document.getElementById("phoneError");
  var phoneRegex =
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

  if (!phoneRegex.test(phoneInput.value)) {
    phoneErrorMessage.style.display = "block";
    isValid = false;
  } else {
    phoneErrorMessage.style.display = "none";
  }

  // If the form is valid, submit it
  if (isValid) {
    var formData = new FormData(event.target);

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          // If the form submission is successful, redirect the user to the home page
          window.location.href = "end.html"; // Replace "/" with the URL of your home page
        } else {
          console.error("Error submitting the form:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error submitting the form:", error);
      });
  }
});
