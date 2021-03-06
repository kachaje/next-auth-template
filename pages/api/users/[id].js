const {
  handleGet,
  handlePut,
  handleDelete,
} = require("../../../lib/users/services");

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      handleGet(req, res);
      break;
    case "PUT":
      handlePut(req, res);
      break;
    case "DELETE":
      handleDelete(req, res);
      break;
  }
}
