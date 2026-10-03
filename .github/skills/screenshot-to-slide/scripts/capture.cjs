#!/usr/bin/env node

/**
 * capture.js - Playwright-based screenshot capture for tutorials
 *
 * Usage:
 *   node capture.js --url URL --output path.png [options]
 *
 * Options:
 *   --url           URL to capture (required)
 *   --output        Output file path (required)
 *   --width         Viewport width (default: 1280)
 *   --height        Viewport height (default: 800)
 *   --fullpage      Capture full scrollable page
 *   --element       CSS selector to capture specific element
 *   --highlight     CSS selector to highlight with red border
 *   --execute       JavaScript to run before capture
 *   --wait          Milliseconds to wait before capture (default: 500)
 *   --dark          Use dark color scheme
 *   --format        Output format: png or jpeg (default: png)
 *   --quality       JPEG quality 0-100 (default: 90)
 *   --deviceScale   Device scale factor (default: 2 for retina)
 *   --session       Named session to use for authenticated captures
 *   --phone         Use mobile phone viewport (375x812)
 *   --browserChrome Add simulated macOS browser chrome around the page
 *   --title         Custom browser title bar text (default: auto from page)
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const os = require('os');

// Session storage directory
const SESSION_DIR = path.join(os.homedir(), '.playwright-sessions');
const CHROME_HEIGHT = 64;
const CHROME_BORDER = 5;

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getBrowserChromeOverlay(title, displayUrl) {
  return {
    css: `
      #browser-chrome-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: ${CHROME_HEIGHT}px;
        z-index: 2147483647;
        font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;
        background: linear-gradient(180deg, #e8e6e8 0%, #dcdadc 100%);
      }

      #browser-chrome-overlay * {
        box-sizing: border-box;
      }

      #browser-chrome-overlay .title-bar {
        display: flex;
        align-items: center;
        height: 28px;
        padding: 0 12px;
        position: relative;
      }

      #browser-chrome-overlay .traffic-lights {
        display: flex;
        gap: 8px;
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
      }

      #browser-chrome-overlay .traffic-light {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        box-shadow: inset 0 0 0 0.5px rgba(0,0,0,0.15);
      }

      #browser-chrome-overlay .traffic-light.close {
        background: #ff5f57;
      }

      #browser-chrome-overlay .traffic-light.minimize {
        background: #febc2e;
      }

      #browser-chrome-overlay .traffic-light.maximize {
        background: #28c840;
      }

      #browser-chrome-overlay .title {
        flex: 1;
        text-align: center;
        font-size: 13px;
        font-weight: 500;
        color: #4d4d4d;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0 80px;
        line-height: 28px;
      }

      #browser-chrome-overlay .address-bar-container {
        padding: 4px 8px 8px 8px;
      }

      #browser-chrome-overlay .address-bar {
        background: #ffffff;
        padding: 5px 12px;
        border-radius: 6px;
        border: 1px solid #c4c4c4;
        display: flex;
        align-items: center;
        gap: 6px;
        height: 28px;
      }

      #browser-chrome-overlay .lock-icon {
        width: 12px;
        height: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      #browser-chrome-overlay .lock-icon svg {
        width: 10px;
        height: 10px;
        fill: #666;
      }

      #browser-chrome-overlay .url-text {
        font-size: 12px;
        color: #333333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1;
      }

      #browser-frame-left,
      #browser-frame-right,
      #browser-frame-bottom {
        position: fixed;
        background: #dcdadc;
        z-index: 2147483646;
      }

      #browser-frame-left {
        top: ${CHROME_HEIGHT}px;
        left: 0;
        width: ${CHROME_BORDER}px;
        bottom: 0;
      }

      #browser-frame-right {
        top: ${CHROME_HEIGHT}px;
        right: 0;
        width: ${CHROME_BORDER}px;
        bottom: 0;
      }

      #browser-frame-bottom {
        left: 0;
        right: 0;
        bottom: 0;
        height: ${CHROME_BORDER}px;
      }

      html {
        margin-top: ${CHROME_HEIGHT}px !important;
        margin-left: ${CHROME_BORDER}px !important;
        margin-right: ${CHROME_BORDER}px !important;
        margin-bottom: ${CHROME_BORDER}px !important;
      }

      body {
        margin-top: 0 !important;
      }
    `,
    html: `
      <div id="browser-chrome-overlay">
        <div class="title-bar">
          <div class="traffic-lights">
            <div class="traffic-light close"></div>
            <div class="traffic-light minimize"></div>
            <div class="traffic-light maximize"></div>
          </div>
          <div class="title">${escapeHtml(title)}</div>
        </div>
        <div class="address-bar-container">
          <div class="address-bar">
            <span class="lock-icon">
              <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.5 5H9V3.5C9 1.57 7.43 0 5.5 0S2 1.57 2 3.5V5h-.5C.67 5 0 5.67 0 6.5v4c0 .83.67 1.5 1.5 1.5h8c.83 0 1.5-.67 1.5-1.5v-4c0-.83-.67-1.5-1.5-1.5zM3.5 3.5C3.5 2.4 4.4 1.5 5.5 1.5S7.5 2.4 7.5 3.5V5h-4V3.5z"/>
              </svg>
            </span>
            <span class="url-text">${escapeHtml(displayUrl)}</span>
          </div>
        </div>
      </div>
      <div id="browser-frame-left"></div>
      <div id="browser-frame-right"></div>
      <div id="browser-frame-bottom"></div>
    `,
  };
}

async function injectBrowserChrome(page, title, displayUrl) {
  const chrome = getBrowserChromeOverlay(title, displayUrl);

  await page.evaluate((css) => {
    if (document.getElementById('__pw_browser_chrome_css')) return;
    const style = document.createElement('style');
    style.id = '__pw_browser_chrome_css';
    style.textContent = css;
    (document.head || document.documentElement).appendChild(style);
  }, chrome.css);

  await page.evaluate((html) => {
    if (document.getElementById('browser-chrome-overlay')) return;
    const container = document.createElement('div');
    container.innerHTML = html;
    while (container.firstElementChild) {
      document.body.insertBefore(
        container.firstElementChild,
        document.body.firstChild
      );
    }
  }, chrome.html);
}

/**
 * Generate a WebP copy of an image using cwebp (if available).
 * The Screenshot component serves WebP via <picture> for better performance.
 */
