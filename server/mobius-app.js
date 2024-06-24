const express = require('express');
const patronImport = require('./model/patron-import');
const cors = require('cors');

// https://www.npmjs.com/package/axios
// Make XMLHttpRequests from the browser
// Make http requests from node.js
// Supports the Promise API
// Intercept request and response
// Transform request and response data
// Cancel requests
// Automatic transforms for JSON data
// Automatic data object serialization to multipart/form-data and x-www-form-urlencoded body encodings
// Client side support for protecting against XSRF

const app = express();
const port = 10000;

app.use(cors());

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);


app.get('/', (request, response) => {

    // this is going to be an index.html angular
    response.json({info: 'Node.js, Express, and Postgres API'});

});

app.get('/api/patron-import/institutions', patronImport.getInstitutions);
app.get('/api/patron-import/institution/:id', patronImport.getInstitutionById);
app.post('/api/patron-import/institution/:id/toggle', patronImport.toggleInstitution);
app.get('/api/patron-import/institution/:id/patron-count', patronImport.getPatronCountByInstitution);
app.get('/api/patron-import/institution/:id/job/:job_id/failed-patrons', patronImport.getFailedUsersByInstitutionIdAndJobId);
app.get('/api/patron-import/institution/:id/job/:job_id/failed-patrons/download', patronImport.getFailedUsersByInstitutionIdAndJobIdDownloadCSV);
app.get('/api/patron-import/institution/:id/jobs', patronImport.getFailedPatronJobs);
app.get('/api/patron-import/institution/:id/jobs', patronImport.getFailedPatronJobs);
app.get('/api/patron/by-username/:username', patronImport.getPatronByUsername);
app.get('/api/folio/patron/by-username/:username', patronImport.getFolioPatronByUsername);
app.get('/api/system/whoami', patronImport.systemWhoAmI);
app.get('/api/system/pwd', patronImport.pwd);

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
