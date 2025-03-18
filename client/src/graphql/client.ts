import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://13.60.201.33:4000/",
  cache: new InMemoryCache(),
});

export default client;
