export type Maybe<T> = T;
export type InputMaybe<T> = T;
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
  Upload: any;
};

export type Artist = {
  __typename?: 'Artist';
  id: Scalars['String'];
  lastPost: Maybe<Post>;
  name: Maybe<Scalars['String']>;
  postCount: Maybe<Scalars['Int']>;
  posts: Maybe<PostList>;
  searchScore: Maybe<Scalars['Float']>;
  similar: Maybe<ArtistList>;
  slug: Scalars['String'];
  spotifyFollowers: Maybe<Scalars['Int']>;
  spotifyGenres: Maybe<Array<Maybe<Scalars['String']>>>;
  spotifyPopularity: Maybe<Scalars['Int']>;
};


export type ArtistPostsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
};


export type ArtistSimilarArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
};

export type ArtistList = {
  __typename?: 'ArtistList';
  data: Maybe<Array<Maybe<Artist>>>;
  pagination: Maybe<Pagination>;
};

export enum CacheControlScope {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC'
}

export type Dimensions = {
  __typename?: 'Dimensions';
  height: Maybe<Scalars['Int']>;
  width: Maybe<Scalars['Int']>;
};

export type Event = {
  __typename?: 'Event';
  id: Scalars['String'];
  lastPost: Maybe<Post>;
  name: Maybe<Scalars['String']>;
  postCount: Maybe<Scalars['Int']>;
  posts: Maybe<PostList>;
  searchScore: Maybe<Scalars['Float']>;
  slug: Maybe<Scalars['String']>;
};


export type EventPostsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
};

export type EventList = {
  __typename?: 'EventList';
  data: Maybe<Array<Maybe<Event>>>;
  pagination: Maybe<Pagination>;
};

export type Image = {
  __typename?: 'Image';
  blurhash: Maybe<Scalars['String']>;
  dimensions: Maybe<Dimensions>;
  hires: Maybe<Scalars['String']>;
  id: Scalars['String'];
  photographer: Maybe<Photographer>;
  resized: Maybe<Scalars['String']>;
  tiny: Maybe<Scalars['String']>;
};


export type ImageBlurhashArgs = {
  square: InputMaybe<Scalars['Boolean']>;
};


export type ImageResizedArgs = {
  height: Scalars['Int'];
  square: InputMaybe<Scalars['Boolean']>;
  width: Scalars['Int'];
};


export type ImageTinyArgs = {
  square: InputMaybe<Scalars['Boolean']>;
};

export type LetterPart = {
  __typename?: 'LetterPart';
  artistCount: Maybe<Scalars['Int']>;
  artists: Maybe<Array<Maybe<Artist>>>;
  firstArtist: Maybe<Artist>;
  firstLetter: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastArtist: Maybe<Artist>;
  lastLetter: Maybe<Scalars['String']>;
};

export type Pagination = {
  __typename?: 'Pagination';
  limit: Maybe<Scalars['Int']>;
  start: Maybe<Scalars['Int']>;
  total: Maybe<Scalars['Int']>;
};

export type Photographer = {
  __typename?: 'Photographer';
  active: Maybe<Scalars['Boolean']>;
  bestof: Maybe<PostList>;
  email: Maybe<Scalars['String']>;
  facebook: Maybe<Scalars['String']>;
  firstName: Maybe<Scalars['String']>;
  fullName: Scalars['String'];
  id: Scalars['String'];
  image: Maybe<Image>;
  instagram: Maybe<Scalars['String']>;
  lastName: Maybe<Scalars['String']>;
  lastPost: Maybe<Post>;
  postCount: Maybe<Scalars['Int']>;
  posts: Maybe<PostList>;
  searchScore: Maybe<Scalars['Float']>;
  slug: Maybe<Scalars['String']>;
  startYear: Maybe<Scalars['String']>;
  twitter: Maybe<Scalars['String']>;
  website: Maybe<Scalars['String']>;
};


export type PhotographerBestofArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
};


export type PhotographerPostsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
};

export type PhotographerList = {
  __typename?: 'PhotographerList';
  data: Maybe<Array<Maybe<Photographer>>>;
  pagination: Maybe<Pagination>;
};

