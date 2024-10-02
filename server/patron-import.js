const fs = require('fs');
const path = require('path');
const multer = require('multer');
const Pool = require('pg').Pool;
const { spawn, exec } = require('child_process');
const { promisify } = require('util');

const BASE_UPLOAD_DIR = path.join(__dirname, 'uploads');
// const pool = new Pool({
//     user: 'foliopatronimport',
//     host: '192.168.11.211',
//     database: 'foliopatronimport',
//     password: 'WNM6ymdkngzhv_dep',
//     port: 5432,
// });

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
});

const {Parser} = require('json2csv');

const getInstitutions = (request, response) => {
    pool.query('SELECT * FROM patron_import.institution i where i.id > 1 ORDER BY i.name', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const getInstitutionById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM patron_import.institution i WHERE i.id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows[0]);
    });

};

const enableInstitution = (request, response) => {
    const id = parseInt(request.params.id);
    const {enabled} = request.body;
    pool.query(
        'UPDATE patron_import.institution SET enabled = $1 WHERE id = $2',
        [enabled, id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).send({message: `Institution modified with ID: ${id}`});
        }
    );
}

const getFailedUsersByInstitutionIdAndJobId = (request, response) => {

    const id = parseInt(request.params.id);
    const job_id = parseInt(request.params.job_id);

    pool.query(`
        SELECT ir.job_id,
               p.job_id as "patron_job_id",
               p.id,
               p.firstname,
               p.lastname,
               p.barcode,
               ifu.username,
               ifu.externalsystemid,
               ifu.errormessage,
               p.raw_data
        FROM patron_import.import_response ir
                 join patron_import.import_failed_users ifu on ifu.import_response_id = ir.id
                 join patron_import.patron p on p.externalsystemid = ifu.externalsystemid and p.username = ifu.username
        where ir.institution_id = $1
          and ir.job_id = $2
        order by ifu.id;
    `, [id, job_id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });

};

const getFailedUsersByInstitutionIdAndJobIdDownloadCSV = (request, response) => {

    const id = parseInt(request.params.id);
    const job_id = parseInt(request.params.job_id);

    pool.query(`
        SELECT i.name,
               p.job_id,
               p.id,
               p.firstname,
               p.lastname,
               p.barcode,
               ifu.username,
               ifu.externalsystemid,
               ifu.errormessage,
               p.raw_data
        FROM patron_import.import_response ir
                 JOIN patron_import.import_failed_users ifu ON ir.id = ifu.import_response_id
                 JOIN patron_import.institution i on ir.institution_id = i.id
                 LEFT JOIN patron_import.patron p
                           ON ifu.externalsystemid = p.externalsystemid AND ifu.username = p.username
        WHERE ir.institution_id = $1
          AND ir.job_id = $2
        ORDER BY ifu.id;
    `, [id, job_id], (error, results) => {
        if (error) {
            throw error;
        }

        const fields = ['name', 'job_id', 'id', 'firstname', 'lastname', 'barcode', 'username', 'externalsystemid', 'errormessage', 'raw_data'];
        const json2csvParser = new Parser({fields});
        const csv = json2csvParser.parse(results.rows);

        const currentTime = new Date().toISOString().replace(/:/g, '_').replace(/\./g, '_').replace('T', '_').replace('Z', '');

        const institutionName = results.rows[0].name;
        // replace spaces with underscores
        const institutionNameUnderscore = institutionName.replace(/ /g, '_');

        const fileName = `${institutionNameUnderscore}_job${job_id}_${currentTime}_failed_patrons.csv`;

        response.header('Content-Type', 'text/csv');
        response.attachment(fileName);
        response.send(csv);

    });
};

const getPatronCountByInstitution = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT count(*) FROM patron_import.patron p where p.institution_id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows[0]);
    });

};

