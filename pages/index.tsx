import { useSWRInfinite } from 'swr';
import request from 'graphql-request';
import type { FC } from 'react';

import { WANNABES_API_ENDPOINT } from '../lib/api';
import { POSTS } from '../queries/wannabes';
import { PostList } from '../types/wannabes.types';

const NUMBER_OF_POSTS = 15;

interface Props {
  initialData: PostList[];
}

const Home: FC<Props> = ({ initialData }) => {
  const { data, error, size, setSize } = useSWRInfinite(
    (index) => {
      return [POSTS, index * NUMBER_OF_POSTS, NUMBER_OF_POSTS];
    },
    (query, start, limit) => {
      return request(WANNABES_API_ENDPOINT, query, {
        start,
        limit,
      });
    },
    { initialData },
  );
  const isLoadingInitialData = !data && !error && !data;
  const isLoadingMore =
    isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined');
  return <h1 className="c-title-page">Behangmotief</h1>;
};

export const getServerSideProps = async () => {
  const initialPosts: PostList = await request(WANNABES_API_ENDPOINT, POSTS, {
    start: NUMBER_OF_POSTS,
    limit: NUMBER_OF_POSTS,
  });
  return { props: { initialData: [initialPosts] } };
};

export default Home;
