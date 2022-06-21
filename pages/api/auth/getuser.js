import { GraphQLClient, gql } from "graphql-request";
import jwt from "jsonwebtoken";

const { GRAPHQL_URL, JWT_SECRET } = process.env;
const client = new GraphQLClient(GRAPHQL_URL, {
  headers: {},
});

const getUserByEmailQuery = gql`
  query getUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      email
      firstname
      lastname
    }
  }
`;
export default async function GetAuthenticatedUser(req, res) {
  const defaultReturnObject = { authenticated: false, user: null };
  try {
    const token = String(req?.headers?.authorization?.replace("Bearer ", ""));
    const decoded = jwt.verify(token, JWT_SECRET);
    const getUserResponse = await client.request(getUserByEmailQuery, {
      email: decoded.email,
    });
    const { getUserByEmail } = getUserResponse;
    if (!getUserByEmail) {
      res.status(400).json(defaultReturnObject);
      return;
    }
    res.status(200).json({ authenticated: true, user: getUserByEmail });
  } catch (err) {
    console.log("GetAuthenticatedUser, Something Went Wrong", err);
    res.status(400).json(defaultReturnObject);
  }
}
