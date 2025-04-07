'use client';

import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_REALXMARKET_GRAPHQL_API_URL
  // If you need authentication:
  // headers: {
  //   authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
  // }
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
