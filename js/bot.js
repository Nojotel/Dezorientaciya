const startBot = document.querySelector(".bot__start");
const containerBot = document.querySelector(".bot__container");
const exitBot = document.querySelector(".bot--header__exit");
const userAnswerContainer = document.querySelector(".bot--body__ansercontainer--user");
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

let backButton = null;

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

function updateAnswerContainerText() {
  const successMessage = createElementWithClassAndHTML("div", "ansercontainer--user__text", "У вас хорошая профессия. Каждая существующая профессия очень важна, потому что решает чью-то проблему и делает жизнь лучше.<br><br>Напишите, пожалуйста, какой у вас общий стаж работы?👇");
  const experienceForm = createExperienceForm();
  userAnswerContainer.innerHTML = "";
  userAnswerContainer.appendChild(successMessage);
  userAnswerContainer.appendChild(experienceForm);
}

async function submitProfessionForm() {
  const professionValue = document.getElementById("botProfession").value;

  console.log("Profession submitted:", professionValue);

  try {
    const getResponse = await fetch(`http://hackatoncom6.ddns.net:7777/chat_bot_rest/client/`, {
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

    if (postData) {
      updateAnswerContainerText();
      handleSuccess();
    } else {
      handleError();
    }
  } catch (error) {
    console.error("Error:", error);
    handleError();
  }
}

function createExperienceForm() {
  const form = document.createElement("form");
  form.classList.add("ansercontainer--user__2--form");
  form.id = "experienceForm";

  const input = document.createElement("input");
  input.type = "number";
  input.id = "experience";
  input.placeholder = "Стаж работы(лет)";
  form.appendChild(input);
  input.min = "0";

  const submitButton = createElementWithClassAndText("button", "ansercontainer--user__2--form__button", "Отправить");
  form.appendChild(submitButton);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    submitExperienceForm();
  });

  return form;
}

async function submitExperienceForm() {
  const experienceValue = document.getElementById("experience").value;

  console.log("Experience submitted:", experienceValue);

  try {
    const postResponse = await fetch("http://hackatoncom6.ddns.net:7777/chat_bot_rest/client/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: receivedId,
        int: experienceValue,
      }),
    });

    const postData = await postResponse.json();
    console.log("POST Response data:", postData);

    if (postData) {
      handleExperienceSuccess();
    } else {
      handleExperienceError();
    }
  } catch (error) {
    console.error("Error:", error);
    handleExperienceError();
  }
}

function handleExperienceSuccess() {
  console.log("Experience form submitted successfully!");

  const successMessage = createElementWithClassAndHTML("div", "ansercontainer--user__text", "Спасибо за ответ 👍<br><br>Напишите, пожалуйста, ваш доход в месяц");
  userAnswerContainer.innerHTML = "";
  userAnswerContainer.appendChild(successMessage);

  const salaryForm = createSalaryForm();
  userAnswerContainer.appendChild(salaryForm);
}

function createSalaryForm() {
  const form = document.createElement("form");
  form.classList.add("ansercontainer--user__2--form");
  form.id = "salaryForm";

  const input = document.createElement("input");
  input.type = "number";
  input.id = "salary";
  input.placeholder = "Введите цифрами";
  input.min = "0";
  input.step = "1000";
  form.appendChild(input);

  const submitButton = createElementWithClassAndText("button", "ansercontainer--user__2--form__button", "Отправить");
  form.appendChild(submitButton);

  const additionalButton = createElementWithClassAndText("button", "ansercontainer--user__2--form__button", "Я пока не зарабатываю");
  additionalButton.id = "salary__butt";
  form.appendChild(additionalButton);

  let salaryButtonClicked = false;

  additionalButton.addEventListener("click", function () {
    userAnswerContainer.innerHTML = "Это не повод грустить, вы можете получить нашу карьерную поддержку и в скором времени вы обязательно начнете получать доход! Но раз я обещал подарки, то для вас у меня целых два подарка!<br> Выбрать подарок";

    const form = document.getElementById("salaryForm");
    if (form) {
      form.remove();
    }

    const giftButton1 = createElementWithClassAndText("button", "bot__giftButton", "Скидка на 1 консультацию 1000 руб.");
    const giftButton2 = createElementWithClassAndText("button", "bot__giftButton", "Гайд “Как получить работу своей мечты”");

    userAnswerContainer.appendChild(giftButton1);
    userAnswerContainer.appendChild(giftButton2);

    giftButton1.addEventListener("click", function () {
      userAnswerContainer.innerHTML = "Чтобы получить подарки укажите ваше ФИО, электронную почту, телефон и подарки придут к вам на email.";

      const form = createGiftForm();
      userAnswerContainer.appendChild(form);
    });

    giftButton2.addEventListener("click", function () {
      userAnswerContainer.innerHTML = "Чтобы получить подарки укажите ваше ФИО, электронную почту, телефон и подарки придут к вам на email.";

      const form = createGiftForm();
      userAnswerContainer.appendChild(form);
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    submitSalaryForm();
  });

  return form;
}

async function submitSalaryForm() {
  const salaryValue = document.getElementById("salary").value;

  console.log("Salary submitted:", salaryValue);

  try {
    const postResponse = await fetch("http://hackatoncom6.ddns.net:7777/chat_bot_rest/client/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: receivedId,
        salary: salaryValue,
      }),
    });

    const postData = await postResponse.json();
    console.log("POST Response data:", postData);

    if (postData) {
      handleSalarySuccess(); // Call the correct function here
    } else {
      handleSalaryError();
    }
  } catch (error) {
    console.error("Error:", error);
    handleSalaryError();
  }
}

