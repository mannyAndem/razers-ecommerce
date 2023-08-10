// sending email function
function sendEmail(firstName, lastName, msgBody) {
  const receiverEmail = "emmanuelandem360@gmail.com";
  window.open(
    `mailto:${receiverEmail}?subject=Customer Request: ${firstName} ${lastName}&body=${msgBody}`
  );
}

//Adding an event listener to the submit btn
const submitBtn = document.querySelector("#submit-btn");

submitBtn.addEventListener("click", () => {
  const subject = document.querySelector("#message").value;
  const firstName = document.querySelector("#first-name").value;
  const lastName = document.querySelector("#last-name").value;
  sendEmail(firstName, lastName, subject);
});
