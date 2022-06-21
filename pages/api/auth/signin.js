import { withIronSessionApiRoute } from "iron-session/next";
import { GraphQLClient, gql } from "graphql-request";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const cookie = {
  cookieName: process.env.COOKIE_NAME,
  password: process.env.COOKIE_PASSWORD,
  cookieOptions: { secure: process.env.NODE_ENV === "production" },
};
const { GRAPHQL_URL, JWT_SECRET } = process.env;
const client = new GraphQLClient(GRAPHQL_URL, {
  headers: {},
});
const getUserByEmailQuery = gql`
  query getUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      id
      email
      password
    }
  }
`;
const updateUserMutation = gql`
  mutation updateUser($userData: UserUpdateInput!) {
    updateUser(userData: $userData) {
      token
      email
    }
  }
`;
export default withIronSessionApiRoute(async function signIn(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).end();
    return;
  }
  const getUserResponse = await client.request(getUserByEmailQuery, { email });

  const { getUserByEmail } = getUserResponse;
  if (!getUserByEmail) {
    res.status(400).end();
    return;
  }
  const { password: hashedPassword } = getUserByEmail;
  const isMatch = await bcrypt.compare(password, hashedPassword);
  if (!isMatch) {
    res.status(400).end();
    return;
  }
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: 36005 });
  const updateUserResponse = await client.request(updateUserMutation, {
    userData: { email, token },
  });
  const { updateUser } = updateUserResponse;
  if (!updateUser?.token) {
    res.status(500).end();
    return;
  }
  req.session.user = {
    token: updateUser.token,
  };
  await req.session.save();

  res.status(200).json({ token: updateUser.token });
}, cookie);
