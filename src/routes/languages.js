const express = require('express');
const { validationResult } = require('express-validator');
const QUERIES = require('../utils/queries');
const LANGUAGE_VALIDATORS = require('../validation/language-validators');
const logger = require('../config/logger-config');

const router = express.Router();


router.get(
    '/',
    (req, res) => {
        const limit = parseInt(req.query.limit, 10) || 10;
        const offset = parseInt(req.query.offset, 10) || 0;
        QUERIES.getLanguages(limit, offset)
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
        LANGUAGE_VALIDATORS.idValidator
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        QUERIES.getLanguageById(req.params.id)
            .then(result => {
                if (result.rows.length === 0) {
                    return res.status(404).json({ message: 'Language not found' });
                }
                res.json(result.rows[0]);
            })
            .catch(err => {
                logger.error(err);
            })
    }
);

router.get(
    '/:id/paradigms',
    [
        LANGUAGE_VALIDATORS.idValidator
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        QUERIES.getParadigmByLanguageId(req.params.id)
            .then(result => {
                if (result.rows.length === 0) {
                    return res.status(404).json({ message: 'Paradigm not found' });
                }
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
        LANGUAGE_VALIDATORS.nameNewValidator,
        LANGUAGE_VALIDATORS.descriptionNewValidator,
        LANGUAGE_VALIDATORS.releaseDateNewValidator,
        LANGUAGE_VALIDATORS.versionNewValidator,
        LANGUAGE_VALIDATORS.paradigmsNewValidator,
        LANGUAGE_VALIDATORS.paradigmNewValidator,
        LANGUAGE_VALIDATORS.companyNewValidator
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        let newLanguageId;

        QUERIES.createLanguage(req.body)
            .then(result => {
                newLanguageId = result.rows[0].id;
                req.body.paradigms.forEach(paradigm => {
                    QUERIES.assignParadigmToLanguage(newLanguageId, paradigm)
                        .catch(err => {
                            logger.error(err);
                        });
                });
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
        LANGUAGE_VALIDATORS.nameNewValidator,
        LANGUAGE_VALIDATORS.descriptionNewValidator,
        LANGUAGE_VALIDATORS.releaseDateNewValidator,
        LANGUAGE_VALIDATORS.versionNewValidator,
        LANGUAGE_VALIDATORS.paradigmsNewValidator,
        LANGUAGE_VALIDATORS.paradigmNewValidator,
        LANGUAGE_VALIDATORS.companyNewValidator
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        QUERIES.updateLanguage(req.params.id, req.body)
            .then(result => {
                QUERIES.deleteParadigmsFromLanguage(req.params.id)
                    .then(() => {
                        req.body.paradigms.forEach(paradigm => {
                            QUERIES.assignParadigmToLanguage(paradigm, req.params.id)
                                .catch(err => {
                                    logger.error(err);
                                });
                        });
                        res.json(result.rows);
                    })
                    .catch(err => {
                        logger.error(err);
                    });
            })
            .catch(err => {
                logger.error(err);
            })
    }
);

router.delete(
    '/:id',
    [
        LANGUAGE_VALIDATORS.idValidator
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        QUERIES.deleteParadigmsFromLanguage(req.params.id)
            .then(() => {
                QUERIES.deleteLanguage(req.params.id)
                    .then(result => {
                        res.json(result.rows);
                    })
                    .catch(err => {
                        logger.error(err);
                    })
            })
    }
);

module.exports = router;