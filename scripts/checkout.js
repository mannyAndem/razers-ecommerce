//Form Validation

const submitBtn = document.querySelector("#submit-btn");
const checkoutForm = document.querySelector("#checkout-form");

checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let formValidity = 0; //variable to check the validity of inputs. As each input is validated, the variable is incremented by 1. If the form validity is 7, the form is completely validated.
  //Validating the text inputs
  const firstName = document.querySelector("#first-name");
  if (validateText(firstName.value)) {
    firstName.nextElementSibling.innerHTML = "";
    firstName.classList.remove("border-danger");
    formValidity++;
  } else {
    firstName.nextElementSibling.innerHTML = "First name is required";
    firstName.classList.add("border-danger");
  }
  const lastName = document.querySelector("#last-name");
  if (validateText(lastName.value)) {
    lastName.nextElementSibling.innerHTML = "";
    lastName.classList.remove("border-danger");
    formValidity++;
  } else {
    lastName.nextElementSibling.innerHTML = "Last name is required";
    lastName.classList.add("border-danger");
  }
  const state = document.querySelector("#state");
  if (validateText(state.value)) {
    state.nextElementSibling.innerHTML = "";
    state.classList.remove("border-danger");
    formValidity++;
  } else {
    state.nextElementSibling.innerHTML = "State is required";
    state.classList.add("border-danger");
  }
  const city = document.querySelector("#city");
  if (validateText(city.value)) {
    city.nextElementSibling.innerHTML = "";
    city.classList.remove("border-danger");
    formValidity++;
  } else {
    city.nextElementSibling.innerHTML = "City is required";
    city.classList.add("border-danger");
  }
  const deliveryAddress = document.querySelector("#delivery-address");
  if (validateText(deliveryAddress.value)) {
    deliveryAddress.nextElementSibling.innerHTML = "";
    deliveryAddress.classList.remove("border-danger");
    formValidity++;
    //Setting the address to local storage
    localStorage.setItem("deliveryAddress", deliveryAddress.value);
  } else {
    deliveryAddress.nextElementSibling.innerHTML =
      "Delivery address is required";
    deliveryAddress.classList.add("border-danger");
  }

  //Validating email
  const email = document.querySelector("#email");
  if (validateEmail(email.value)) {
    email.nextElementSibling.innerHTML = "";
    email.classList.remove("border-danger");
    formValidity++;
  } else if (email.value.length < 1) {
    email.nextElementSibling.innerHTML = "Email address is required";
    email.classList.add("border-danger");
  } else {
    email.nextElementSibling.innerHTML = "Incorrect Email format";
    email.classList.add("border-danger");
  }

  //Checking payment Method
  const paymentMethod = document.querySelectorAll("[name='payment-method']");
  if (validatePaymentMethod(...paymentMethod)) {
    paymentMethod[2].parentElement.nextElementSibling.innerHTML = "";
    paymentMethod.forEach((method) => {
      method.parentElement.classList.remove("text-danger");
      method.parentElement.classList.add("text-warning");
    });
    formValidity++;
    if (validatePaymentMethod(...paymentMethod) == "rizz") {
      paymentMethod[2].parentElement.nextElementSibling.innerHTML =
        "You no get rizz :(";
      formValidity--;
    }
  } else {
    paymentMethod[2].parentElement.nextElementSibling.innerHTML =
      "Kindly Select a payment method";
    paymentMethod.forEach((method) => {
      method.parentElement.classList.add("text-danger");
      method.parentElement.classList.remove("text-warning");
    });
  }
  //If form is validated, open the complete order page on submission
  if (formValidity == 7) {
    window.open("/pages/complete-order.html", "_self");
  }
});

//Validation functions that return a boolean
function validateText(value) {
  return value.length > 1;
}

function validateEmail(value) {
  const regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  return regex.test(value);
}

function validatePaymentMethod(card, payOnDelivery, rizz) {
  if (!card.checked && !payOnDelivery.checked && !rizz.checked) {
    return false;
  } else {
    if (rizz.checked) {
      return "rizz";
    }
    return true;
  }
}
