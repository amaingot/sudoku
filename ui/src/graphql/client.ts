import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import config from "../utils/config";
import { auth } from "../utils/auth";

const API_HOST = config.API_HOST;

const httpLink = createHttpLink({
  uri: `${API_HOST}/graphql/`,
});

const authLink = setContext(async (_, { headers }) => {
  const token = await auth.getAccessToken();
  const authHeader: Record<string, string> = {};

  if (token) {
    authHeader["Authorization"] = `Bearer ${token}`;
  }

  return {
    headers: {
      ...headers,
      ...authHeader,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default client;
