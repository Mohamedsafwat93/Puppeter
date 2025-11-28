import express from 'express';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

// استخدام plugin الإخفاء
puppeteer.use(StealthPlugin());

const app = express();
const PORT = process.env.PORT || 3000;

// قراءة الفاريابلز
const {
  FACEBOOK_EMAIL,
  FACEBOOK_PASSWORD,
  FACEBOOK_PAGE,
  HEADLESS_MODE,
  MIN_WAIT_TIME,
  MAX_WAIT_TIME,
  TYPE_DELAY_MIN,
  TYPE_DELAY_MAX,
  CLICK_DELAY_MIN,
  CLICK_DELAY_MAX,
  BETWEEN_SHARES_MIN,
  BETWEEN_SHARES_MAX
} = process.env;

// دوال المساعدة
function randomDelay(min, max) {
  const minVal = parseInt(min) || 100;
  const maxVal = parseInt(max) || 300;
  return Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
}

async function randomWait(min, max) {
  const waitMin = parseInt(min) || 2000;
  const waitMax = parseInt(max) || 5000;
  const waitTime = Math.floor(Math.random() * (waitMax - waitMin + 1)) + waitMin;
  
  console.log(`⏳ Waiting ${waitTime}ms...`);
  await new Promise(resolve => setTimeout(resolve, waitTime));
}

// endpoints
app.get('/', (req, res) => {
  res.json({
    status: '🚀 Server is running!',
    phase: '1 - Basic Server + Variables',
    variables: {
      hasEmail: !!FACEBOOK_EMAIL,
      hasPassword: !!FACEBOOK_PASSWORD,
      hasPage: !!FACEBOOK_PAGE,
      headless: HEADLESS_MODE === 'true'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({
    healthy: true,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// بدء السرفر + اختبار الفاريابلز
app.listen(PORT, async () => {
  console.log('✅ Phase 1: Server started on port', PORT);
  console.log('📋 Environment Variables Check:');
  console.log('📧 Email:', FACEBOOK_EMAIL ? '✅ Set' : '❌ Missing');
  console.log('🔑 Password:', FACEBOOK_PASSWORD ? '✅ Set' : '❌ Missing');
  console.log('📄 Page:', FACEBOOK_PAGE ? '✅ Set' : '❌ Missing');
  console.log('🖥️ Headless:', HEADLESS_MODE);
  
  // اختبار Puppeteer
  try {
    console.log('🔧 Testing Puppeteer...');
    const browser = await puppeteer.launch({
      headless: HEADLESS_MODE === 'true',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    console.log('✅ Puppeteer is working!');
    await browser.close();
  } catch (error) {
    console.log('❌ Puppeteer test failed:', error.message);
  }
});
