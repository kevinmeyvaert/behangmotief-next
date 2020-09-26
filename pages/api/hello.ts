/* eslint-disable no-param-reassign */

import type { NextApiResponse } from 'next';

export default (res: NextApiResponse) => {
  res.statusCode = 200;
  res.json({ name: 'John Doe' });
};
