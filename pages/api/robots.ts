/* eslint-disable no-param-reassign */

import type { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).send(`User-agent: *
  Allow: /`);
};
