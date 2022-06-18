class User {
  constructor(email, password, token, firstname, lastname, id) {
    this.email = email;
    this.password = password;
    this.token = token;
    this.firstname = firstname;
    this.lastname = lastname;
    this.id = id;
  }

  toJson() {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
      token: this.token,
      firstname: this.firstname,
      lastname: this.lastname,
    };
  }
}

module.exports = User;
