const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
});

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

const toggleInstitution = (request, response) => {
    const id = parseInt(request.params.id);
    const {enabled} = request.body;
    console.log(`id: ${id}, enabled: ${enabled}`);
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

const getFailedUsersByInstitutionId = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query(`
        SELECT distinct ir.job_id, j.start_time, j.stop_time, ir.institution_id
        FROM patron_import.import_response ir
                 join patron_import.job j on ir.job_id = j.id
                 join patron_import.import_failed_users ifu on ir.id = ifu.import_response_id
        where ir.institution_id = $1 
        order by ir.institution_id;
    `, [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
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

    pool.query('SELECT count(*) FROM patron_import.patron p where p.institution_id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });

};

module.exports = {
    getInstitutions,
    getInstitutionById,
    toggleInstitution,
    getFailedUsersByInstitutionId,
    getPatronCountByInstitution,
    getJobs: getFailedPatronJobs
};