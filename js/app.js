const buttonКequestСonsultation = document.querySelectorAll(".offer-button");
const containerКequestСonsultation = document.querySelector(".container-section__three");
const buttonSendForm = document.querySelector(".section__three-button");
const formName = document.querySelector("#name");
const formTel = document.querySelector("#phone");
const formMail = document.querySelector("#email");
const containeExperts = document.querySelector(".section__four-container__experts");

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

buttonКequestСonsultation.forEach((button) => {
  button.addEventListener("click", function () {
    containerКequestСonsultation.scrollIntoView({ behavior: "smooth" });
  });
});

buttonSendForm.addEventListener("click", function (e) {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", formName.value);
  formData.append("phone", formTel.value);
  formData.append("email", formMail.value);

  fetch("", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Form submitted successfully:", data);
    })
    .catch((error) => {
      console.error("Error submitting form:", error);
    });
});

experts.forEach((expert, index) => {
  const divElement = document.createElement("div");
  divElement.classList.add("expert-container");

  const imgElement = document.createElement("img");
  imgElement.classList.add("expert-container__img");

  imgElement.src = expert.url;

  divElement.appendChild(imgElement);

  containeExperts.appendChild(divElement);
});
