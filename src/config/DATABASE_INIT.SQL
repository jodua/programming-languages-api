CREATE TABLE IF NOT EXISTS company (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
  );
  
CREATE TABLE IF NOT EXISTS paradigm (
  id SERIAL PRIMARY KEY,
  name VARCHAR(60) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS language (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) UNIQUE NOT NULL,
  description VARCHAR(200) NOT NULL,
  release_date DATE NOT NULL,
  version VARCHAR(16) NOT NULL,
  company_id INTEGER REFERENCES company(id)
);

CREATE TABLE IF NOT EXISTS language_paradigm (
  id SERIAL PRIMARY KEY,
  language_id INTEGER REFERENCES language(id),
  paradigm_id INTEGER REFERENCES paradigm(id)
);