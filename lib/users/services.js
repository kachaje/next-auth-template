const User = require("./user");
const Users = require("./users");

module.exports = {
  handleGet: async (req, res) => {
    console.log(req.query);
    const id = parseInt(req.query.id, 10);

    try {
      if (id) {
        const user = await Users.find(id);

        if (user) {
          return res.status(200).send(user);
        }

        res.status(404).send("item not found");
      } else {
        const users = await Users.findAll();

        res.status(200).send(users);
      }
    } catch (e) {
      res.status(500).send(e.message);
    }
  },

  handlePost: async (req, res) => {
    try {
      const { email, token, password, firstname, lastname } = req.body;

      const user = new User(email, password, token, firstname, lastname);

      const newUser = await Users.create(user);

      res.status(201).json(newUser);
    } catch (e) {
      res.status(500).send(e.message);
    }
  },

  handlePut: async (req, res) => {
    res.status(200).json({ msg: "Welcome PUT" });
  },

  handleDelete: async (req, res) => {
    res.status(200).json({ msg: "Welcome DELETE" });
  },
};
