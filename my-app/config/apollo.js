import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://97fd-182-3-47-193.ap.ngrok.io",
  cache: new InMemoryCache(),
});

export default client;
