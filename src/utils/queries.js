const client = require('../config/postgres-config');


// Language queries
const getLanguages = (limit, offset) => {
    const sqlQuery = `
    SELECT 
        *,
        language.name,
        company.name as company_name,
        language.id
    FROM 
        language 
    INNER JOIN 
        company ON company.id = language.company_id
    LIMIT 
        $1
    OFFSET 
        $2
    `;
    const values = [limit, offset];
    return client.query(sqlQuery, values);
}

const getLanguageById = (id) => {
    const sqlQuery = `
    SELECT 
        *,
        language.name,
        company.name as company_name,
        language.id
    FROM 
        language 
    INNER JOIN 
        company ON company.id = language.company_id 
    WHERE 
        language.id = $1
    `;
    const values = [id];
    return client.query(sqlQuery, values);
}

const getLanguageByName = (name) => {
    const sqlQuery = `
    SELECT 
        *
    FROM 
        language 
    WHERE
        language.name = $1
    `;
    const values = [name];
    return client.query(sqlQuery, values);
}

const getLanguageByCompanyId = (id, limit, offset) => {
    const sqlQuery = `
    SELECT 
        *,
        language.name,
        company.name as company_name 
    FROM 
        language 
    INNER JOIN 
        company ON company.id = language.company_id 
    WHERE 
        language.company_id = $1
    LIMIT 
        $2
    OFFSET 
        $3
    `;
    const values = [id, limit, offset];
    return client.query(sqlQuery, values);
}

const getLanguageByParadigmId = (id, limit, offset) => {
    const sqlQuery = `
    SELECT
        paradigm.name as paradigm_name,
        language.name as language_name,
        language.id as language_id 
    FROM 
        language_paradigm 
    INNER JOIN
        paradigm ON paradigm.id = language_paradigm.paradigm_id
    INNER JOIN 
        language ON language.id = language_paradigm.language_id 
    WHERE 
        language_paradigm.paradigm_id = $1
    LIMIT 
        $2
    OFFSET 
        $3
    `;
    const values = [id, limit, offset];
    return client.query(sqlQuery, values);
}

const createLanguage = (body) => {
    const sqlQuery = `
    INSERT INTO 
        language (
            name, 
            description, 
            release_date, 
            version, 
            company_id
            ) 
    VALUES 
        ($1, $2, $3, $4, $5) 
    RETURNING 
        *
    `;
    const values = [body.name, body.description, body.release_date, body.version, body.company_id];
    return client.query(sqlQuery, values);
}

const assignParadigmToLanguage = (languageId, paradigmId) => {
    const sqlQuery = `
    INSERT INTO 
        language_paradigm (
            language_id,
            paradigm_id) 
    VALUES 
        ($1, $2) 
    RETURNING 
        *
    `;
    const values = [languageId, paradigmId];
    return client.query(sqlQuery, values);
}

const deleteParadigmsFromLanguage = (id) => {
    const sqlQuery = `
    DELETE FROM 
        language_paradigm 
    WHERE 
        language_id = $1 
    RETURNING 
        *
    `;
    const values = [id];
    return client.query(sqlQuery, values);
}

const deleteLanguage = (id) => {
    const sqlQuery = `
    DELETE FROM 
        language 
    WHERE 
        id = $1 
    RETURNING 
        *
    `;
    const values = [id];
    return client.query(sqlQuery, values);
}

const updateLanguage = (id, body) => {
    const sqlQuery = `
    UPDATE 
        language 
    SET 
        name = $1, 
        description = $2, 
        release_date = $3, 
        version = $4, 
        company_id = $5 
    WHERE 
        id = $6 
    RETURNING 
        *
    `;
    const values = [body.name, body.description, body.release_date, body.version, body.company_id, id];
    return client.query(sqlQuery, values);
}


// Paradigm queries
const getParadigms = (limit, offset) => {
    const sqlQuery = `
    SELECT 
        * 
    FROM 
        paradigm
    LIMIT 
        $1
    OFFSET
        $2
    `;
    const values = [limit, offset];
    return client.query(sqlQuery, values);
}

const getParadigmById = (id) => {
    const sqlQuery = `
    SELECT 
        * 
    FROM 
        paradigm 
    WHERE 
        id = $1
    `;
    const values = [id];
    return client.query(sqlQuery, values);
}

const getParadigmByName = (name) => {
    const sqlQuery = `
    SELECT 
        * 
    FROM 
        paradigm 
    WHERE 
        name = $1
    `;
    const values = [name];
    return client.query(sqlQuery, values);
}

const getParadigmByLanguageId = (id) => {
    const sqlQuery = `
    SELECT 
        * 
    FROM 
        language_paradigm 
    INNER JOIN 
        paradigm ON paradigm.id = language_paradigm.paradigm_id 
    WHERE 
        language_paradigm.language_id = $1`;
    const values = [id];
    return client.query(sqlQuery, values);
}

const createParadigm = (body) => {
    const sqlQuery = `
    INSERT INTO 
        paradigm (
            name
            ) 
    VALUES 
        ($1) 
    RETURNING 
        *`;
    const values = [body.name];
    return client.query(sqlQuery, values);
}

const deleteParadigm = (id) => {
    const sqlQuery = `
    DELETE FROM 
        paradigm 
    WHERE 
        id = $1 
    RETURNING 
        *
    `;
    const values = [id];
    return client.query(sqlQuery, values);
}

const updateParadigm = (id, body) => {
    const sqlQuery = `
    UPDATE 
        paradigm 
    SET 
        name = $1 
    WHERE 
        id = $2 
    RETURNING 
        *
    `;
    const values = [body.name, id];
    return client.query(sqlQuery, values);
}


// Company queries
const getCompanies = (limit, offset) => {
    const sqlQuery = `
    SELECT 
        * 
    FROM 
        company
    LIMIT 
        $1
    OFFSET
        $2
    `;
    const values = [limit, offset];
    return client.query(sqlQuery, values);
}

const getCompanyById = (id) => {
    const sqlQuery = `
    SELECT 
        * 
    FROM 
        company 
    WHERE 
        id = $1
    `;
    const values = [id];
    return client.query(sqlQuery, values);
}

const createCompany = (body) => {
    const sqlQuery = `
    INSERT INTO 
        company (
            name
            ) 
    VALUES 
        ($1) 
    RETURNING 
        *
    `;
    const values = [body.name];
    return client.query(sqlQuery, values);
}

const deleteCompany = (id) => {
    const sqlQuery = `
    DELETE FROM 
        company 
    WHERE 
        id = $1 
    RETURNING 
        *
    `;
    const values = [id];
    return client.query(sqlQuery, values);
}

const updateCompany = (id, body) => {
    const sqlQuery = `
    UPDATE 
        company 
    SET 
        name = $1 
    WHERE 
        id = $2 
    RETURNING 
        *
    `;
    const values = [body.name, id];
    return client.query(sqlQuery, values);
}



module.exports = {
    getLanguages,
    getLanguageById,
    getLanguageByCompanyId,
    getLanguageByParadigmId,
    getLanguageByName,
    createLanguage,
    updateLanguage,
    assignParadigmToLanguage,
    deleteParadigmsFromLanguage,
    deleteLanguage,
    getParadigms,
    getParadigmById,
    getParadigmByName,
    getParadigmByLanguageId,
    createParadigm,
    updateParadigm,
    deleteParadigm,
    getCompanies,
    getCompanyById,
    createCompany,
    updateCompany,
    deleteCompany
}