const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const db = require('./model/patron-import');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

app.get('/api/patron-import/institutions', db.getInstitutions);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
