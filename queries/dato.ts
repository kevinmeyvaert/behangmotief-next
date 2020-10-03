import { gql } from 'graphql-request';

export const ABOUT = gql`
  query About {
    about {
      content {
        content(markdown: true)
      }
      headerImage {
        url
      }
    }
  }
`;

export const SERIE = gql`
  query Serie($slug: String) {
    serie(filter: { slug: { eq: $slug } }) {
      description
      photos {
        url
        title
      }
    }
  }
`;

export const NAVIGATION = gql`
  query Navigation {
    navigation {
      items {
        slug
        title
      }
    }
  }
`;
