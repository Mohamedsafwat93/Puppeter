import express from 'express';
import puppeteer from 'puppeteer-core';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/test-real-browser', async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      executablePath: '/usr/bin/chromium-browser', // المتصفح الموجود
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox', 
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--single-process'
      ]
    });
    
    const page = await browser.newPage();
    await page.goto('https://example.com');
    const title = await page.title();
    await browser.close();
    
    res.json({ 
      success: true, 
      title: title,
      message: '✅ Real browser is working!' 
    });
  } catch (error) {
    res.json({ 
      success: false, 
      error: error.message 
    });
  }
});
