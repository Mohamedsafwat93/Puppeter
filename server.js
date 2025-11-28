import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    status: '🚀 Simple Server Working!',
    phase: 'Testing deployment'
  });
});

app.listen(PORT, () => {
  console.log('✅ Simple server started on port', PORT);
});
