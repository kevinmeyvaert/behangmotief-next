export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Artist = {
  __typename?: 'Artist';
  id: Scalars['String'];
  lastPost?: Maybe<Post>;
  name?: Maybe<Scalars['String']>;
  postCount?: Maybe<Scalars['Int']>;
  posts?: Maybe<PostList>;
  searchScore?: Maybe<Scalars['Float']>;
  similar?: Maybe<ArtistList>;
  slug: Scalars['String'];
  spotifyFollowers?: Maybe<Scalars['Int']>;
  spotifyGenres?: Maybe<Array<Maybe<Scalars['String']>>>;
  spotifyPopularity?: Maybe<Scalars['Int']>;
};

export type ArtistPostsArgs = {
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
};

export type ArtistSimilarArgs = {
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
};

export type ArtistList = {
  __typename?: 'ArtistList';
  data?: Maybe<Array<Maybe<Artist>>>;
  pagination?: Maybe<Pagination>;
};

export enum CacheControlScope {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
}

export type Dimensions = {
  __typename?: 'Dimensions';
  height?: Maybe<Scalars['Int']>;
  width?: Maybe<Scalars['Int']>;
};

export type Event = {
  __typename?: 'Event';
  id: Scalars['String'];
  lastPost?: Maybe<Post>;
  name?: Maybe<Scalars['String']>;
  postCount?: Maybe<Scalars['Int']>;
  posts?: Maybe<PostList>;
  searchScore?: Maybe<Scalars['Float']>;
  slug?: Maybe<Scalars['String']>;
};

export type EventPostsArgs = {
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
};

export type EventList = {
  __typename?: 'EventList';
  data?: Maybe<Array<Maybe<Event>>>;
  pagination?: Maybe<Pagination>;
};

export type Image = {
  __typename?: 'Image';
  blurhash?: Maybe<Scalars['String']>;
  dimensions?: Maybe<Dimensions>;
  hires?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  photographer?: Maybe<Photographer>;
  resized?: Maybe<Scalars['String']>;
  tiny?: Maybe<Scalars['String']>;
};

export type ImageBlurhashArgs = {
  square?: Maybe<Scalars['Boolean']>;
};

export type ImageResizedArgs = {
  height: Scalars['Int'];
  square?: Maybe<Scalars['Boolean']>;
  width: Scalars['Int'];
};

export type ImageTinyArgs = {
  square?: Maybe<Scalars['Boolean']>;
};

export type LetterPart = {
  __typename?: 'LetterPart';
  artistCount?: Maybe<Scalars['Int']>;
  artists?: Maybe<Array<Maybe<Artist>>>;
  firstArtist?: Maybe<Artist>;
  firstLetter?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastArtist?: Maybe<Artist>;
  lastLetter?: Maybe<Scalars['String']>;
};

