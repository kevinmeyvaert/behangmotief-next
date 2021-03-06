import { gql } from 'graphql-request';

const PagesLink = gql`
  fragment pagesLink on Pages {
    title
    slug
  }
`;

const AlbumsLink = gql`
  fragment albumsLink on Albums {
    title
    slug
  }
`;

export const NAVIGATION = gql`
  query Navigation {
    navigation(id: "tdwDULl9qTZlG7UJWiz5V") {
      name
      pageCollection {
        items {
          __typename
          ...pagesLink
          ...albumsLink
        }
      }
    }
  }
  ${PagesLink}
  ${AlbumsLink}
`;

const NewsPaper = gql`
  fragment blockNewsPaper on BlockNewsPaper {
    firstImage {
      url
      width
      height
      fileName
    }
    firstImageSize
    secondImage {
      url
      width
      height
      fileName
    }
    secondImageSize
    fullPageImage {
      url
      width
      height
      fileName
    }
    fullPageImageDescription
    direction
    aside
  }
`;

const DuoPhoto = gql`
  fragment blockDuoPhoto on BlockDuoPhoto {
    firstPhoto {
      url
      width
      height
    }
    secondPhoto {
      url
      width
      height
    }
    firstPhotoDescription
    secondPhotoDescription
    style
  }
`;

const BlockText = gql`
  fragment blockText on BlockText {
    text
  }
`;

export const PAGE = gql`
  query Page($id: String!) {
    page: pages(id: $id) {
      title
      slug
      pageImage {
        url
        width
        height
      }
      contentBlocksCollection {
        items {
          __typename
          ...blockDuoPhoto
          ...blockText
          ...blockNewsPaper
        }
      }
    }
  }
  ${BlockText}
  ${DuoPhoto}
  ${NewsPaper}
`;

export const SERIE = gql`
  query Serie($slug: String, $skip: Int) {
    pagesCollection(where: { slug: $slug }) {
      items {
        title
        slug
        pageImage {
          url(transform: { width: 1200, height: 630, resizeStrategy: FIT })
        }
        contentBlocksCollection(limit: 25, skip: $skip) {
          items {
            ...blockNewsPaper
          }
        }
      }
    }
  }
  ${NewsPaper}
`;

export const RANDOM_SPREADS = gql`
  query RandomSpread {
    randomSpreads: blockNewsPaperCollection(limit: 5, order: sys_firstPublishedAt_DESC) {
      items {
        ...blockNewsPaper
      }
    }
  }
  ${NewsPaper}
`;

export const CONTENTFUL_ALBUM = gql`
  query Album($slug: String) {
    albumsCollection(where: { slug: $slug }) {
      items {
        title
        slug
        photosCollection {
          items {
            url
            width
            height
          }
        }
        coverPhoto {
          url
        }
      }
    }
  }
`;
