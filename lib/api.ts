import request from 'graphql-request';

export const WANNABES_API_ENDPOINT = 'https://graphql.wannabes.be/graphql';

export function fetcher<T>(query: string, params?: any): Promise<T> {
  return request(WANNABES_API_ENDPOINT, query, params);
}