function generateWebP(imagePath) {
  // Skip non-image or GIF files
  if (!/\.(png|jpe?g)$/i.test(imagePath)) return;

  const webpPath = imagePath.replace(/\.(png|jpe?g)$/i, '.webp');
  try {
    require('child_process').execSync(
      `cwebp -q 80 "${imagePath}" -o "${webpPath}"`,
      { stdio: 'pipe' }
    );
    const origSize = Math.round(fs.statSync(imagePath).size / 1024);
    const webpSize = Math.round(fs.statSync(webpPath).size / 1024);
    console.log(`WebP copy saved: ${webpPath} (${origSize} KB → ${webpSize} KB)`);
  } catch {
    console.log('Note: cwebp not found, skipping WebP generation. Install with: brew install webp');
  }
}

// Parse command line arguments
function parseArgs(args) {
  const options = {
    url: null,
    output: null,
    width: 1280,
    height: 800,
    fullpage: false,
    element: null,
    highlight: null,
    execute: null,
    wait: 500,
    dark: false,
    format: 'png',
    quality: 90,
    deviceScale: 2,
    session: null,
    phone: false,
    browserChrome: false,
    title: null,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
      case '--url':
        options.url = args[++i];
        break;
      case '--output':
        options.output = args[++i];
        break;
      case '--width':
        options.width = parseInt(args[++i], 10);
        break;
      case '--height':
        options.height = parseInt(args[++i], 10);
        break;
      case '--fullpage':
        options.fullpage = true;
        break;
      case '--element':
        options.element = args[++i];
        break;
      case '--highlight':
        options.highlight = args[++i];
        break;
      case '--execute':
        options.execute = args[++i];
        break;
      case '--wait':
        options.wait = parseInt(args[++i], 10);
        break;
      case '--dark':
        options.dark = true;
        break;
      case '--format':
        options.format = args[++i];
        break;
      case '--quality':
        options.quality = parseInt(args[++i], 10);
        break;
      case '--deviceScale':
        options.deviceScale = parseFloat(args[++i]);
        break;
      case '--session':
        options.session = args[++i];
        break;
      case '--phone':
        options.phone = true;
        break;
      case '--browserChrome':
        options.browserChrome = true;
        break;
      case '--title':
        options.title = args[++i];
        break;
    }
  }

  return options;
}

