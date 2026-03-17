const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Listening on port 3000..');
});

app.listen(3000, () => {
  console.log('Server started at port 3000!');
});