function handleSalarySuccess() {
  console.log("Salary form submitted successfully!");

  const successMessage = createElementWithClassAndHTML("div", "ansercontainer--user__text", "Благодарю! Сколько часов в неделю Вы работаете?");
  userAnswerContainer.innerHTML = "";
  userAnswerContainer.appendChild(successMessage);

  const form = document.getElementById("salaryForm");
  if (form) {
    form.reset();
  }

  const input = document.createElement("input");
  input.type = "number";
  input.id = "hours";
  input.placeholder = "Введите цифрами";
  input.min = "0";
  input.step = "1";
  userAnswerContainer.appendChild(input);

  const submitButton = createElementWithClassAndText("button", "ansercontainer--user__2--form__button", "Отправить");
  submitButton.addEventListener("click", function () {
    submitHoursForm(input.value);
  });
  userAnswerContainer.appendChild(submitButton);
}

/*async function submitHoursForm() {
  const hoursValue = document.getElementById("hours").value;

  console.log("Hours submitted:", hoursValue);

  try {
    const postResponse = await fetch("http://hackatoncom6.ddns.net:7777/chat_bot_rest/client/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: receivedId,
        hours: hoursValue,
      }),
    });

    const postData = await postResponse.json();
    console.log("POST Response data:", postData);

    if (postData) {
      console.log("Hours form submitted successfully!");

      const successMessage = createElementWithClassAndHTML("div", "ansercontainer--user__text", "Вот мы и на финишной прямой. Напишите, пожалуйста, ваш возраст.");
      userAnswerContainer.innerHTML = "";
      userAnswerContainer.appendChild(successMessage);

      const oldInput = document.getElementById("hours");
      if (oldInput) {
        oldInput.remove();
      }

      const ageInput = document.createElement("input");
      ageInput.type = "number";
      ageInput.id = "age";
      ageInput.placeholder = "Введите цифрами";
      ageInput.min = "0";
      ageInput.step = "1";
      userAnswerContainer.appendChild(ageInput);

      const submitButton = createElementWithClassAndText("button", "ansercontainer--user__2--form__button", "Отправить");
      submitButton.addEventListener("click", submitAgeForm);
      userAnswerContainer.appendChild(submitButton);
    } else {
      console.error("Error submitting hours form");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}*/
async function submitHoursForm(hoursValue) {
  console.log("Hours submitted:", hoursValue);

  try {
    const postResponse = await fetch("http://hackatoncom6.ddns.net:7777/chat_bot_rest/client/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: receivedId,
        hours: hoursValue,
      }),
    });

    const postData = await postResponse.json();
    console.log("POST Response data:", postData);

    if (postData) {
      console.log("Hours form submitted successfully!");

      //const successMessage = createElementWithClassAndHTML("div", "ansercontainer--user__text", `Отлично! 🙏<br><br>Мы посчитали стоимость часа Вашей работы: ${earnings} руб/час.<br>Мне было приятно с вами общаться!<br><br>Ваш подарок уже на почте!<br><br>Наши карьерные консультанты всегда рады вам помочь <a href='mailto:support@dezorientaciya.ru'>support@dezorientaciya.ru</a><br><br>До скорых встреч!`);
      const successMessage = createElementWithClassAndHTML("div", "ansercontainer--user__text", `Чтобы получить подарки 🎁 укажите ваше ФИО и контактные данные, а мы отправим их  на эл. почту👇`);
      userAnswerContainer.innerHTML = "";
      userAnswerContainer.appendChild(successMessage);

      // Display the form with name, phone, and email
      const form = createGiftForm();
      userAnswerContainer.appendChild(form);
    } else {
      console.error("Error submitting hours form");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function handleSalaryError() {
  console.error("Error submitting salary form");
}

function createGiftForm() {
  const form = document.createElement("form");
  form.classList.add("gift__form");

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.placeholder = "ФИО";
  nameInput.classList.add("name__bot");

  const telInput = document.createElement("input");
  telInput.type = "tel";
  telInput.placeholder = "Телефон";
  telInput.classList.add("tel__bot");

  const emailInput = document.createElement("input");
  emailInput.type = "email";
  emailInput.placeholder = "Электронная почта";
  emailInput.classList.add("email__bot");

  const submitButton = createElementWithClassAndText("button", "gift__form__button", "Отправить");
  form.appendChild(nameInput);
  form.appendChild(telInput);
  form.appendChild(emailInput);
  form.appendChild(submitButton);

  submitButton.addEventListener("click", async function (e) {
    e.preventDefault();

    const formData = {
      name: nameInput.value,
      tel: telInput.value,
      email: emailInput.value,
    };

    try {
      const response = await fetch("http://hackatoncom6.ddns.net:7777/chat_bot_rest/client/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        userAnswerContainer.innerHTML = "Мне было приятно с вами общаться!<br><br>Ваш подарок уже на почте!<br><br>Наши карьерные консультанты всегда рады вам помочь <a href='mailto:support@dezorientaciya.ru'>support@dezorientaciya.ru</a><br><br>До скорых встреч!";

        form.style.display = "none";
      } else {
        console.error("Form submission failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  });

  return form;
}

function handleExperienceError() {
  console.error("Error submitting experience form");
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
const giftButton = document.querySelector(".section__five-button");
giftButton.addEventListener("click", openBot);
