const express = require('express');

const app = express();
const path = require('path');

app.use(express.static(path.resolve(__dirname, '/client')));

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

module.exports = app;
