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

export const ALBUM_PATHS = gql`
  query GetAlbumPaths {
    posts: postSearch(photographerSlug: "kevin-meyvaert", start: 0, limit: 500) {
      data {
        slug
      }
    }
  }
`;

export const ALBUM = gql`
  query Album($slug: String) {
    post(slug: $slug) {
      date
      thumbnail {
        resized(width: 1200, height: 800)
      }
      id
      url
      artist {
        name
      }
      venue {
        name
      }
      thumbs: images {
        dimensions {
          width
          height
        }
        resized(width: 400, height: 300)
      }
      images {
        hires
        dimensions {
          width
          height
        }
      }
    }
  }
`;
