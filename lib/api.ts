import { GraphQLClient } from "graphql-request";

export const WANNABES_API_ENDPOINT = 'https://graphql.wannabes.be/graphql';

interface DatoRequest  {
    query: string;
    variables?: { [key: string]: any };
    preview?: boolean;
}

export const datoRequest = ({ query, variables, preview }: DatoRequest) => {
  const endpoint = preview
    ? `https://graphql.datocms.com/preview`
    : `https://graphql.datocms.com/`;
  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`
    }
  });
  return client.request(query, variables);
}