import { gql, ApolloServer } from "apollo-server-micro";
import fs from "fs";
import resolvers from "../../lib/users/resolvers";

const typeDefs = gql`
  ${fs.readFileSync("./schema.graphql", "utf8")}
`;

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = apolloServer.start();

export default async function handler(req, res) {
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
