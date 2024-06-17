const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 10000;

const db = require('./model/patron-import');
const cors = require('cors');

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(cors());

app.get('/', (request, response) => {

    // this is going to be an index.html angular
    response.json({info: 'Node.js, Express, and Postgres API'});

});

app.get('/api/patron-import/institutions', db.getInstitutions);
app.get('/api/patron-import/institution/:id', db.getInstitutionById);
app.post('/api/patron-import/institution/:id/toggle', db.toggleInstitution);
app.get('/api/patron-import/institution/:id/patron-count', db.getPatronCountByInstitution);
app.get('/api/patron-import/institution/:id/failed-patrons', db.getFailedUsersByInstitutionId);
app.get('/api/patron-import/institution/:id/failed-patrons/jobs', db.getFailedPatronJobs);

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
