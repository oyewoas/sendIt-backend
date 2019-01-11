import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import pool from '../db/pool';
import { validateEmail, validatePassword, isEmpty } from './validation';

dotenv.config();

const badRequest = { status: '400', message: 'Bad Request' };
const notFound = { status: '404', message: 'Not Found' };
const internalserverError = { status: '500', message: 'Internal Server Error' };
const conflictExistence = { status: '409', message: 'Conflict'};


const createUser = (req, res) => {
  const { email, username, password } = req.body;
  if (isEmpty(email) || isEmpty(username) || isEmpty(password)) {
    badRequest.description = 'Email, password and username field cannot be empty';
    res.status(400).send(badRequest);
  } else {
    pool.query('SELECT * FROM users WHERE email = ($1)', [email], (err, dbRes) => {
      if (err) {
        internalserverError.description = 'Could not create new user account';
        res.status(500).send(internalserverError);
      } 
      if (dbRes.rows[0] === undefined) {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              message: 'could not encrypt password',
            });
          } else if (validateEmail(email) && validatePassword(password)) {
            pool.query('INSERT INTO users(email, password, username) values($1, $2, $3)', 
              [email, hash, username], (errorRes) => {
                if (errorRes) {
                  internalserverError.description = 'Could not create new user account';
                  res.status(500).send(internalserverError);
                } else {
                  loginQuery(req, res, false);
                }
              });
          } else if (!validateEmail(email) || !validatePassword(password)) {
            badRequest.description = 'Invalid Username or Password';
            res.status(400).send(badRequest);
          }
        });
      }
    });
  }
};
