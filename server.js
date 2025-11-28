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

// 🔥 أضف هذا الـ endpoint الجديد
app.get('/test-browser', async (req, res) => {
  console.log('🧪 Testing browser automation...');
  
  try {
    const browser = await chromium.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // اختبار فتح موقع
    await page.goto('https://example.com');
    const title = await page.title();
    
    await browser.close();
    
    console.log('✅ Browser test successful!');
    
    res.json({ 
      success: true, 
      title: title,
      message: '✅ Browser automation is working!'
    });
    
  } catch (error) {
    console.log('❌ Browser test failed:', error.message);
    
    res.json({ 
      success: false, 
      error: error.message,
      message: '❌ Browser automation failed'
    });
  }
});

app.listen(PORT, () => {
  console.log('✅ Server with Playwright started on port', PORT);
  console.log('🔗 Test browser at: /test-browser');
});
