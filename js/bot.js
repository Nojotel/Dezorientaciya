const startBot = document.querySelector(".bot__start");
const containerBot = document.querySelector(".bot__container");
const exitBot = document.querySelector(".bot--header__exit");
const userAnswerContainer = document.querySelector(".bot--body__ansercontainer--user");

let userAnswerDiv = null;
let formAdded = false;

function openBot() {
  startBot.classList.add("hidden");
  containerBot.classList.remove("hidden");
  console.log("open");
}

function closeBot() {
  startBot.classList.remove("hidden");
  containerBot.classList.add("hidden");
  console.log("exit");
}

function createElementWithClassAndText(elementType, className, text) {
  const element = document.createElement(elementType);
  element.classList.add(className);
  element.textContent = text;
  return element;
}

function elementExists(element) {
  return element !== null && typeof element !== "undefined";
}

startBot.addEventListener("click", openBot);
exitBot.addEventListener("click", closeBot);

function toggleButtons(clickedButton) {
  const userContainer = document.querySelector(".bot__container--user");

  if (clickedButton.classList.contains("bot--body__button") && (clickedButton.textContent.trim() === "Меня интересует профориентация 🤔" || clickedButton.textContent.trim() === "Заявка на консультацию ✍️")) {
    if (!elementExists(userAnswerDiv)) {
      userAnswerDiv = createElementWithClassAndText("div", "ansercontainer--user__text", "Укажите как к вам обращаться, электронную почту или телефон");
      userAnswerContainer.appendChild(userAnswerDiv);
      userAnswerContainer.classList.remove("none");
    }

    if (!formAdded) {
      const form = createForm();
      userAnswerContainer.appendChild(form);
      formAdded = true;
    }

    const buttons = document.querySelectorAll(".bot--body__button");

    buttons.forEach((button) => {
      button.style.display = button !== clickedButton ? "none" : "";
      button.style.backgroundColor = button === clickedButton ? "#E2E5DA" : "";
    });

    userContainer.classList.remove("none");
  }
}
function createElementWithClassAndHTML(elementType, className, html) {
  const element = document.createElement(elementType);
  element.classList.add(className);
  element.innerHTML = html;
  return element;
}
function createForm() {
  const form = document.createElement("form");
  form.classList.add("ansercontainer--user__1--form");
  form.action = "http://hackatoncom6.ddns.net:7777/chat_bot_rest/client/";
  form.method = "POST";

  const inputs = [
    { type: "text", id: "namebot", name: "name", placeholder: "Имя и Фамилия", required: true },
    { type: "tel", id: "phonebot", name: "phone", placeholder: "Телефон" },
    { type: "email", id: "emailbot", name: "email", placeholder: "Электронная почта" },
  ];

  inputs.forEach((inputData) => {
    const input = document.createElement("input");
    Object.entries(inputData).forEach(([key, value]) => (input[key] = value));
    form.appendChild(input);
  });

  const submitButton = createElementWithClassAndText("button", "ansercontainer--user__1--form__button", "Отправить заявку");
  form.appendChild(submitButton);

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const nameValue = form.querySelector("#namebot").value;
    const phoneValue = form.querySelector("#phonebot").value;
    const emailValue = form.querySelector("#emailbot").value;

    // Check if name is provided and either phone or email is provided
    if (nameValue && nameValue.trim() !== "" && (phoneValue || emailValue)) {
      const formData = {
        name: nameValue,
        phone: phoneValue,
        email: emailValue,
      };

      try {
        const response = await fetch(form.action, {
          method: form.method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const responseText = await response.text();
        console.log("Response content:", responseText);

        form.querySelector("#namebot").value = "";
        form.querySelector("#phonebot").value = "";
        form.querySelector("#emailbot").value = "";

        userAnswerContainer.innerHTML = "";

        const successMessage = createElementWithClassAndHTML("div", "ansercontainer--user__text", "Ваша заявка получена! Спасибо за доверие!<br><br>В ближайшее время наши эксперты вам позвонят!");
        userAnswerContainer.appendChild(successMessage);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      // Provide user feedback if name and at least one of phone or email is required
      alert("Введите имя и хотя бы телефон или электронную почту.");
    }
  });

  return form;
}
