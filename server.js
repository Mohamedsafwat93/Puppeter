import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    status: '🚀 Server Working - No Puppeteer!',
    phase: 'Testing without heavy dependencies',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log('✅ Light server started on port', PORT);
});
