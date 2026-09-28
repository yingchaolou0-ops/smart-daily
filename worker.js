export default {
  async fetch(request) {
    return Response.json({
      success: true,
      message: "Worker API 已连接成功"
    });
  }
};