export type Pagination = {
  __typename?: 'Pagination';
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type Photographer = {
  __typename?: 'Photographer';
  active?: Maybe<Scalars['Boolean']>;
  bestof?: Maybe<PostList>;
  email?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  fullName: Scalars['String'];
  id: Scalars['String'];
  image?: Maybe<Image>;
  instagram?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  lastPost?: Maybe<Post>;
  postCount?: Maybe<Scalars['Int']>;
  posts?: Maybe<PostList>;
  searchScore?: Maybe<Scalars['Float']>;
  slug?: Maybe<Scalars['String']>;
  startYear?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

export type PhotographerBestofArgs = {
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
};

export type PhotographerPostsArgs = {
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
};

export type PhotographerList = {
  __typename?: 'PhotographerList';
  data?: Maybe<Array<Maybe<Photographer>>>;
  pagination?: Maybe<Pagination>;
};

export type Post = {
  __typename?: 'Post';
  artist?: Maybe<Artist>;
  date?: Maybe<Scalars['Date']>;
  event?: Maybe<Event>;
  id: Scalars['ID'];
  images?: Maybe<Array<Maybe<Image>>>;
  photographers?: Maybe<Array<Maybe<Photographer>>>;
  searchScore?: Maybe<Scalars['Float']>;
  slug: Scalars['String'];
  thumbnail?: Maybe<Image>;
  timestamp?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  venue?: Maybe<Venue>;
};

export type PostList = {
  __typename?: 'PostList';
  data?: Maybe<Array<Maybe<Post>>>;
  pagination?: Maybe<Pagination>;
};

export type Query = {
  __typename?: 'Query';
  allSlugs?: Maybe<Slugs>;
  artist?: Maybe<Artist>;
  artists?: Maybe<ArtistList>;
  artistsSplittedInLetterParts?: Maybe<Array<Maybe<LetterPart>>>;
  artistsStartingWithLetter?: Maybe<Array<Maybe<Artist>>>;
  bestof?: Maybe<PostList>;
  event?: Maybe<Event>;
  events?: Maybe<EventList>;
  photographer?: Maybe<Photographer>;
  photographers?: Maybe<PhotographerList>;
  post?: Maybe<Post>;
  postSearch?: Maybe<PostList>;
  posts?: Maybe<PostList>;
  randomPost?: Maybe<PostList>;
  search?: Maybe<SearchResult>;
  stats?: Maybe<Stats>;
  venue?: Maybe<Venue>;
  venues?: Maybe<VenueList>;
};

export type QueryArtistArgs = {
  id?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
};

export type QueryArtistsArgs = {
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
};

export type QueryArtistsSplittedInLetterPartsArgs = {
  amount?: Maybe<Scalars['Int']>;
};

export type QueryArtistsStartingWithLetterArgs = {
  letter?: Maybe<Scalars['String']>;
};

export type QueryBestofArgs = {
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
};

export type QueryEventArgs = {
  id?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
};

export type QueryEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  sortDirection?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
};

export type QueryPhotographerArgs = {
  id?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
};

export type QueryPhotographersArgs = {
  limit?: Maybe<Scalars['Int']>;
  onlyActive?: Maybe<Scalars['Boolean']>;
  start?: Maybe<Scalars['Int']>;
};

export type QueryPostArgs = {
  id?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
};

export type QueryPostSearchArgs = {
  all?: Maybe<Scalars['String']>;
  artist?: Maybe<Scalars['String']>;
  artistId?: Maybe<Scalars['String']>;
  artistSlug?: Maybe<Scalars['String']>;
  event?: Maybe<Scalars['String']>;
  eventId?: Maybe<Scalars['String']>;
  eventSlug?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  photographer?: Maybe<Scalars['String']>;
  photographerId?: Maybe<Scalars['String']>;
  photographerSlug?: Maybe<Scalars['String']>;
  random?: Maybe<Scalars['Boolean']>;
  start?: Maybe<Scalars['Int']>;
  venue?: Maybe<Scalars['String']>;
  venueId?: Maybe<Scalars['String']>;
  venueSlug?: Maybe<Scalars['String']>;
  year?: Maybe<Scalars['Int']>;
};

export type QueryPostsArgs = {
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
};

export type QueryRandomPostArgs = {
  amount?: Maybe<Scalars['Int']>;
};

export type QuerySearchArgs = {
  limit?: Maybe<Scalars['Int']>;
  q?: Maybe<Scalars['String']>;
  random?: Maybe<Scalars['Boolean']>;
  start?: Maybe<Scalars['Int']>;
  startsWith?: Maybe<Scalars['Boolean']>;
};

export type QueryVenueArgs = {
  id?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
};

export type QueryVenuesArgs = {
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
};

export type SearchResult = {
  __typename?: 'SearchResult';
  artists?: Maybe<ArtistList>;
  events?: Maybe<EventList>;
  photographers?: Maybe<PhotographerList>;
  posts?: Maybe<PostList>;
  venues?: Maybe<VenueList>;
};

export type SearchResultArtistsArgs = {
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
};

export type SearchResultEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
};

export type SearchResultPhotographersArgs = {
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
};

export type SearchResultPostsArgs = {
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
};

export type SearchResultVenuesArgs = {
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
};

