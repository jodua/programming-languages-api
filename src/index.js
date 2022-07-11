const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger.json');
const client = require('./config/postgres-config');
const logger = require('./config/logger-config');
const { readQueryFromFile } = require('./utils/pg-utils');

const sqlQuery = readQueryFromFile(__dirname, './config/DATABASE_INIT.SQL');
const insertQuery = readQueryFromFile(__dirname, './config/EXAMPLE_DATA.SQL');

// Initial setup
const app = express();


// Middleware
app.use(express.json());
app.use(cors());


// Routes
app.use('/languages', require('./routes/languages'));
app.use('/paradigms', require('./routes/paradigms'));
app.use('/companies', require('./routes/companies'));


// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Listen
require('dotenv').config();
const PORT = process.env.PORT || 3000;

client.connect()
    .then(() => {
        logger.info('Connected to Postgres');

        // Initialize database
        logger.info('Initializing database');
        client.query(sqlQuery);

        // If database is empty, insert default data
        client.query('SELECT * FROM language')
            .then(result => {
                if (result.rows.length === 0) {
                    logger.info('Database is empty, inserting default data');
                    client.query(insertQuery);
                }
            }).catch(err => {
                logger.error(err);
            })

        app.listen(PORT, () => {
            logger.info(`Api is listening on PORT: ${PORT}`);
        });
    })
    .catch(err => {
        logger.error(err);
    });