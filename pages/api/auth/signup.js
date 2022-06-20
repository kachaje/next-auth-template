import { GraphQLClient, gql } from "graphql-request";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const { GRAPHQL_URL, JWT_SECRET, JWT_EXPIRES_IN } = process.env;
const client = new GraphQLClient(GRAPHQL_URL, {
  headers: {},
});

const CreateUserMutation = gql`
  mutation CreateUser($userData: UserCreateInput!) {
    createUser(userData: $userData) {
      id
      email
      token
    }
  }
`;

export default async function handler(req, res) {
  const { email, password, firstname, lastname } = req.body;
  if (!email || !password || !firstname || !lastname) {
    res.status(400).end();
  }
  const token = jwt.sign(
    {
      email,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
  const hashedPassword = await bcrypt.hash(password, 8);
  const userData = {
    email,
    password: hashedPassword,
    firstname,
    lastname,
    token,
  };
  const response = await client.request(CreateUserMutation, { userData });
  if (!response?.CreateUser?.id) {
    res.status(500);
  }
  res.status(200).json({ token });
}
