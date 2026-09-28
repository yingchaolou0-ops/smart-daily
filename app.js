const apiTestButton = document.getElementById("apiTestButton");
const apiResult = document.getElementById("apiResult");

apiTestButton.addEventListener("click", async function () {
  apiResult.textContent = "正在连接 API...";

  try {
    const response = await fetch(
      "https://smart-daily-api.942040323.workers.dev/"
    );

    const data = await response.json();

    apiResult.textContent = data.message;
  } catch (error) {
    apiResult.textContent = "API 连接失败";
  }
});
const dailyContent = document.getElementById("dailyContent");
const submitDailyButton = document.getElementById("submitDailyButton");
const submitResult = document.getElementById("submitResult");

submitDailyButton.addEventListener("click", async function () {

  const content = dailyContent.value;

  submitResult.textContent = "正在提交...";

  try {

    const response = await fetch(
      "https://smart-daily-api.942040323.workers.dev/",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          content: content
        })
      }
    );

    const data = await response.json();

    submitResult.textContent =
      data.message + "：" + data.content;

  } catch (error) {

    submitResult.textContent = "提交失败";

  }

});
