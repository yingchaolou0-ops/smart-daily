export default {
  async fetch(request, env) {

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders
      });
    }

    // 读取日报
    if (request.method === "GET") {

      const result = await env.DB
        .prepare(
          "SELECT id, content, created_at FROM reports ORDER BY id DESC"
        )
        .all();

      return new Response(
        JSON.stringify({
          success: true,
          reports: result.results
        }),
        {
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders
          }
        }
      );
    }

    // 保存日报
    if (request.method === "POST") {

      const data = await request.json();

      const content = data.content?.trim();

      if (!content) {
        return new Response(
          JSON.stringify({
            success: false,
            message: "日报内容不能为空"
          }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders
            }
          }
        );
      }

      const result = await env.DB
        .prepare(
          "INSERT INTO reports (content) VALUES (?)"
        )
        .bind(content)
        .run();

      return new Response(
        JSON.stringify({
          success: true,
          message: "日报保存成功",
          id: result.meta.last_row_id,
          content: content
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
