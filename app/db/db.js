// Nothing is using this yet
import pool from './pool';


const createTables = () => {
  pool.query('CREATE TABLE IF NOT EXISTS parcels(id SERIAL PRIMARY KEY, display_name VARCHAR(200) NOT NULL, email VARCHAR(150) UNIQUE NOT NULL, no_questions BIGINT DEFAULT 0, no_answers BIGINT DEFAULT 0, joined TIMESTAMP NOT NULL)',
    () => {

    });
  pool.query('CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, email VARCHAR(150) UNIQUE NOT NULL, password VARCHAR(150) NOT NULL)',
    () => {
    });
};

export default createTables;
