export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
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

export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  slug: Scalars['String'];
  url?: Maybe<Scalars['String']>;
  artist?: Maybe<Artist>;
  venue?: Maybe<Venue>;
  thumbnail?: Maybe<Image>;
  photographers?: Maybe<Array<Maybe<Photographer>>>;
  images?: Maybe<Array<Maybe<Image>>>;
  event?: Maybe<Event>;
  date?: Maybe<Scalars['Date']>;
  timestamp?: Maybe<Scalars['Int']>;
  searchScore?: Maybe<Scalars['Float']>;
};

export type Artist = {
  __typename?: 'Artist';
  id: Scalars['String'];
  slug: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  lastPost?: Maybe<Post>;
  posts?: Maybe<PostList>;
  similar?: Maybe<ArtistList>;
  spotifyFollowers?: Maybe<Scalars['Int']>;
  spotifyGenres?: Maybe<Array<Maybe<Scalars['String']>>>;
  spotifyPopularity?: Maybe<Scalars['Int']>;
  postCount?: Maybe<Scalars['Int']>;
  searchScore?: Maybe<Scalars['Float']>;
};

export type ArtistPostsArgs = {
  start?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type ArtistSimilarArgs = {
  start?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type Venue = {
  __typename?: 'Venue';
  id: Scalars['String'];
  slug: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  lastPost?: Maybe<Post>;
  posts?: Maybe<PostList>;
  postCount?: Maybe<Scalars['Int']>;
  searchScore?: Maybe<Scalars['Float']>;
};

export type VenuePostsArgs = {
  start?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type Photographer = {
  __typename?: 'Photographer';
  id: Scalars['String'];
  fullName: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  active?: Maybe<Scalars['Boolean']>;
  lastPost?: Maybe<Post>;
  posts?: Maybe<PostList>;
  postCount?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
  image?: Maybe<Image>;
  email?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  searchScore?: Maybe<Scalars['Float']>;
  startYear?: Maybe<Scalars['String']>;
  bestof?: Maybe<PostList>;
};

export type PhotographerPostsArgs = {
  start?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type PhotographerBestofArgs = {
  start?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type Event = {
  __typename?: 'Event';
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  lastPost?: Maybe<Post>;
  posts?: Maybe<PostList>;
  postCount?: Maybe<Scalars['Int']>;
  searchScore?: Maybe<Scalars['Float']>;
};

export type EventPostsArgs = {
  start?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type Image = {
  __typename?: 'Image';
  id: Scalars['String'];
  hires?: Maybe<Scalars['String']>;
  dimensions?: Maybe<Dimensions>;
  photographer?: Maybe<Photographer>;
  resized?: Maybe<Scalars['String']>;
};

export type ImageResizedArgs = {
  width: Scalars['Int'];
  height: Scalars['Int'];
  square?: Maybe<Scalars['Boolean']>;
};

export type Dimensions = {
  __typename?: 'Dimensions';
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
};

export type Stats = {
  __typename?: 'Stats';
  id: Scalars['String'];
  postCount?: Maybe<Scalars['Int']>;
  artistCount?: Maybe<Scalars['Int']>;
  venueCount?: Maybe<Scalars['Int']>;
  photographerCount?: Maybe<Scalars['Int']>;
};

export type StatsPhotographerCountArgs = {
  onlyActive?: Maybe<Scalars['Boolean']>;
};

export type Pagination = {
  __typename?: 'Pagination';
  start?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type PostList = {
  __typename?: 'PostList';
  data?: Maybe<Array<Maybe<Post>>>;
  pagination?: Maybe<Pagination>;
};

export type ArtistList = {
  __typename?: 'ArtistList';
  data?: Maybe<Array<Maybe<Artist>>>;
  pagination?: Maybe<Pagination>;
};

export type EventList = {
  __typename?: 'EventList';
  data?: Maybe<Array<Maybe<Event>>>;
  pagination?: Maybe<Pagination>;
};

export type VenueList = {
  __typename?: 'VenueList';
  data?: Maybe<Array<Maybe<Venue>>>;
  pagination?: Maybe<Pagination>;
};

export type PhotographerList = {
  __typename?: 'PhotographerList';
  data?: Maybe<Array<Maybe<Photographer>>>;
  pagination?: Maybe<Pagination>;
};

export type LetterPart = {
  __typename?: 'LetterPart';
  id: Scalars['ID'];
  firstLetter?: Maybe<Scalars['String']>;
  lastLetter?: Maybe<Scalars['String']>;
  firstArtist?: Maybe<Artist>;
  lastArtist?: Maybe<Artist>;
  artists?: Maybe<Array<Maybe<Artist>>>;
  artistCount?: Maybe<Scalars['Int']>;
};

export type SearchResult = {
  __typename?: 'SearchResult';
  artists?: Maybe<ArtistList>;
  posts?: Maybe<PostList>;
  venues?: Maybe<VenueList>;
  events?: Maybe<EventList>;
  photographers?: Maybe<PhotographerList>;
};

export type SearchResultArtistsArgs = {
  start?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type SearchResultPostsArgs = {
  start?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type SearchResultVenuesArgs = {
  start?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type SearchResultEventsArgs = {
  start?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type SearchResultPhotographersArgs = {
  start?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  posts?: Maybe<PostList>;
  post?: Maybe<Post>;
  postSearch?: Maybe<PostList>;
  randomPost?: Maybe<PostList>;
  artists?: Maybe<ArtistList>;
  artist?: Maybe<Artist>;
  artistsSplittedInLetterParts?: Maybe<Array<Maybe<LetterPart>>>;
  events?: Maybe<EventList>;
  event?: Maybe<Event>;
  venues?: Maybe<VenueList>;
  venue?: Maybe<Venue>;
  photographers?: Maybe<PhotographerList>;
  photographer?: Maybe<Photographer>;
  search?: Maybe<SearchResult>;
  stats?: Maybe<Stats>;
  bestof?: Maybe<PostList>;
};

export type QueryPostsArgs = {
  start?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type QueryPostArgs = {
  slug?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

export type QueryPostSearchArgs = {
  artist?: Maybe<Scalars['String']>;
  venue?: Maybe<Scalars['String']>;
  photographer?: Maybe<Scalars['String']>;
  event?: Maybe<Scalars['String']>;
  artistId?: Maybe<Scalars['String']>;
  venueId?: Maybe<Scalars['String']>;
  photographerId?: Maybe<Scalars['String']>;
  eventId?: Maybe<Scalars['String']>;
  artistSlug?: Maybe<Scalars['String']>;
  venueSlug?: Maybe<Scalars['String']>;
  eventSlug?: Maybe<Scalars['String']>;
  photographerSlug?: Maybe<Scalars['String']>;
  year?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type QueryRandomPostArgs = {
  amount?: Maybe<Scalars['Int']>;
};

export type QueryArtistsArgs = {
  start?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type QueryArtistArgs = {
  slug?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

export type QueryArtistsSplittedInLetterPartsArgs = {
  amount?: Maybe<Scalars['Int']>;
};

export type QueryEventsArgs = {
  start?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  sortDirection?: Maybe<Scalars['Int']>;
};

export type QueryEventArgs = {
  slug?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

export type QueryVenuesArgs = {
  start?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type QueryVenueArgs = {
  slug?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

export type QueryPhotographersArgs = {
  onlyActive?: Maybe<Scalars['Boolean']>;
  start?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type QueryPhotographerArgs = {
  slug?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

export type QuerySearchArgs = {
  q?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['Boolean']>;
  start?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type QueryBestofArgs = {
  start?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export enum CacheControlScope {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export type SearchQueryVariables = Exact<{
  start?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;

export type SearchQuery = { __typename?: 'Query' } & {
  posts?: Maybe<
    { __typename?: 'PostList' } & {
      data?: Maybe<
        Array<
          Maybe<
            { __typename?: 'Post' } & Pick<Post, 'id' | 'date' | 'slug'> & {
                artist?: Maybe<{ __typename?: 'Artist' } & Pick<Artist, 'name'>>;
                thumbnail?: Maybe<
                  { __typename?: 'Image' } & Pick<Image, 'hires'> & {
                      dimensions?: Maybe<
                        { __typename?: 'Dimensions' } & Pick<Dimensions, 'width' | 'height'>
                      >;
                    }
                >;
                venue?: Maybe<{ __typename?: 'Venue' } & Pick<Venue, 'id' | 'name'>>;
              }
          >
        >
      >;
      pagination?: Maybe<
        { __typename?: 'Pagination' } & Pick<Pagination, 'start' | 'limit' | 'total'>
      >;
    }
  >;
};

export type AlbumQueryVariables = Exact<{
  slug?: Maybe<Scalars['String']>;
}>;

export type AlbumQuery = { __typename?: 'Query' } & {
  post?: Maybe<
    { __typename?: 'Post' } & Pick<Post, 'date' | 'id' | 'url'> & {
        thumbnail?: Maybe<{ __typename?: 'Image' } & Pick<Image, 'resized'>>;
        artist?: Maybe<{ __typename?: 'Artist' } & Pick<Artist, 'name'>>;
        venue?: Maybe<{ __typename?: 'Venue' } & Pick<Venue, 'name'>>;
        thumbs?: Maybe<
          Array<
            Maybe<
              { __typename?: 'Image' } & Pick<Image, 'resized'> & {
                  dimensions?: Maybe<
                    { __typename?: 'Dimensions' } & Pick<Dimensions, 'width' | 'height'>
                  >;
                }
            >
          >
        >;
        images?: Maybe<
          Array<
            Maybe<
              { __typename?: 'Image' } & Pick<Image, 'hires'> & {
                  dimensions?: Maybe<
                    { __typename?: 'Dimensions' } & Pick<Dimensions, 'width' | 'height'>
                  >;
                }
            >
          >
        >;
      }
  >;
};
