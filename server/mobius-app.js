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

    // this is going to be an index.html angular at some point.
    response.json({info: 'MOBIUS Rocks so freakin hard!'});

});

app.get('/api/patron-import/institutions', patronImport.getInstitutions);
app.get('/api/patron-import/institution/:id', patronImport.getInstitutionById);
app.post('/api/patron-import/institution/:id/enable', patronImport.enableInstitution);
app.get('/api/patron-import/institution/:id/metrics', patronImport.getMetricsByInstitutionId);

app.get('/api/patron-import/institution/:id/patron-count', patronImport.getPatronCountByInstitution);
app.get('/api/patron-import/institution/:id/patrons', patronImport.getPatrons);

app.get('/api/patron-import/institution/:id/job/:job_id/failed-patrons', patronImport.getFailedUsersByInstitutionIdAndJobId);
app.get('/api/patron-import/institution/:id/job/:job_id/failed-patrons/download', patronImport.getFailedUsersByInstitutionIdAndJobIdDownloadCSV);
app.get('/api/patron-import/institution/:id/jobs', patronImport.getFailedPatronJobs);

app.get('/api/patron-import/institution/:id/file-patterns', patronImport.getFilePatternsByInstitutionId);
app.post('/api/patron-import/institution/:id/file-pattern', patronImport.setFilePatternByInstitutionId);
app.post('/api/patron-import/institution/:id/file-pattern/delete', patronImport.deleteFilePatternByInstitutionId);

// return this.http.post(`${this.rootPath}/institution/${id}/file-pattern/delete`, filePattern);

app.get('/api/patron-import/institution/:id/file-tracker', patronImport.getFileTrackersByInstitutionId);

app.get('/api/patron-import/institution/:id/patron-groups', patronImport.getPatronGroupsByInstitutionId);
app.post('/api/patron-import/institution/:id/patron-group', patronImport.setPatronGroupByInstitutionId);
app.post('/api/patron-import/institution/:id/patron-group/delete', patronImport.deletePatronGroupByInstitutionId);
app.post('/api/patron-import/institution/:id/patron-groups/priorities', patronImport.setPatronGroupsPriorityByInstitutionId);

app.get('/api/patron-import/patron/by-username/:username', patronImport.getPatronByUsername);

app.post('/api/patron-import/institution/:id/email-success', patronImport.setEmailSuccessByInstitutionId);

// folio api calls
app.get('/api/patron-import/folio/institution/:id/patron-groups', patronImport.getFolioPatronGroupsByInstitutionId);
app.get('/api/patron-import/folio/patron/by-username/:username', patronImport.getFolioPatronByUsername);
app.get('/api/patron-import/folio/patron/by-esid/:esid', patronImport.getFolioPatronByESID);

app.get('/api/patron-import/file-trackers', patronImport.getFileTrackers);

// system level api calls.
app.get('/api/system/whoami', patronImport.systemWhoAmI);
app.get('/api/system/pwd', patronImport.pwd);


app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
