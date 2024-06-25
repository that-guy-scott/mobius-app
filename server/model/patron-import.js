const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'foliopatronimport',
    host: 'localhost',
    database: 'foliopatronimport',
    password: 'WNM6ymdkngzhv_dep',
    port: 5432,
});

const {Parser} = require('json2csv');

const getInstitutions = (request, response) => {
    pool.query('SELECT * FROM patron_import.institution i ORDER BY i.name', (error, results) => {
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
        SELECT p.job_id,
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
                 left join patron_import.patron p
                           on p.externalsystemid = ifu.externalsystemid and p.username = ifu.username
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
        SELECT p.job_id,
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
                 LEFT JOIN patron_import.patron p
                           ON ifu.externalsystemid = p.externalsystemid AND ifu.username = p.username
        WHERE ir.institution_id = $1
          AND ir.job_id = $2
        ORDER BY ifu.id;
    `, [id, job_id], (error, results) => {
        if (error) {
            throw error;
        }

        const fields = ['job_id', 'id', 'firstname', 'lastname', 'barcode', 'username', 'externalsystemid', 'errormessage'];
        const json2csvParser = new Parser({fields});
        const csv = json2csvParser.parse(results.rows);

        const currentTime = new Date().toISOString().replace(/:/g, '-').replace(/\./g, '-').replace('T', '_').replace('Z', '');
        const fileName = `${id}_${job_id}_${currentTime}_failed_patrons.csv`;

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
            response.status(200).json(results.rows);
        });

};

const getPatronGroupsByInstitutionId = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query(`
        SELECT *
        FROM patron_import.ptype_mapping pt
        where pt.institution_id = $1
    `, [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });

};

const getFilePatternsByInstitutionId = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query(`
        SELECT *
        FROM patron_import.file f
        where f.institution_id = $1
    `, [id], (error, results) => {
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
            SELECT j.id, j.stop_time,
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
        response.status(500).json({ error: 'Internal Server Error' });
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

const {exec} = require('child_process');
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
        response.status(200).json({output: stdout});
    });
};

const getFolioPatronByUsername = (request, response) => {
    const username = request.params.username;
    const command = 'patron-data-to-folio-import/patron-import.pl --config=patron-data-to-folio-import/patron-import.conf --getFolioUserByUsername=' + username;
    executeCommand(command, response);
};

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
    getFolioPatronByUsername,
    getFilePatternsByInstitutionId,
    getPatrons,
    getMetricsByInstitutionId,
    getPatronGroupsByInstitutionId
};