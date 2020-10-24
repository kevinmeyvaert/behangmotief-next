import { gql } from 'graphql-request';

export const ABOUT = gql`
  query About {
    about {
      content {
        content(markdown: true)
      }
      headerImage {
        url
        blurhash
        width
        height
      }
    }
  }
`;