import { expect, test } from '@playwright/test';

const canonicalBase = process.env.VITE_CANONICAL_URL?.replace(/\/+$/, '');

test('the deck site has no homepage', async ({ request }) => {
  const response = await request.get('./');
  expect(response.status()).toBe(404);
});

test('first lecture starts and advances without an index link', async ({ page }) => {
  await page.goto('./lectures/social-science-in-a-hurry/');

  await expect(page).toHaveTitle(
    'Social science in a hurry | Truth-Telling 101: Artists Meet Data Journalism'
  );
  if (canonicalBase) {
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `${canonicalBase}/lectures/social-science-in-a-hurry/`
    );
  }
  await expect(page.locator('.reveal')).toHaveClass(/ready/);
  await expect(page.locator('.slides > section')).toHaveCount(34);
  await expect(page.locator('.slides > section.present h1')).toHaveText(
    'Social science in a hurry'
  );
  await expect(page.locator('aside.notes')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'All lectures' })).toHaveCount(0);
  await expect(page.locator('body')).not.toContainText('archive.ire.org');

  await page.keyboard.press('ArrowRight');
  await expect(page.locator('.slides > section.present h1')).toHaveText('My name is Ben');
});

test('starter example has its own slides and placeholder for a visual', async ({ page }) => {
  await page.goto('./lectures/sample-next/');

  await expect(page.locator('.reveal')).toHaveClass(/ready/);
  await expect(page.locator('.slides > section')).toHaveCount(2);
  await expect(page.locator('.slides > section.present h1')).toHaveText('Your next lecture');
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('.slides > section.present h1')).toHaveText('Show, then explain.');
  await expect(
    page.getByRole('group', { name: 'Placeholder for a chart or screenshot' })
  ).toBeVisible();
  await expect(page.locator('.slides')).not.toContainText('What do you want to know?');
});

test('verification lecture opens directly and advances through its reporting example', async ({
  page
}) => {
  await page.goto('./lectures/peeling-the-onion/');
  await expect(page).toHaveTitle(
    'Peeling the onion | Truth-Telling 101: Artists Meet Data Journalism'
  );
  await expect(page.locator('.reveal')).toHaveClass(/ready/);
  await expect(page.locator('.slides > section')).toHaveCount(15);
  await expect(page.locator('.slides > section.present h1')).toHaveText('Peeling the onion');
  await expect(page.locator('aside.notes')).toHaveCount(0);

  await page.keyboard.press('ArrowRight');
  await expect(page.locator('.slides > section.present h1')).toHaveText('Who are these men?');
  for (let step = 0; step < 4; step += 1) {
    await page.keyboard.press('ArrowRight');
  }
  await expect(page.getByRole('img', { name: 'Working from the outside in' })).toBeVisible();

  await page.keyboard.press('End');
  await expect(page.locator('.slides > section.present h1')).toHaveText('Main subject');
  await expect(page.locator('.slides > section.present')).toContainText(
    'including the chief himself'
  );
  await expect(page.getByRole('link', { name: 'latimes.com', exact: true })).toHaveAttribute(
    'href',
    'https://www.latimes.com/local/lanow/la-me-compton-fire-chief-20150707-story.html'
  );

  await page.keyboard.press('ArrowLeft');
  await expect(page.locator('.slides > section.present h1')).toHaveText('Human sources');
  await expect(page.locator('.slides > section.present')).toContainText('the other 14');
  await expect(page.getByRole('link', { name: 'documentcloud.org' })).toHaveAttribute(
    'href',
    'https://embed.documentcloud.org/documents/1695054-la-county-ems-agenc-2014-annual-report/#document/p15'
  );

  await page.keyboard.press('ArrowLeft');
  await expect(page.locator('.slides > section.present h1')).toHaveText('Primary documents');
  await expect(page.locator('.slides > section.present')).toContainText(
    'public records request'
  );
  await expect(page.getByRole('link', { name: 'All lectures' })).toHaveCount(0);
});

test('mobile lecture fits in scroll view', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./lectures/social-science-in-a-hurry/');
  await expect(page.locator('.reveal')).toHaveClass(/ready/);
  await expect(page.locator('body')).toHaveClass(/reveal-scroll/);
  await expect(page.locator('.scroll-page')).toHaveCount(34);
  await expect(
    page.getByRole('heading', { name: 'Social science in a hurry', exact: true })
  ).toBeVisible();
  const deckOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  expect(deckOverflow).toBeLessThanOrEqual(1);
});

test('uses the syllabus palette and Ringside headings', async ({ page }) => {
  await page.goto('./lectures/social-science-in-a-hurry/');
  await expect(page.locator('.reveal')).toHaveClass(/ready/);
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('.title-slide h1')).toHaveCSS(
    'font-family',
    /Ringside Compressed/
  );
  await expect(page.locator('.title-slide h1')).toHaveCSS('color', 'rgb(230, 31, 0)');
  await expect(page.locator('section.title-slide')).toHaveCSS(
    'background-color',
    'rgb(255, 255, 255)'
  );
});
