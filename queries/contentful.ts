import { gql } from 'graphql-request';

export const NAVIGATION = gql`
  query Navigation {
    navigation(id: "tdwDULl9qTZlG7UJWiz5V") {
      name
      pageCollection {
        items {
          slug
          title
        }
      }
    }
  }
`;

export const SERIE = gql`
  query Serie($slug: String) {
    pagesCollection(where: { slug: $slug }) {
      items {
        title
        slug
        contentBlocksCollection(limit: 25) {
          items {
            ... on BlockNewsPaper {
              firstImage {
                url
              }
              firstImageSize
              secondImage {
                url
              }
              secondImageSize
              fullPageImage {
                url
              }
              fullPageImageDescription
              direction
              aside
            }
          }
        }
      }
    }
  }
`;
