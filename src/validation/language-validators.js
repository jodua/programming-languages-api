const { body, param, check } = require('express-validator');
const QUERIES = require('../utils/queries');

const idValidator = param('id').isInt();

const nameNewValidator = check('name')
    .isLength({ min: 1, max: 20 })
    .withMessage('Name must be between 1 and 20 characters long')
    .custom(async (value, { req }) => {
        const result = await QUERIES.getLanguageByName(value);
        if (result.rows.length > 0) {
            if (result.rows[0].id != req.params.id) {
                throw new Error('Language already exists');
            }
        }
    }
    );

const descriptionNewValidator = body('description')
    .isLength({ min: 10, max: 200 })
    .withMessage('Description must be between 10 and 200 characters')

const releaseDateNewValidator = body('release_date')
    .isISO8601()
    .withMessage('Release date must be a valid date')
    .toDate()

const versionNewValidator = body('version')
    .isLength({ min: 1 })
    .withMessage('Version is required')
const paradigmsNewValidator = body('paradigms')
    .isArray()
    .withMessage('Paradigms must be an array')

const paradigmNewValidator = body('paradigms.*')
    .isNumeric()
    .withMessage('Paradigms must be an array of numbers')
    .custom(async (value) => {
        const result = await QUERIES.getParadigmById(value);
        if (result.rows.length === 0) {
            throw new Error('Paradigm does not exist');
        }
    })

const companyNewValidator = body('company_id')
    .isNumeric()
    .withMessage('Company id must be a number')
    .custom(async value => {
        const result = await QUERIES.getCompanyById(value);
        if (result.rows.length === 0) {
            throw new Error('Company id does not exist');
        }
    })


module.exports = {
    idValidator,
    nameNewValidator,
    descriptionNewValidator,
    releaseDateNewValidator,
    versionNewValidator,
    paradigmsNewValidator,
    paradigmNewValidator,
    companyNewValidator
}