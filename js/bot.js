const startBot = document.querySelector(".bot__start");
const containerBot = document.querySelector(".bot__container");
const exitBot = document.querySelector(".bot--header__exit");
const userAnswerContainer = document.querySelector(".bot--body__ansercontainer--user");
let backButton = null;
let userAnswerDiv = null;
let formAdded = false;
let careerSupportClicked = false;

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
  const buttons = document.querySelectorAll(".bot--body__button");

  if (clickedButton.classList.contains("gift-support")) {
    userAnswerContainer.innerHTML = "Отлично! 👍 Я тоже люблю подарки 😍<br><br>Но у меня есть всего 5 вопросов, ответив на которые Вы получите замечательный подарок!";

    const button1 = createElementWithClassAndText("button", "ansercontainer--user__2--form__button", "Я люблю подарки, задавай вопросы!");
    const button2 = createElementWithClassAndText("button", "ansercontainer--user__2--form__button", "🔙  Вернуться назад");

    userAnswerContainer.appendChild(button1);
    userAnswerContainer.appendChild(button2);

    button1.addEventListener("click", function () {
      userAnswerContainer.innerHTML = "";

      const careerSupportBtn = document.getElementById("careerSupportBtn");
      toggleButtons(careerSupportBtn);
    });

    button2.addEventListener("click", function () {
      backButton.click();
    });

    userAnswerContainer.classList.remove("none");
    userContainer.classList.remove("none");

    buttons.forEach((button) => {
      if (button === clickedButton) {
        button.style.backgroundColor = "#E2E5DA";
      } else {
        button.style.display = "none";
      }
    });
  } else if (clickedButton.id === "careerSupportBtn" && !careerSupportClicked) {
    careerSupportClicked = true;

    const userAnswerDiv = createElementWithClassAndText("div", "ansercontainer--user__text", "Напишите, пожалуйста, вашу профессию?👇");
    userAnswerContainer.appendChild(userAnswerDiv);

    const form = createProfessionForm();
    userAnswerContainer.appendChild(form);

    userAnswerContainer.classList.remove("none");

    buttons.forEach((button) => {
      button.style.display = button !== clickedButton ? "none" : "";
      button.style.backgroundColor = button === clickedButton ? "#E2E5DA" : "";
    });

    userContainer.classList.remove("none");
  } else {
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

      buttons.forEach((button) => {
        button.style.display = button !== clickedButton ? "none" : "";
        button.style.backgroundColor = button === clickedButton ? "#E2E5DA" : "";
      });

      userContainer.classList.remove("none");
    }
  }
}

function createProfessionForm() {
  const form = document.createElement("form");
  form.classList.add("ansercontainer--user__2--form");
  form.id = "professionForm";

  const input = document.createElement("input");
  input.type = "text";
  input.id = "botProfession";
  input.placeholder = "Название профессии";
  form.appendChild(input);

  const submitButton = createElementWithClassAndText("button", "ansercontainer--user__2--form__button", "Отправить");
  form.appendChild(submitButton);

  backButton = createElementWithClassAndText("button", "ansercontainer--user__2--form__button", "🔙  Вернуться назад");
  form.appendChild(backButton);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    submitProfessionForm();
  });

  backButton.addEventListener("click", function () {
    userAnswerContainer.innerHTML = "";
    careerSupportClicked = false;
    formAdded = false;
    userAnswerContainer.classList.add("none");
    const userContainer = document.querySelector(".bot__container--user");
    userContainer.classList.add("none");
    const userContainerImg = document.querySelector(".bot__container--user .bot--header__img");
    if (userContainerImg) {
      userContainerImg.style.display = "block";
    }
    const buttons = document.querySelectorAll(".bot--body__button");
    buttons.forEach((button) => {
      button.style.display = "";
      button.style.backgroundColor = "";
    });
  });

  return form;
}

let receivedId = null;

async function submitProfessionForm() {
  const professionValue = document.getElementById("botProfession").value;

  console.log("Profession submitted:", professionValue);

  try {
    const getResponse = await fetch(`http://hackatoncom6.ddns.net:7777/chat_bot_rest/client/?profession=${professionValue}`, {
      method: "GET",
    });

    const getData = await getResponse.json();
    console.log("GET Response data:", getData);

    receivedId = getData;
    console.log("Received id:", receivedId);

    const postResponse = await fetch("http://hackatoncom6.ddns.net:7777/chat_bot_rest/client/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        profession: professionValue,
        id: receivedId,
      }),
    });

    const postData = await postResponse.json();
    console.log("POST Response data:", postData);

    if (postData.error) {
      handleError();
    } else {
      handleSuccess();
    }
  } catch (error) {
    console.error("Error:", error);
    handleError();
  } finally {
    document.getElementById("botProfession").value = "";
  }
}

function handleError() {
  const errorText = createElementWithClassAndHTML("div", "ansercontainer--user__text", "Сервер не отвечает. Пожалуйста, попробуйте повторить позже");
  userAnswerContainer.innerHTML = "";
  userAnswerContainer.appendChild(errorText);

  const formContainer = document.querySelector(".ansercontainer--user__2");
  if (formContainer) {
    formContainer.classList.add("none");
  }
}

function handleSuccess() {
  console.log("Form submitted successfully!");
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
      if (!nameValue || nameValue.trim() === "") {
        setPlaceholderError(form.querySelector("#namebot"));
      }
      if (!phoneValue) {
        setPlaceholderError(form.querySelector("#phonebot"));
      }
      if (!emailValue) {
        setPlaceholderError(form.querySelector("#emailbot"));
      }
    }
  });

  return form;
}
