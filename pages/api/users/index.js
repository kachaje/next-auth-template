const User = require("../../../lib/users/user");
const Users = require("../../../lib/users/users");

const handleGet = async (req, res) => {
  try {
    console.log(req.params);

    const users = await Users.findAll();

    res.status(200).send(users);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const handlePost = async (req, res) => {
  try {
    const { email, token, password, firstname, lastname } = req.body;

    console.log(email);

    const user = new User(email, password, token, firstname, lastname);

    const newUser = await Users.create(user);

    res.status(201).json(newUser);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

export default async function handler(req, res) {
  console.log(req.method);
  switch (req.method) {
    case "GET":
      handleGet(req, res);
      break;
    case "POST":
      handlePost(req, res);
      break;
  }
}
