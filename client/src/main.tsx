import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import App from "./App";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