async function captureScreenshot(options) {
  // Validate required options
  if (!options.url) {
    console.error('Error: --url is required');
    process.exit(1);
  }
  if (!options.output) {
    console.error('Error: --output is required');
    process.exit(1);
  }

  // Ensure output directory exists
  const outputDir = path.dirname(options.output);
  if (outputDir && !fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Check for session file
  let storageState = undefined;
  if (options.session) {
    const sessionPath = path.join(SESSION_DIR, `${options.session}.json`);
    if (fs.existsSync(sessionPath)) {
      console.log(`Using session: ${options.session}`);
      storageState = sessionPath;
    } else {
      console.error(`Error: Session '${options.session}' not found.`);
      console.error(`Run: node save-session.cjs --session ${options.session}`);
      process.exit(1);
    }
  }

  // Apply phone preset
  if (options.phone) {
    options.width = 375;
    options.height = 812;
  }

  // Launch browser
  const browser = await chromium.launch({
    headless: true,
  });

  try {
    // Create context with viewport settings and optional session
    const context = await browser.newContext({
      viewport: {
        width: options.width,
        height: options.height,
      },
      deviceScaleFactor: options.deviceScale,
      colorScheme: options.dark ? 'dark' : 'light',
      storageState: storageState,
    });

    const page = await context.newPage();

    // Navigate to URL
    console.log(`Navigating to: ${options.url}`);
    await page.goto(options.url, {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });
    
    // Additional wait for dynamic content
    await page.waitForTimeout(1000);

    // Execute custom JavaScript if provided
    if (options.execute) {
      console.log('Executing custom script...');
      await page.evaluate(options.execute);
    }

    // Wait specified time
    if (options.wait > 0) {
      console.log(`Waiting ${options.wait}ms...`);
      await page.waitForTimeout(options.wait);
    }

    if (options.browserChrome) {
      const urlObj = new URL(options.url);
      const displayUrl = urlObj.hostname + urlObj.pathname;
      const pageTitle = options.title || (await page.title());
      console.log('Adding browser chrome...');
      await injectBrowserChrome(page, pageTitle, displayUrl);
      await page.waitForTimeout(300);
    }

    // Add highlight styling if specified
    if (options.highlight) {
      console.log(`Highlighting element: ${options.highlight}`);
      await page.evaluate((selector) => {
        const element = document.querySelector(selector);
        if (element) {
          element.style.outline = '3px solid #FF0000';
          element.style.outlineOffset = '2px';
          element.style.borderRadius = '4px';
        } else {
          console.warn(`Element not found: ${selector}`);
        }
      }, options.highlight);
      // Small delay for style to apply
      await page.waitForTimeout(100);
    }

    // Prepare screenshot options
    const screenshotOptions = {
      path: options.output,
      type: options.format,
      fullPage: options.fullpage,
    };

    if (options.format === 'jpeg') {
      screenshotOptions.quality = options.quality;
    }

    // Take screenshot
    if (options.element) {
      // Screenshot specific element
      console.log(`Capturing element: ${options.element}`);
      const element = await page.$(options.element);
      if (element) {
        await element.screenshot(screenshotOptions);
      } else {
        console.error(`Element not found: ${options.element}`);
        process.exit(1);
      }
    } else {
      // Screenshot full viewport or page
      console.log('Capturing screenshot...');
      await page.screenshot(screenshotOptions);
    }

    console.log(`Screenshot saved: ${options.output}`);
    generateWebP(options.output);
  } finally {
    await browser.close();
  }
}

// Main execution
const args = process.argv.slice(2);

if (args.length === 0 || args.includes('--help')) {
  console.log(`
Tutorial Screenshot Capture Tool

Usage:
  node capture.js --url URL --output path.png [options]

Options:
  --url           URL to capture (required)
  --output        Output file path (required)
  --width         Viewport width (default: 1280)
  --height        Viewport height (default: 800)
  --fullpage      Capture full scrollable page
  --element       CSS selector to capture specific element only
  --highlight     CSS selector to highlight with red border
  --execute       JavaScript to run before capture
  --wait          Milliseconds to wait before capture (default: 500)
  --dark          Use dark color scheme preference
  --format        Output format: png or jpeg (default: png)
  --quality       JPEG quality 0-100 (default: 90)
  --deviceScale   Device scale factor for retina (default: 2)
  --session       Named session for authenticated captures (use save-session.cjs first)
  --phone         Use mobile phone viewport (375x812)
  --browserChrome Add simulated macOS browser chrome around the page
  --title         Custom browser title bar text

Examples:
  # Basic screenshot
  node capture.js --url http://localhost:5173 --output screenshot.png

  # Full page with dark mode
  node capture.js --url http://localhost:5173 --fullpage --dark --output full.png

  # Highlight a button
  node capture.js --url http://localhost:5173 --highlight ".submit-btn" --output highlighted.png

  # Capture specific element
  node capture.js --url http://localhost:5173 --element ".chart" --output chart.png

  # Execute script before capture
  node capture.js --url http://localhost:5173 --execute "document.querySelector('button').click()" --wait 1000 --output after-click.png

  # Capture with saved session (authenticated)
  node capture.js --url https://github.com/new --session github --output github-new-repo.png
`);
  process.exit(0);
}

const options = parseArgs(args);
captureScreenshot(options).catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
