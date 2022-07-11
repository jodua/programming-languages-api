
INSERT INTO company (name) VALUES ('Microsoft');
INSERT INTO company (name) VALUES ('Google');
INSERT INTO company (name) VALUES ('Oracle');

INSERT INTO paradigm (name) VALUES ('Object-Oriented');
INSERT INTO paradigm (name) VALUES ('Functional');
INSERT INTO paradigm (name) VALUES ('Imperative');


INSERT INTO language (name, description, release_date, version, company_id) VALUES ('C#', 'C# is a general-purpose, object-oriented programming language', '2000-01-01', '1.0', 1);
INSERT INTO language (name, description, release_date, version, company_id) VALUES ('Java', 'Java is a general-purpose, object-oriented programming language that is class-based and designed to be flexible and efficient', '1995-01-01', '1.0', 3);
INSERT INTO language (name, description, release_date, version, company_id) VALUES ('Go', 'Go is a programming language that makes it easy to build simple, reliable, and efficient software.', '1999-01-01', '1.0', 2);

INSERT INTO language_paradigm (language_id, paradigm_id) VALUES (1, 1);
INSERT INTO language_paradigm (language_id, paradigm_id) VALUES (1, 2);
INSERT INTO language_paradigm (language_id, paradigm_id) VALUES (1, 3);
INSERT INTO language_paradigm (language_id, paradigm_id) VALUES (2, 1);
INSERT INTO language_paradigm (language_id, paradigm_id) VALUES (2, 2);
INSERT INTO language_paradigm (language_id, paradigm_id) VALUES (2, 3);
INSERT INTO language_paradigm (language_id, paradigm_id) VALUES (3, 3);
