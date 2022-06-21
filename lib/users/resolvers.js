const User = require("./user");
const Users = require("./users");

module.exports = {
  Query: {
    getUserByEmail: (_, userData) => {
      return new Promise(async (resolve, reject) => {
        try {
          const { email } = userData;

          if (email) {
            const user = await Users.find(email);

            if (user) {
              return resolve(user);
            }
          }
          resolve();
        } catch (e) {
          console.log(e);
          reject(e);
        }
      });
    },

    getUsers: (_) => {
      return new Promise(async (resolve, reject) => {
        try {
          const users = await Users.findAll();

          resolve(users);
        } catch (e) {
          console.log(e);
          reject(e);
        }
      });
    },
  },
  Mutation: {
    createUser: (_, userData) => {
      return new Promise(async (resolve, reject) => {
        try {
          const { email, token, password, firstname, lastname } =
            userData.userData;

          const user = new User(email, password, token, firstname, lastname);

          const newUser = await Users.create(user);

          resolve(newUser);
        } catch (e) {
          console.log(e);
          reject(e);
        }
      });
    },

    updateUser: (_, userData) => {
      return new Promise(async (resolve, reject) => {
        try {
          let { email, token, password, firstname, lastname } =
            userData.userData;
          const existingUser = await Users.find(email);

          if (existingUser) {
            const user = new User(
              [undefined, null, ""].indexOf(email) < 0
                ? email
                : existingUser.email,
              [undefined, null, ""].indexOf(password) < 0
                ? password
                : existingUser.password,
              [undefined, null, ""].indexOf(token) < 0
                ? token
                : existingUser.token,
              [undefined, null, ""].indexOf(firstname) < 0
                ? firstname
                : existingUser.firstname,
              [undefined, null, ""].indexOf(lastname) < 0
                ? lastname
                : existingUser.lastname,
              existingUser.id
            );

            const updatedUser = await Users.update(email, user);

            resolve(updatedUser);
          } else {
            const user = new User(email, password, token, firstname, lastname);

            const newUser = await Users.create(user);

            resolve(newUser);
          }
        } catch (e) {
          console.log(e);
          reject(e);
        }
      });
    },

    removeUser: (_, userData) => {
      return new Promise(async (resolve, reject) => {
        try {
          const { email } = userData;

          if (email) {
            const user = await Users.find(email);

            if (user) {
              await Users.remove(email);
            }
          }
          resolve();
        } catch (e) {
          console.log(e);
          reject(e);
        }
      });
    },
  },
};
