const fs = require("fs");
const User = require("./user");
const usersDataFile = "./data/users.json";

const Users = {
  async findAll() {
    const users = fs.existsSync(usersDataFile)
      ? JSON.parse(fs.readFileSync(usersDataFile, "utf8"))
      : {};
    return Object.values(users);
  },

  async find(id) {
    const users = fs.existsSync(usersDataFile)
      ? JSON.parse(fs.readFileSync(usersDataFile, "utf8"))
      : {};
    return users[id];
  },

  async create(newUser) {
    if (newUser instanceof User) {
      const users = fs.existsSync(usersDataFile)
        ? JSON.parse(fs.readFileSync(usersDataFile, "utf8"))
        : {};
      const id = new Date().getTime();

      newUser.id = id;

      users[id] = {
        id: id,
        ...newUser.toJson(),
      };

      fs.writeFileSync(usersDataFile, JSON.stringify(users, null, 2));

      return users[id];
    } else {
      return null;
    }
  },

  async update(id, updateUser) {
    if (updateUser instanceof User) {
      const user = await Users.find(id);

      if (!user) {
        return null;
      }

      const users = fs.existsSync(usersDataFile)
        ? JSON.parse(fs.readFileSync(usersDataFile, "utf8"))
        : {};

      users[id] = { id, ...updateUser.toJson() };

      fs.writeFileSync(usersDataFile, JSON.stringify(users, null, 2));

      return users[id];
    } else {
      return null;
    }
  },

  async remove(id) {
    const user = await Users.find(id);

    if (!user) {
      return null;
    }

    const users = fs.existsSync(usersDataFile)
      ? JSON.parse(fs.readFileSync(usersDataFile, "utf8"))
      : {};

    delete users[id];

    fs.writeFileSync(usersDataFile, JSON.stringify(users, null, 2));
  },
};

module.exports = Users;