const getFailedPatronJobs = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query(
        `SELECT distinct ir.job_id, j.start_time, j.stop_time
         FROM patron_import.import_response ir
                  join patron_import.job j on ir.job_id = j.id
                  join patron_import.import_failed_users ifu on ir.id = ifu.import_response_id
         where ir.institution_id = $1
         order by j.start_time desc;
        `, [id], (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        });

};

const getPatronByUsername = (request, response) => {

    const username = request.params.username;

    pool.query(
        `SELECT *
         FROM patron_import.patron p
         WHERE p.username = $1;
        `, [username], (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows[0]);
        });

};

const getPatronGroupsByInstitutionId = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query(`
        SELECT *
        FROM patron_import.ptype_mapping pt
        where pt.institution_id = $1
        order by pt.priority
    `, [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });

};

const setPatronGroupByInstitutionId = (request, response) => {

    const id = parseInt(request.params.id);
    const patronGroupForm = request.body;

    pool.query(
        `INSERT INTO patron_import.ptype_mapping (institution_id, ptype, foliogroup, priority)
         VALUES ($1, $2, $3, $4)`,
        [id, patronGroupForm.ptype, patronGroupForm.folioPatronGroup, patronGroupForm.priority],
        (error, results) => {
            if (error) {
                throw error;
            }
            getPatronGroupsByInstitutionId(request, response);
        }
    );
}

const setPatronGroupsPriorityByInstitutionId = (request, response) => {

    const id = parseInt(request.params.id);
    const patronGroups = request.body;

    patronGroups.forEach((patronGroup, index) => {
        pool.query(
            `UPDATE patron_import.ptype_mapping
             SET priority = $1
             WHERE id = $2
               AND institution_id = $3`,
            [patronGroup.priority, patronGroup.id, id],
            (error, results) => {
                if (error) {
                    throw error;
                }
            }
        );
    });


    response.status(200).json({});

}

const deletePatronGroupByInstitutionId = (request, response) => {

    const id = parseInt(request.params.id);
    const patronGroup = request.body;

    pool.query(
        `DELETE
         FROM patron_import.ptype_mapping
         WHERE id = $1
           AND institution_id = $2;`,
        [patronGroup.id, id],
        (error, results) => {
            if (error) {
                throw error;
            }

            getPatronGroupsByInstitutionId(request, response);
        }
    );
}

const getFilePatternsByInstitutionId = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query(`
        SELECT folder.path as "path", f.*
        FROM patron_import.file f
                 join patron_import.institution i on f.institution_id = i.id
                 join patron_import.institution_folder_map ifm on i.id = ifm.institution_id
                 join patron_import.folder folder on ifm.folder_id = folder.id
        where f.institution_id = $1
    `, [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });

};

const getFileTrackersByInstitutionId = (request, response) => {

    const id = parseInt(request.params.id);

    pool.query(`SELECT ft.id,
                       ft.job_id,
                       ft.institution_id,
                       ft.path,
                       ft.size,
                       to_timestamp(ft.lastmodified)            as lastmodified,
                       job.stop_time,
                       COALESCE(ft.contents IS NOT NULL, FALSE) AS contents
                FROM patron_import.file_tracker ft
                         join patron_import.job job on job.id = ft.job_id
                where ft.institution_id = $1
                order by ft.id desc;
        `, [id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        });

};

const getFileContentsByFileId = (request, response) => {

    const file_id = parseInt(request.params.id);

    pool.query(`select ft.path,
                       ft.contents,
                       TO_CHAR(TO_TIMESTAMP(ft.lastmodified), 'MM_DD_YYYY') AS lastmodified
                from patron_import.file_tracker ft
                where ft.id = $1;`, [file_id], (error, results) => {
        if (error) {
            throw error;
        }

        const path = results.rows[0].path;
        const lastmodified = results.rows[0].lastmodified;

        let filename = path.split('/').pop();

        // if there is a file extension, add the lastmodified date to the filename before the extension
        if (filename.includes('.')) {
            const filenameParts = filename.split('.');
            const extension = filenameParts.pop();
            const name = filenameParts.join('.');
            filename = `${name}_${lastmodified}.${extension}`;
        } else {
            filename = `${filename}_${lastmodified}`;
        }

        response.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        response.header('Content-Type', 'text/plain');
        response.send(results.rows[0].contents);


    });
};

