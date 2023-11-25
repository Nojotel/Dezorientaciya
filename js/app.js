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

    // Clear form fields
    formName.value = "";
    formTel.value = "";
    formMail.value = "";
  } catch (error) {
    console.error("Error submitting form:", error);
  }
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
