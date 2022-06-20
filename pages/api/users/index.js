const { handleGet, handlePost } = require("../../../lib/users/services");

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      handleGet(req, res);
      break;
    case "POST":
      handlePost(req, res);
      break;
  }
}
