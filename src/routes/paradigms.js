const express = require('express');
const { validationResult } = require('express-validator');
const PARADIGM_VALIDATORS = require('../validation/paradigm-validators');
const QUERIES = require('../utils/queries');
const logger = require('../config/logger-config');

const router = express.Router();


router.get(
    '/',
    (req, res) => {
        const limit = parseInt(req.query.limit, 10) || 10;
        const offset = parseInt(req.query.offset, 10) || 0;
        QUERIES.getParadigms(limit, offset)
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
        PARADIGM_VALIDATORS.idValidator
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        QUERIES.getParadigmById(req.params.id)
            .then(result => {
                if (result.rows.length === 0) {
                    return res.status(404).json({ message: 'Paradigm not found' });
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
        PARADIGM_VALIDATORS.idValidator
    ],
    (req, res) => {
        const limit = parseInt(req.query.limit, 10) || 10;
        const offset = parseInt(req.query.offset, 10) || 0;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        QUERIES.getLanguageByParadigmId(req.params.id, limit, offset)
            .then(result => {
                res.json(result.rows);
            })
            .catch(err => {
                logger.error(err);
            })
    }
)

router.post(
    '/',
    [
        PARADIGM_VALIDATORS.nameNewValidator
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        QUERIES.createParadigm(req.body)
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
        PARADIGM_VALIDATORS.idValidator,
        PARADIGM_VALIDATORS.nameNewValidator
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        QUERIES.updateParadigm(req.params.id, req.body)
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
        PARADIGM_VALIDATORS.idDeleteValidator
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        QUERIES.deleteParadigm(req.params.id)
            .then(result => {
                res.json(result.rows);
            })
            .catch(err => {
                logger.error(err);
            })
    }
);


module.exports = router;