export type Post = {
  __typename?: 'Post';
  artist: Maybe<Artist>;
  date: Maybe<Scalars['Date']>;
  event: Maybe<Event>;
  id: Scalars['ID'];
  images: Maybe<Array<Maybe<Image>>>;
  photographers: Maybe<Array<Maybe<Photographer>>>;
  searchScore: Maybe<Scalars['Float']>;
  slug: Scalars['String'];
  thumbnail: Maybe<Image>;
  timestamp: Maybe<Scalars['Int']>;
  url: Maybe<Scalars['String']>;
  venue: Maybe<Venue>;
};

export type PostList = {
  __typename?: 'PostList';
  data: Maybe<Array<Maybe<Post>>>;
  pagination: Maybe<Pagination>;
};

export type Query = {
  __typename?: 'Query';
  allSlugs: Maybe<Slugs>;
  artist: Maybe<Artist>;
  artists: Maybe<ArtistList>;
  artistsSplittedInLetterParts: Maybe<Array<Maybe<LetterPart>>>;
  artistsStartingWithLetter: Maybe<Array<Maybe<Artist>>>;
  bestof: Maybe<PostList>;
  event: Maybe<Event>;
  events: Maybe<EventList>;
  photographer: Maybe<Photographer>;
  photographers: Maybe<PhotographerList>;
  post: Maybe<Post>;
  postSearch: Maybe<PostList>;
  posts: Maybe<PostList>;
  randomPost: Maybe<PostList>;
  search: Maybe<SearchResult>;
  stats: Maybe<Stats>;
  venue: Maybe<Venue>;
  venues: Maybe<VenueList>;
};


export type QueryArtistArgs = {
  id: InputMaybe<Scalars['String']>;
  slug: InputMaybe<Scalars['String']>;
};


export type QueryArtistsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
};


export type QueryArtistsSplittedInLetterPartsArgs = {
  amount: InputMaybe<Scalars['Int']>;
};


export type QueryArtistsStartingWithLetterArgs = {
  letter: InputMaybe<Scalars['String']>;
};


export type QueryBestofArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
};


export type QueryEventArgs = {
  id: InputMaybe<Scalars['String']>;
  slug: InputMaybe<Scalars['String']>;
};


export type QueryEventsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  sortDirection?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
};


export type QueryPhotographerArgs = {
  id: InputMaybe<Scalars['String']>;
  slug: InputMaybe<Scalars['String']>;
};


export type QueryPhotographersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  onlyActive?: InputMaybe<Scalars['Boolean']>;
  start?: InputMaybe<Scalars['Int']>;
};


export type QueryPostArgs = {
  id: InputMaybe<Scalars['String']>;
  slug: InputMaybe<Scalars['String']>;
};


export type QueryPostSearchArgs = {
  all: InputMaybe<Scalars['String']>;
  artist: InputMaybe<Scalars['String']>;
  artistId: InputMaybe<Scalars['String']>;
  artistSlug: InputMaybe<Scalars['String']>;
  event: InputMaybe<Scalars['String']>;
  eventId: InputMaybe<Scalars['String']>;
  eventSlug: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  photographer: InputMaybe<Scalars['String']>;
  photographerId: InputMaybe<Scalars['String']>;
  photographerSlug: InputMaybe<Scalars['String']>;
  random?: InputMaybe<Scalars['Boolean']>;
  start?: InputMaybe<Scalars['Int']>;
  venue: InputMaybe<Scalars['String']>;
  venueId: InputMaybe<Scalars['String']>;
  venueSlug: InputMaybe<Scalars['String']>;
  year: InputMaybe<Scalars['Int']>;
};


export type QueryPostsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
};


export type QueryRandomPostArgs = {
  amount?: InputMaybe<Scalars['Int']>;
};


export type QuerySearchArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  q: InputMaybe<Scalars['String']>;
  random?: InputMaybe<Scalars['Boolean']>;
  start?: InputMaybe<Scalars['Int']>;
  startsWith?: InputMaybe<Scalars['Boolean']>;
};


export type QueryVenueArgs = {
  id: InputMaybe<Scalars['String']>;
  slug: InputMaybe<Scalars['String']>;
};


