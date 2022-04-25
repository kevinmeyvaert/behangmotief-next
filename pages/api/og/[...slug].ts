import { getScreenshot } from '../../../lib/og/og';

const handler = async (req, res) => {
  const {
    query: { slug },
  } = req;

  const f = await getScreenshot(process.env.NODE_ENV === 'development', slug);
  res.setHeader('Content-type', 'image/jpeg');
  res.send(f);
};

export default handler;