const setEmailSuccessByInstitutionId = (request, response) => {

    const id = parseInt(request.params.id);
    const emailSuccess = request.body.data;

    pool.query(
        `UPDATE patron_import.institution
         SET emailsuccess = $1
         WHERE id = $2`,
        [emailSuccess, id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        }
    );
}

const getFileTrackers = (request, response) => {

    pool.query(`SELECT ft.id,
                       ft.job_id,
                       ft.institution_id,
                       ft.path,
                       ft.size,
                       to_timestamp(ft.lastmodified)            AS lastmodified,
                       job.stop_time,
                       COALESCE(ft.contents IS NOT NULL, FALSE) AS contents
                FROM patron_import.file_tracker ft
                         join patron_import.job job on job.id = ft.job_id
                ORDER BY ft.id DESC;`,
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        });


};

const getMetricsByInstitutionId = async (request, response) => {
    try {
        const id = parseInt(request.params.id);
        const metrics = {};

        // Query to get total patrons
        const totalPatronsResult = await pool.query(`
            SELECT count(p.id) as count
            FROM patron_import.patron p
            WHERE p.institution_id = $1
        `, [id]);
        metrics.totalPatrons = totalPatronsResult.rows[0].count;

        // Query to get the last import date
        const lastImportDateResult = await pool.query(`
            SELECT MAX(j.stop_time) as last_stop_time
            FROM patron_import.job j
                     JOIN patron_import.import_response ir ON j.id = ir.job_id
            WHERE ir.institution_id = $1
        `, [id]);
        metrics.lastImportDate = lastImportDateResult.rows[0].last_stop_time;

        // Query to get the last 5 import totals
        const last5importTotalsResult = await pool.query(`
            SELECT j.id,
                   j.stop_time,
                   sum(ir.created) as "created",
                   sum(ir.updated) as "updated",
                   sum(ir.failed)  as "failed",
                   sum(ir.total)   as "total"
            FROM patron_import.job j
                     join patron_import.import_response ir on j.id = ir.job_id
            where ir.institution_id = $1
            group by ir.job_id, j.stop_time, j.id
            order by ir.job_id desc
            limit 5;
        `, [id]);
        metrics.last5importTotals = last5importTotalsResult.rows;

        response.status(200).json(metrics);
    } catch (error) {
        console.error('Failed to fetch metrics:', error);
        response.status(500).json({error: 'Internal Server Error'});
    }
};

const setFilePatternByInstitutionId = (request, response) => {

    const id = parseInt(request.params.id);
    const name = request.body.name;
    const pattern = request.body.pattern;

    pool.query(
        `INSERT INTO patron_import.file (institution_id, name, pattern)
         VALUES ($1, $2, $3)`,
        [id, name, pattern],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        }
    );
}

const deleteFilePatternByInstitutionId = (request, response) => {

    const id = parseInt(request.params.id);
    const file_id = request.body.id;

    pool.query(
        `DELETE
         FROM patron_import.file
         WHERE institution_id = $1
           AND id = $2;`,
        [id, file_id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        }
    );
}

const getFullPathByInstitutionId = (id) => {
    return new Promise((resolve, reject) => {
        let query = `
            SELECT f.path || '/patron-import/' || i.abbreviation || '/import' AS full_path
            FROM patron_import.institution i
                     JOIN patron_import.institution_folder_map ifm ON i.id = ifm.institution_id
                     JOIN patron_import.folder f ON ifm.folder_id = f.id
            WHERE i.id = $1;`;

        pool.query(query, [id], (error, results) => {
            if (error) {
                reject(error);
            } else if (results.rows.length === 0) {
                reject(new Error('No results found for the given institution ID'));
            } else {
                resolve(results.rows[0].full_path);
            }
        });
    });
};

