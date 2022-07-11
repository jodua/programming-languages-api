const express = require('express');
const { validationResult } = require('express-validator');
const QUERIES = require('../utils/queries');
const COMPANY_VALIDATORS = require('../validation/company-validators');
const logger = require('../config/logger-config');

const router = express.Router();


router.get(
    '/',
    (req, res) => {
        const limit = parseInt(req.query.limit, 10) || 10;
        const offset = parseInt(req.query.offset, 10) || 0;
        QUERIES.getCompanies(limit, offset)
            .then(result => {
                res.json(result.rows);
            })
            .catch(err => {
                logger.error(err);
            });
    }
);

router.get(
    '/:id',
    [
        COMPANY_VALIDATORS.idValidator
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        QUERIES.getCompanyById(req.params.id)
            .then(result => {
                if (result.rows.length === 0) {
                    return res.status(404).json({ message: 'Company not found' });
                }
                res.json(result.rows[0]);
            })
            .catch(err => {
                logger.error(err);
            })
    }
);

router.get(
    '/:id/languages',
    [
        COMPANY_VALIDATORS.idValidator
    ],
    (req, res) => {
        const limit = parseInt(req.query.limit, 10) || 10;
        const offset = parseInt(req.query.offset, 10) || 0;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        QUERIES.getLanguageByCompanyId(req.params.id, limit, offset)
            .then(result => {
                res.json(result.rows);
            })
            .catch(err => {
                logger.error(err);
            });
    }
);

router.post(
    '/',
    [
        COMPANY_VALIDATORS.nameNewValidator
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        QUERIES.createCompany(req.body)
            .then(result => {
                res.json(result.rows);
            })
            .catch(err => {
                logger.error(err);
            })
    }
);

router.put(
    '/:id',
    [
        COMPANY_VALIDATORS.idValidator,
        COMPANY_VALIDATORS.nameNewValidator
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        QUERIES.updateCompany(req.params.id, req.body)
            .then(result => {
                res.json(result.rows);
            })
            .catch(err => {
                logger.error(err);
            })
    }
);

router.delete(
    '/:id',
    [
        COMPANY_VALIDATORS.idDeleteValidator
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }


        QUERIES.deleteCompany(req.params.id)
            .then(result => {
                res.json(result.rows);
            })
            .catch(err => {
                logger.error(err);
            })
    }
);



module.exports = router;