export type QueryVenuesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
};

export type SearchResult = {
  __typename?: 'SearchResult';
  artists: Maybe<ArtistList>;
  events: Maybe<EventList>;
  photographers: Maybe<PhotographerList>;
  posts: Maybe<PostList>;
  venues: Maybe<VenueList>;
};


export type SearchResultArtistsArgs = {
  limit: InputMaybe<Scalars['Int']>;
  start: InputMaybe<Scalars['Int']>;
};


export type SearchResultEventsArgs = {
  limit: InputMaybe<Scalars['Int']>;
  start: InputMaybe<Scalars['Int']>;
};


export type SearchResultPhotographersArgs = {
  limit: InputMaybe<Scalars['Int']>;
  start: InputMaybe<Scalars['Int']>;
};


export type SearchResultPostsArgs = {
  limit: InputMaybe<Scalars['Int']>;
  start: InputMaybe<Scalars['Int']>;
};


export type SearchResultVenuesArgs = {
  limit: InputMaybe<Scalars['Int']>;
  start: InputMaybe<Scalars['Int']>;
};

export type Slugs = {
  __typename?: 'Slugs';
  artists: Maybe<Array<Maybe<Scalars['String']>>>;
  events: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['ID'];
  photographers: Maybe<Array<Maybe<Scalars['String']>>>;
  posts: Maybe<Array<Maybe<Scalars['String']>>>;
  venues: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Stats = {
  __typename?: 'Stats';
  artistCount: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  photographerCount: Maybe<Scalars['Int']>;
  postCount: Maybe<Scalars['Int']>;
  venueCount: Maybe<Scalars['Int']>;
};


export type StatsPhotographerCountArgs = {
  onlyActive?: InputMaybe<Scalars['Boolean']>;
};

export type Venue = {
  __typename?: 'Venue';
  id: Scalars['String'];
  lastPost: Maybe<Post>;
  name: Maybe<Scalars['String']>;
  postCount: Maybe<Scalars['Int']>;
  posts: Maybe<PostList>;
  searchScore: Maybe<Scalars['Float']>;
  slug: Scalars['String'];
};


export type VenuePostsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
};

export type VenueList = {
  __typename?: 'VenueList';
  data: Maybe<Array<Maybe<Venue>>>;
  pagination: Maybe<Pagination>;
};

export type SearchQueryVariables = Exact<{
  start: InputMaybe<Scalars['Int']>;
  limit: InputMaybe<Scalars['Int']>;
  all: InputMaybe<Scalars['String']>;
}>;


export type SearchQuery = { __typename?: 'Query', posts: { __typename?: 'PostList', data: Array<{ __typename?: 'Post', id: string, date: any, slug: string, artist: { __typename?: 'Artist', name: string }, images: Array<{ __typename?: 'Image', blurhash: string, resized: string, photographer: { __typename?: 'Photographer', firstName: string } }>, thumbnail: { __typename?: 'Image', blurhash: string, hires: string, photographer: { __typename?: 'Photographer', firstName: string }, dimensions: { __typename?: 'Dimensions', width: number, height: number } }, venue: { __typename?: 'Venue', id: string, name: string }, event: { __typename?: 'Event', name: string } }>, pagination: { __typename?: 'Pagination', start: number, limit: number, total: number } } };

export type GetAlbumPathsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAlbumPathsQuery = { __typename?: 'Query', posts: { __typename?: 'PostList', data: Array<{ __typename?: 'Post', slug: string }> } };

export type AlbumQueryVariables = Exact<{
  slug: InputMaybe<Scalars['String']>;
}>;


export type AlbumQuery = { __typename?: 'Query', post: { __typename?: 'Post', date: any, id: string, url: string, thumbnail: { __typename?: 'Image', resized: string, photographer: { __typename?: 'Photographer', firstName: string } }, artist: { __typename?: 'Artist', name: string }, venue: { __typename?: 'Venue', name: string }, event: { __typename?: 'Event', name: string }, images: Array<{ __typename?: 'Image', blurhash: string, hires: string, dimensions: { __typename?: 'Dimensions', width: number, height: number }, photographer: { __typename?: 'Photographer', firstName: string } }> } };
