import { gql, ApolloServer } from "apollo-server-micro";
import fs from "fs";

const typeDefs = gql`
  ${fs.readFileSync("./schema.graphql", "utf8")}
`;

const resolvers = {
  Query: {},
  Mutation: {},
};

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