const uploadPatronFileByInstitutionId = async (request, response) => {
    const id = parseInt(request.params.id);
    console.log('Uploading file for institution ID:', id);

    try {
        const full_path = await getFullPathByInstitutionId(id);

        // Configure multer for file upload
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                const uploadPath = full_path; // This line is now fixed
                console.log('Upload path:', uploadPath);
                fs.mkdirSync(uploadPath, {recursive: true});
                cb(null, uploadPath);
            },
            filename: (req, file, cb) => {
                console.log('Generated filename:', file.originalname);
                cb(null, file.originalname);
            }
        });

        const upload = multer({storage: storage}).single('file');
        console.log('Multer configured');

        upload(request, response, (err) => {
            console.log('Upload started');
            if (err) {
                console.error('Upload error:', err);
                return response.status(500).json({error: 'File upload failed', details: err.message});
            }

            if (!request.file) {
                console.log('No file uploaded');
                return response.status(400).json({error: 'No file uploaded'});
            }

            console.log('File uploaded successfully');
            response.status(200).json({message: 'File uploaded successfully'});
        });
    } catch (error) {
        console.error('Error:', error);
        response.status(500).json({error: 'Internal Server Error', details: error.message});
    }

};

const getPatrons = (request, response) => {

    const id = parseInt(request.params.id);

    pool.query(`
        SELECT *
        FROM patron_import.patron p
                 LEFT JOIN patron_import.address a on p.id = a.patron_id
        where p.institution_id = $1
        order by p.id`, [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });

};


// !!!! PLEASE NOTE !!!!
// I think this could be done via a REST API call to the folio server instead of a system call.
// You have to symlink the patron-data-to-folio-import/ in the server/ directory in the angular app.
// patron-data-to-folio-import/api.pl --config=patron-data-to-folio-import/patron-import.conf --getFolioUserByUsername=

const executeCommand = (command, response) => {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            response.status(500).json({error: error.message});
            return;
        }
        if (stderr) {
            response.status(500).json({error: stderr});
            return;
        }

        try {
            JSON.parse(stdout);
        } catch (e) {
            response.status(500).json({error: e.message});
            return;
        }

        response.status(200).json({output: stdout});
    });
};

const executeCommandJSON = (command, response) => {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            response.status(500).json({error: error.message});
            return;
        }
        if (stderr) {
            response.status(500).json({error: stderr});
            return;
        }
        response.status(200).json(JSON.parse(stdout));
    });
};

const getFolioPatronByUsername = (request, response) => {
    const username = request.params.username;
    const command = 'patron-data-to-folio-import/api.pl --config=patron-data-to-folio-import/patron-import.conf --getFolioUserByUsername=' + username;
    executeCommandJSON(command, response);
};

const getFolioPatronByESID = (request, response) => {
    const esid = request.params.esid;
    const command = 'patron-data-to-folio-import/api.pl --config=patron-data-to-folio-import/patron-import.conf --getFolioUserByESID=' + esid;
    executeCommandJSON(command, response);
};

const getFolioPatronGroupsByInstitutionId = (request, response) => {
    const institution_id = request.params.id;
    const command = 'patron-data-to-folio-import/api.pl --config=patron-data-to-folio-import/patron-import.conf --getFolioPatronGroupByInstitutionId=' + institution_id;
    executeCommandJSON(command, response);
};

const processImportByInstitutionIdOLD = (request, response) => {

    const id = parseInt(request.params.id);
    const institutionId = parseInt(request.query.institution_id);

    console.log('I see your importing some patrons for #' + institutionId);

    // const command = 'patron-data-to-folio-import/api.pl --config=patron-data-to-folio-import/patron-import.conf --processInstitutionId=' + id;
    const command = 'patron-data-to-folio-import/api.pl';
    const args = ['--config=patron-data-to-folio-import/patron-import.conf', '--processInstitutionId=' + institutionId];
    executeCommandStream(command, args, response);

}

