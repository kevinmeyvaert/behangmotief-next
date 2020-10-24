import { GraphQLClient } from 'graphql-request';

export const WANNABES_API_ENDPOINT = 'https://graphql.wannabes.be/graphql';
export const CONTENTFUL_API_ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_CONTENTFUL_SPACE_ID}`;

interface DatoRequest {
  query: string;
  variables?: { [key: string]: any };
  preview?: boolean;
}

export const datoRequest = ({ query, variables, preview }: DatoRequest) => {
  const endpoint = preview ? `https://graphql.datocms.com/preview` : `https://graphql.datocms.com/`;
  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
    },
  });
  return client.request(query, variables);
};

export const contentfulRequest = async ({ query, variables }: DatoRequest) => {
  const endpoint = CONTENTFUL_API_ENDPOINT;
  const client = new GraphQLClient(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${process.env.NEXT_CONTENTFUL_API_KEY}`,
    },
  });
  return client.request(query, variables);
};
