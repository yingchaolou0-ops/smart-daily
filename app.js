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
const localAiTestButton = document.getElementById("localAiTestButton");
const localAiResult = document.getElementById("localAiResult");

localAiTestButton.addEventListener("click", async function () {
  localAiResult.textContent = "正在调用本地 Qwen...";

  try {
    const response = await fetch(
      "http://localhost:11434/api/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "qwen3:4b",
          messages: [
            {
              role: "system",
              content: "你是智慧园区日报助手。"
},
{
 role: "user",
 content: dailyContent.value
}
 ],
  think:false,
  stream: false
})
}
);
    const data = await response.json();

    localAiResult.textContent =
      data.message?.content || "已连接，但没有返回正文";

  } catch (error) {
    localAiResult.textContent =
      "本地 Qwen 连接失败：" + error.message;
  }

});
