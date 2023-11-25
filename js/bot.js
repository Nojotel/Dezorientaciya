const startBot = document.querySelector(".bot__start");
const containerBot = document.querySelector(".bot__container");
const exitBot = document.querySelector(".bot--header__exit");

startBot.addEventListener("click", function () {
  startBot.classList.add("hidden");
  containerBot.classList.remove("hidden");
  console.log("open");
});

exitBot.addEventListener("click", function () {
  startBot.classList.remove("hidden");
  containerBot.classList.add("hidden");
  console.log("exit");
});
