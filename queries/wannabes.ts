import { gql } from 'graphql-request';

export const POSTS = gql`
  query Search($start: Int, $limit: Int) {
    posts: postSearch(photographerSlug: "kevin-meyvaert", start: $start, limit: $limit) {
      data {
        id
        artist {
          name
        }
        date
        slug
        thumbnail {
          hires
          dimensions {
            width
            height
          }
        }
        venue {
          id
          name
        }
      }
      pagination {
        start
        limit
        total
      }
    }
  }
`;
