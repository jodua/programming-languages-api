const { body, param } = require('express-validator');
const QUERIES = require('../utils/queries');

const idValidator = param('id').isInt();

const nameNewValidator = body('name')
    .isLength({ min: 1, max: 20 })
    .withMessage('Name must be between 1 and 20 characters long')

const idDeleteValidator = param('id')
    .isInt()
    .custom(async value => {
        const result = await QUERIES.getLanguageByCompanyId(value)
        if (result.rows.length > 0) {
            throw new Error('Company has languages');
        }
    })


module.exports = {
    idValidator,
    nameNewValidator,
    idDeleteValidator
}