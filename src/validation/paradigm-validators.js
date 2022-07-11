const { body, param } = require('express-validator');
const QUERIES = require('../utils/queries');

const idValidator = param('id').isInt();

const nameNewValidator = body('name')
    .isLength({ min: 1, max: 20 })
    .withMessage('Name must be between 1 and 20 characters long')
    .custom(async (value, { req }) => {
        const result = await QUERIES.getParadigmByName(value);
        if (result.rows.length > 0) {
            if (result.rows[0].id != req.params.id) {
                throw new Error('Language already exists');
            }
        }
    })

const idDeleteValidator = param('id')
    .isInt()
    .custom(async value => {
        const result = await QUERIES.getLanguageByParadigmId(value)
        if (result.rows.length > 0) {
            throw new Error('There are languages using this paradigm');
        }
    })


module.exports = {
    idValidator,
    nameNewValidator,
    idDeleteValidator
}