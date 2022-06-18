const User = require("../../../lib/users/user");
const Users = require("../../../lib/users/users");

const handleGet = async (req, res) => {
  console.log(req.query);
  const id = parseInt(req.query.id, 10);

  try {
    const user = await Users.find(id);

    if (user) {
      return res.status(200).send(user.toJson());
    }

    res.status(404).send("item not found");
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const handlePut = async (req, res) => {
  res.status(200).json({ msg: "Welcome PUT" });
};

const handleDelete = async (req, res) => {
  res.status(200).json({ msg: "Welcome DELETE" });
};

export default async function handler(req, res) {
  console.log(req.method);
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
