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

export const SERIES_PATHS = gql`
  query SeriesPaths {
    seriesPaths: allSeries {
      slug
    }
  }
`;

export const SERIE = gql`
  query Serie($slug: String) {
    serie(filter: { slug: { eq: $slug } }) {
      title
      description
      photos {
        url
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
