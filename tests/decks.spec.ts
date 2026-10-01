import { expect, test } from '@playwright/test';

const basePath = process.env.BASE_PATH ?? '';
const canonicalBase = process.env.VITE_CANONICAL_URL?.replace(/\/+$/, '');

test('index offers two independent sample lectures', async ({ page }) => {
  await page.goto('./');

  await expect(page).toHaveTitle(
    'Lecture Decks | Truth-Telling 101: Artists Meet Data Journalism'
  );
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    /Truth-Telling 101 Artists Meet Data Journalism/
  );
  await expect(page.getByRole('heading', { name: 'Sample lectures' })).toBeVisible();
  await expect(page.locator('.lecture-card')).toHaveCount(2);
  await expect(
    page.getByRole('link', { name: /Example 01 Interview the Data/ })
  ).toHaveAttribute('href', `${basePath}/lectures/sample-opening/`);
  await expect(
    page.getByRole('link', { name: /Example 02 Your Next Lecture/ })
  ).toHaveAttribute('href', `${basePath}/lectures/sample-next/`);
  if (canonicalBase) {
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `${canonicalBase}/`
    );
  } else {
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  }
  await expect(page.locator('body')).not.toContainText('archive.ire.org');
});

test('first lecture starts, advances, and returns to the index', async ({ page }) => {
  await page.goto('./lectures/sample-opening/');

  await expect(page).toHaveTitle(
    'Interview the Data | Truth-Telling 101: Artists Meet Data Journalism'
  );
  if (canonicalBase) {
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `${canonicalBase}/lectures/sample-opening/`
    );
  }
  await expect(page.locator('.reveal')).toHaveClass(/ready/);
  await expect(page.locator('.slides > section')).toHaveCount(3);
  await expect(page.locator('.slides > section.present h1')).toHaveText('Interview the Data');
  await expect(page.locator('aside.notes')).toHaveCount(2);

  await page.keyboard.press('ArrowRight');
  await expect(page.locator('.slides > section.present h1')).toHaveText(
    'What do you want to know?'
  );

  await page.getByRole('link', { name: 'All lectures' }).click();
  await expect(page.getByRole('heading', { name: 'Sample lectures' })).toBeVisible();
});

test('second lecture has its own slides and placeholder for a visual', async ({ page }) => {
  await page.goto('./lectures/sample-next/');

  await expect(page.locator('.reveal')).toHaveClass(/ready/);
  await expect(page.locator('.slides > section')).toHaveCount(2);
  await expect(page.locator('.slides > section.present h1')).toHaveText('Your Next Lecture');
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('.slides > section.present h1')).toHaveText('Show, then explain.');
  await expect(
    page.getByRole('group', { name: 'Placeholder for a chart or screenshot' })
  ).toBeVisible();
  await expect(page.locator('.slides')).not.toContainText('What do you want to know?');
});

test('speaker view receives the notes for the current slide', async ({ page }) => {
  await page.goto('./lectures/sample-opening/');
  await expect(page.locator('.reveal')).toHaveClass(/ready/);

  const popupPromise = page.waitForEvent('popup');
  await page.keyboard.press('s');
  const speakerView = await popupPromise;
  await expect(speakerView.locator('.speaker-controls-notes .value')).toContainText(
    'Replace these sample slides'
  );
  await speakerView.close();
});

test('mobile index and lecture fit, with keyboard access to the index', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');

  const indexOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  expect(indexOverflow).toBeLessThanOrEqual(1);
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();

  await page.goto('./lectures/sample-opening/');
  await expect(page.locator('.reveal')).toHaveClass(/ready/);
  await expect(page.locator('body')).toHaveClass(/reveal-scroll/);
  await expect(page.locator('.scroll-page')).toHaveCount(3);
  await expect(page.getByRole('heading', { name: 'Interview the Data' })).toBeVisible();
  const deckOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  expect(deckOverflow).toBeLessThanOrEqual(1);
  await expect(page.getByRole('link', { name: 'All lectures' })).toBeVisible();
});

test('uses SVA fonts and colors without a logo or old presentation media', async ({
  page
}) => {
  await page.goto('./');
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page
      .locator('.index-hero h1')
      .evaluate((element) => getComputedStyle(element).fontFamily)
  ).toContain('Sentinel');
  await expect(page.locator('img, svg, canvas')).toHaveCount(0);

  await page.goto('./lectures/sample-opening/');
  await expect(page.locator('.reveal')).toHaveClass(/ready/);
  expect(
    await page
      .locator('.title-slide h1')
      .evaluate((element) => getComputedStyle(element).fontFamily)
  ).toContain('Sentinel');
  await expect(page.locator('img')).toHaveCount(0);
});
