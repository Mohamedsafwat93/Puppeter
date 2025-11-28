import express from 'express';
import { chromium } from 'playwright';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    status: '🚀 Server with Playwright!',
    phase: 'Testing lightweight browser automation',
    timestamp: new Date().toISOString()
  });
});

app.get('/test-browser', async (req, res) => {
  try {
    const browser = await chromium.launch({ 
      headless: true 
    });
    const page = await browser.newPage();
    await page.goto('https://example.com');
    const title = await page.title();
    await browser.close();
    
    res.json({ 
      success: true, 
      title: title,
      message: '✅ Browser automation working!'
    });
  } catch (error) {
    res.json({ 
      success: false, 
      error: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log('✅ Server with Playwright started on port', PORT);
});
