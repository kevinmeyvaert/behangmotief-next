import { getStoryScreenshot } from '../../../lib/og/og';

const handler = async (req, res) => {
  const {
    query: { slug },
  } = req;

  const f = await getStoryScreenshot(process.env.NODE_ENV === 'development', slug);
  res.setHeader('Content-type', 'image/jpeg');
  res.send(f);
};

export default handler;
