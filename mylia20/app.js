const express = require('express');
const path = require('path')
const app = express();
const PORT = 3000;

const staticFiles = path.join(__dirname, 'static');
app.use(express.static(staticFiles));

app.get('/', (req, res) => {
  res.sendFile(path.join(staticFiles, '/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});