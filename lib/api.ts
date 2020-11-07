import { GraphQLClient } from 'graphql-request';

export const WANNABES_API_ENDPOINT = 'https://graphql.wannabes.be/graphql';
export const CONTENTFUL_API_ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_CONTENTFUL_SPACE_ID}`;

interface ContentfulRequest {
  query: string;
  variables?: { [key: string]: any };
  preview?: boolean;
}

export const contentfulRequest = async ({ query, variables }: ContentfulRequest) => {
  const endpoint = CONTENTFUL_API_ENDPOINT;
  const client = new GraphQLClient(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${process.env.NEXT_CONTENTFUL_API_KEY}`,
    },
  });
  return client.request(query, variables);
};
