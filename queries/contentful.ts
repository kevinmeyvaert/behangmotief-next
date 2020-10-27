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
                fileName
              }
              firstImageSize
              secondImage {
                url
                fileName
              }
              secondImageSize
              fullPageImage {
                url
                fileName
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