// =========== Data Streams =================================================

const ping = (request, response) => {
    const command = 'ping';
    const args = ['google.com', '-c', '10'];  // Limit to 4 pings for example
    executeCommandStream(command, args, response);
};

const executeCommandStreamOLD = (command, args, response) => {
    console.log(`Executing command: ${command} ${args.join(' ')}`);

    response.setHeader('Content-Type', 'text/event-stream');
    response.setHeader('Cache-Control', 'no-cache');
    response.setHeader('Connection', 'keep-alive');

    const child = spawn(command, args);

    child.stdout.on('data', (data) => {
        console.log(`Sending data: ${data}`);
        response.write(`data: ${data}\n\n`);
    });

    child.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        response.write(`data: error: ${data}\n\n`);
    });

    child.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
        response.write(`data: Command completed with code ${code}\n\n`);
        response.end();
    });

    response.on('close', () => {
        console.log('Connection closed');
        child.kill();
    });
};

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
const processImportByInstitutionId = (request, response) => {
    const id = parseInt(request.params.id, 10);
    const institutionId = parseInt(request.query.institution_id, 10);

    if (isNaN(id) || isNaN(institutionId)) {
        response.status(400).send('Invalid ID or Institution ID');
        return;
    }

    console.log(`I see you're importing some patrons for #${institutionId}`);

    const command = 'patron-data-to-folio-import/api.pl';
    const args = [
        '--config=patron-data-to-folio-import/patron-import.conf',
        `--processInstitutionId=${institutionId}`,
    ];

    executeCommandStream(command, args, response);
};

const executeCommandStream = (command, args, response) => {
    console.log(`Executing command: ${command} ${args.join(' ')}`);

    response.setHeader('Content-Type', 'text/event-stream');
    response.setHeader('Cache-Control', 'no-cache');
    response.setHeader('Connection', 'keep-alive');

    const child = spawn(command, args);

    child.stdout.on('data', (data) => {
        const message = data.toString();
        console.log(`Sending data: ${message}`);
        response.write(`data: ${message}\n\n`);
    });

    child.stderr.on('data', (data) => {
        const error = data.toString();
        console.error(`stderr: ${error}`);
        response.write(`data: error: ${error}\n\n`);
    });

    child.on('error', (err) => {
        console.error(`Failed to start subprocess: ${err}`);
        response.write(`data: error: ${err.message}\n\n`);
        response.end();
    });

    child.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
        response.write(`data: Command completed with code ${code}\n\n`);
        response.end();
    });

    response.on('close', () => {
        console.log('Connection closed');
        child.kill();
    });
};



// =========== END Data Streams =============================================

const systemWhoAmI = (request, response) => {
    const command = 'whoami';
    executeCommand(command, response);
};

const pwd = (request, response) => {
    const command = 'pwd';
    executeCommand(command, response);
};

module.exports = {
    systemWhoAmI,
    pwd,
    getInstitutions,
    getInstitutionById,
    enableInstitution,
    getFailedUsersByInstitutionIdAndJobId,
    getFailedUsersByInstitutionIdAndJobIdDownloadCSV,
    getPatronCountByInstitution,
    getFailedPatronJobs,
    getPatronByUsername,
    getFilePatternsByInstitutionId,
    getFileTrackersByInstitutionId,
    getPatrons,
    getMetricsByInstitutionId,
    getPatronGroupsByInstitutionId,
    getFolioPatronByUsername,
    getFolioPatronByESID,
    getFolioPatronGroupsByInstitutionId,
    setPatronGroupByInstitutionId,
    setPatronGroupsPriorityByInstitutionId,
    deletePatronGroupByInstitutionId,
    getFileTrackers,
    setEmailSuccessByInstitutionId,
    setFilePatternByInstitutionId,
    deleteFilePatternByInstitutionId,
    getFileContentsByFileId,
    uploadPatronFileByInstitutionId,
    processImportByInstitutionId,
    ping
};