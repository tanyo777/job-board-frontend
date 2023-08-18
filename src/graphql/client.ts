import {
  createHttpLink,
  ApolloLink,
  ApolloClient,
  InMemoryCache,
  from,
  split,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

import envConfig from "../config/envConfig";
import { getMainDefinition } from "@apollo/client/utilities";

// logout link
const logoutLink = onError((res) => {
  const status = (res.networkError as any).statusCode;

  if (status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.href = "/";
  }
});

// auth link
const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("token");

  if (token) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }
  return forward(operation);
});

// http link
const httpLink = from([
  logoutLink,
  authLink,
  createHttpLink({ uri: envConfig.gqlEndpoint }),
]);

// GraphQL WebSocket Client
const wsLink = new GraphQLWsLink(
  createClient({
    url: envConfig.wsGqlEndpoint,
    connectionParams() {
      const token = localStorage.getItem("token");
      return { token };
    },
  })
);

const splitLink = split(
  ({ query }) => {
    console.log(query);
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

// GraphQL Client
// depending on the traffic redirect to the WS/HTTP server
const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "network-only",
    },
    mutate: { fetchPolicy: "network-only" },
    watchQuery: {
      fetchPolicy: "network-only",
    },
  },
});

export default apolloClient;
