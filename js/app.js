const buttonКequestСonsultation = document.querySelectorAll(".offer-button");
const containerКequestСonsultation = document.querySelector(".container-section__three");
const buttonSendForm = document.querySelector(".section__three-button");
const formName = document.querySelector("#name");
const formTel = document.querySelector("#phone");
const formMail = document.querySelector("#email");
const containeExperts = document.querySelector(".section__four-container__experts");

const experts = [{ url: "./img/Experts1.png" }, { url: "./img/Experts2.png" }, { url: "./img/Experts3.png" }, { url: "./img/Experts4.png" }, { url: "./img/Experts5.png" }, { url: "./img/Experts6.png" }, { url: "./img/Experts7.png" }, { url: "./img/Experts8.png" }];

buttonКequestСonsultation.forEach((button) => {
  button.addEventListener("click", () => {
    containerКequestСonsultation.scrollIntoView({ behavior: "smooth" });
  });
});

buttonSendForm.addEventListener("click", async function (e) {
  e.preventDefault();

  if (!formName.value) {
    setPlaceholderError(formName);
  }

  if (!formTel.value) {
    setPlaceholderError(formTel);
  }

  if (!formMail.value) {
    setPlaceholderError(formMail);
  }

  if (!formName.value || !formTel.value || !formMail.value) {
    return;
  }

  const formData = {
    name: formName.value,
    phone: formTel.value,
    email: formMail.value,
  };

  try {
    const response = await fetch("http://hackatoncom6.ddns.net:7777/chat_bot_rest/client/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const responseText = await response.text();
    console.log("Response content:", responseText);

    formName.value = "";
    formTel.value = "";
    formMail.value = "";
  } catch (error) {
    console.error("Error submitting form:", error);
  }
});

function setPlaceholderError(inputElement) {
  inputElement.classList.add("input-error");
  setTimeout(() => {
    inputElement.classList.remove("input-error");
  }, 3000);
}
