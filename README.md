# programming-languages-api


## Description

Simple REST API for programming languages. Create, read, update and delete languages, companies and paradigms.

---

## Installation

### Docker-compose

Easiest way of getting api running. It comes with postgres container and volume for postgres.

Feel free to edit environment variables specified in `docker-compose.yml` file.

`docker-compose up -d`

### Docker (with own database)


`docker build -t programming-languages-api -f ./Dockerfile`

`docker run -d -p PORT:PORT -e ENV_VARIABLES programming-languages-api`

Environment variables are the same as in `docker-compose.yml` (look up) file or `.env` file (look down)

### Locally with npm (with own database)

Provide environment variables in .env file or through system environment variables.

Example `.env` file

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=languages
DB_USER=postgres
DB_PASSWORD=postgres
PORT=3000
```

Run API by executing

`npm start`

Or in development mode with nodemon

`npm run dev`

---

## Documentation

Docs are available on `${API_URL}/api-docs` endpoint

---

## Issues

You can file issues through issues page

---

## License 

MIT