export type Slugs = {
  __typename?: 'Slugs';
  artists?: Maybe<Array<Maybe<Scalars['String']>>>;
  events?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['ID'];
  photographers?: Maybe<Array<Maybe<Scalars['String']>>>;
  posts?: Maybe<Array<Maybe<Scalars['String']>>>;
  venues?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Stats = {
  __typename?: 'Stats';
  artistCount?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  photographerCount?: Maybe<Scalars['Int']>;
  postCount?: Maybe<Scalars['Int']>;
  venueCount?: Maybe<Scalars['Int']>;
};

export type StatsPhotographerCountArgs = {
  onlyActive?: Maybe<Scalars['Boolean']>;
};

export type Venue = {
  __typename?: 'Venue';
  id: Scalars['String'];
  lastPost?: Maybe<Post>;
  name?: Maybe<Scalars['String']>;
  postCount?: Maybe<Scalars['Int']>;
  posts?: Maybe<PostList>;
  searchScore?: Maybe<Scalars['Float']>;
  slug: Scalars['String'];
};

export type VenuePostsArgs = {
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
};

export type VenueList = {
  __typename?: 'VenueList';
  data?: Maybe<Array<Maybe<Venue>>>;
  pagination?: Maybe<Pagination>;
};

export type SearchQueryVariables = Exact<{
  start?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;

export type SearchQuery = {
  __typename?: 'Query';
  posts?:
    | {
        __typename?: 'PostList';
        data?:
          | Array<
              | {
                  __typename?: 'Post';
                  id: string;
                  date?: any | null | undefined;
                  slug: string;
                  artist?:
                    | { __typename?: 'Artist'; name?: string | null | undefined }
                    | null
                    | undefined;
                  images?:
                    | Array<
                        | {
                            __typename?: 'Image';
                            blurhash?: string | null | undefined;
                            resized?: string | null | undefined;
                            photographer?:
                              | {
                                  __typename?: 'Photographer';
                                  firstName?: string | null | undefined;
                                }
                              | null
                              | undefined;
                          }
                        | null
                        | undefined
                      >
                    | null
                    | undefined;
                  thumbnail?:
                    | {
                        __typename?: 'Image';
                        blurhash?: string | null | undefined;
                        hires?: string | null | undefined;
                        photographer?:
                          | { __typename?: 'Photographer'; firstName?: string | null | undefined }
                          | null
                          | undefined;
                        dimensions?:
                          | {
                              __typename?: 'Dimensions';
                              width?: number | null | undefined;
                              height?: number | null | undefined;
                            }
                          | null
                          | undefined;
                      }
                    | null
                    | undefined;
                  venue?:
                    | { __typename?: 'Venue'; id: string; name?: string | null | undefined }
                    | null
                    | undefined;
                  event?:
                    | { __typename?: 'Event'; name?: string | null | undefined }
                    | null
                    | undefined;
                }
              | null
              | undefined
            >
          | null
          | undefined;
        pagination?:
          | {
              __typename?: 'Pagination';
              start?: number | null | undefined;
              limit?: number | null | undefined;
              total?: number | null | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type GetAlbumPathsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAlbumPathsQuery = {
  __typename?: 'Query';
  posts?:
    | {
        __typename?: 'PostList';
        data?: Array<{ __typename?: 'Post'; slug: string } | null | undefined> | null | undefined;
      }
    | null
    | undefined;
};

export type AlbumQueryVariables = Exact<{
  slug?: Maybe<Scalars['String']>;
}>;

export type AlbumQuery = {
  __typename?: 'Query';
  post?:
    | {
        __typename?: 'Post';
        date?: any | null | undefined;
        id: string;
        url?: string | null | undefined;
        thumbnail?:
          | {
              __typename?: 'Image';
              resized?: string | null | undefined;
              photographer?:
                | { __typename?: 'Photographer'; firstName?: string | null | undefined }
                | null
                | undefined;
            }
          | null
          | undefined;
        artist?: { __typename?: 'Artist'; name?: string | null | undefined } | null | undefined;
        venue?: { __typename?: 'Venue'; name?: string | null | undefined } | null | undefined;
        images?:
          | Array<
              | {
                  __typename?: 'Image';
                  blurhash?: string | null | undefined;
                  hires?: string | null | undefined;
                  dimensions?:
                    | {
                        __typename?: 'Dimensions';
                        width?: number | null | undefined;
                        height?: number | null | undefined;
                      }
                    | null
                    | undefined;
                  photographer?:
                    | { __typename?: 'Photographer'; firstName?: string | null | undefined }
                    | null
                    | undefined;
                }
              | null
              | undefined
            >
          | null
          | undefined;
      }
    | null
    | undefined;
};
