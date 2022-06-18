const User = require("./user");

const Users = {
  users: {},

  async findAll() {
    return Object.values(Users.users);
  },

  async find(id) {
    return Users.users[id];
  },

  async create(newUser) {
    if (newUser instanceof User) {
      const id = Object.keys(Users.users).length + 1;

      newUser.id = id;

      Users.users[id] = {
        id: id,
        ...newUser.toJson(),
      };

      return Users.users[id];
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

      Users.users[id] = { id, ...updateUser.toJson() };

      return Users.users[id];
    } else {
      return null;
    }
  },

  async remove(id) {
    const user = await Users.find(id);

    if (!user) {
      return null;
    }

    delete Users.users[id];
  },
};

module.exports = Users;
