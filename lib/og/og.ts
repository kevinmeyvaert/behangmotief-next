import puppeteer from 'puppeteer-core';

import { getOptions } from './options';
let _page = null;

async function getPage(isDev) {
  if (_page) {
    return _page;
  }
  const options = await getOptions(isDev);
  const browser = await puppeteer.launch(options);
  _page = await browser.newPage();
  return _page;
}

export async function getScreenshot(isDev, slug) {
  const path = `/og/${slug.join('/')}`;
  const page = await getPage(isDev);

  await page.setViewport({ width: 1200, height: 630 });
  await page.goto(`${isDev ? 'http://localhost:3000' : 'https://www.behangmotief.be'}${path}`);

  const file = await page.screenshot({ type: 'jpeg' });
  return file;
}

export async function getStoryScreenshot(isDev, slug) {
  const path = `/og/${slug.join('/')}`;
  const page = await getPage(isDev);

  await page.setViewport({ width: 1080, height: 1920 });
  await page.goto(`${isDev ? 'http://localhost:3000' : 'https://www.behangmotief.be'}${path}`);

  const file = await page.screenshot({ type: 'jpeg' });
  return file;
}
