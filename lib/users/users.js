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

  async find(email) {
    const users = fs.existsSync(usersDataFile)
      ? JSON.parse(fs.readFileSync(usersDataFile, "utf8"))
      : {};
    return users[email];
  },

  async create(newUser) {
    if (newUser instanceof User) {
      const users = fs.existsSync(usersDataFile)
        ? JSON.parse(fs.readFileSync(usersDataFile, "utf8"))
        : {};
      const id = new Date().getTime();

      newUser.id = id;

      users[newUser.email] = {
        id: id,
        ...newUser.toJson(),
      };

      fs.writeFileSync(usersDataFile, JSON.stringify(users, null, 2));

      return users[id];
    } else {
      return null;
    }
  },

  async update(email, updateUser) {
    if (updateUser instanceof User) {
      const user = await Users.find(email);

      if (!user) {
        return null;
      }

      const users = fs.existsSync(usersDataFile)
        ? JSON.parse(fs.readFileSync(usersDataFile, "utf8"))
        : {};

      users[email] = { email, ...updateUser.toJson() };

      fs.writeFileSync(usersDataFile, JSON.stringify(users, null, 2));

      return users[email];
    } else {
      return null;
    }
  },

  async remove(email) {
    const user = await Users.find(email);

    if (!user) {
      return null;
    }

    const users = fs.existsSync(usersDataFile)
      ? JSON.parse(fs.readFileSync(usersDataFile, "utf8"))
      : {};

    delete users[email];

    fs.writeFileSync(usersDataFile, JSON.stringify(users, null, 2));
  },
};

module.exports = Users;
