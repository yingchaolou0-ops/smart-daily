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
