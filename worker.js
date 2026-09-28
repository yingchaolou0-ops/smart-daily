export default {
  async fetch(request) {

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    // 浏览器跨域预检查
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders
      });
    }

    // 测试 API
    if (request.method === "GET") {
      return new Response(
        JSON.stringify({
          success: true,
          message: "Worker API 已连接成功"
        }),
        {
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders
          }
        }
      );
    }

    // 接收日报
    if (request.method === "POST") {

      const data = await request.json();

      return new Response(
        JSON.stringify({
          success: true,
          message: "日报已接收",
          received: data
        }),
        {
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders
          }
        }
      );
    }

    return new Response("Method Not Allowed", {
      status: 405,
      headers: corsHeaders
    });
  }
};
