// Nothing is using this yet
import pool from './pool';


const createTables = () => {
  pool.query('CREATE TABLE IF NOT EXISTS users(user_id SERIAL PRIMARY KEY, firstname VARCHAR(100) NOT NULL, lastname VARCHAR(100) NOT NULL, othernames VARCHAR(100) NOT NULL, email VARCHAR(100) UNIQUE NOT NULL, username VARCHAR(50) NOT NULL, registered DATE NOT NULL, isAdmin BOOL DEFAULT(false))',
    () => {

    });
  pool.query('CREATE TABLE IF NOT EXISTS parcels(id SERIAL PRIMARY KEY, email VARCHAR(150) UNIQUE NOT NULL, password VARCHAR(150) NOT NULL)',
    () => {
    });
};

export default createTables;
