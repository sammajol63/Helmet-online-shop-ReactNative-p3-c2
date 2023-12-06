const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const {
  typeDefs: typeDataUsers,
  resolvers: resolversUsers,
} = require("./schema/userSchema");

const {
  typeDefs: typeDataProduct,
  resolvers: resolversProduct,
} = require("./schema/productSchema");

const server = new ApolloServer({
  typeDefs: [typeDataUsers, typeDataProduct],
  resolvers: [resolversUsers, resolversProduct],
  introspection: true,
});

startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
}).then(({ url }) => {
  console.log(`Server Ready at: ${url}`);
});
