const buttonКequestСonsultation = document.querySelectorAll(".offer-button");
const containerКequestСonsultation = document.querySelector(".container-section__three");
const buttonSendForm = document.querySelector(".section__three-button");
const formName = document.querySelector("#name");
const formTel = document.querySelector("#phone");
const formMail = document.querySelector("#email");
const containeExperts = document.querySelector(".section__four-container__experts");
const buttonExp = document.querySelector(".offer-img__exp");
const toExp = document.querySelector(".section__four");
const buttonGift = document.querySelector(".offer-img__button-gift");
const toGift = document.querySelector(".section__five");
const buttonCom = document.querySelector(".offer-img__comment");
const toCom = document.querySelector(".section__six");

let experts = [
  {
    url: "./img/Experts1.png",
  },
  {
    url: "./img/Experts2.png",
  },
  {
    url: "./img/Experts3.png",
  },
  {
    url: "./img/Experts4.png",
  },
  {
    url: "./img/Experts5.png",
  },
  {
    url: "./img/Experts6.png",
  },
  {
    url: "./img/Experts7.png",
  },
  {
    url: "./img/Experts8.png",
  },
];

experts.forEach((expert, index) => {
  const divElement = document.createElement("div");
  divElement.classList.add("expert-container");

  const imgElement = document.createElement("img");
  imgElement.classList.add("expert-container__img");

  imgElement.src = expert.url;

  divElement.appendChild(imgElement);

  containeExperts.appendChild(divElement);
});

buttonКequestСonsultation.forEach((button) => {
  button.addEventListener("click", function () {
    containerКequestСonsultation.scrollIntoView({ behavior: "smooth" });
  });
});

buttonExp.addEventListener("click", function () {
  toExp.scrollIntoView({ behavior: "smooth" });
});
buttonGift.addEventListener("click", function () {
  toGift.scrollIntoView({ behavior: "smooth" });
});
buttonCom.addEventListener("click", function () {
  toCom.scrollIntoView({ behavior: "smooth" });
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
    full_name: formName.value,
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
