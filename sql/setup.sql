-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS pokemans;

CREATE TABLE pokemans (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  primary_type TEXT NOT NULL,
  secondary_type TEXT
);

INSERT INTO
  pokemans (name, primary_type, secondary_type)
VALUES
  ('Bulbasaur', 'Grass', 'Poison'),
  ('Ivysaur', 'Grass', 'Poison'),
  ('Venusaur', 'Grass', 'Poison'),
  ('Charmander', 'Fire', NULL),
  ('Charmeleon', 'Fire', NULL),
  ('Charizard', 'Fire', 'Flying'),
  ('Squirtle', 'Water', NULL),
  ('Wartortle', 'Water', NULL),
  ('Blastoise', 'Water', NULL),
  ('Pikachu', 'Electric', NULL);