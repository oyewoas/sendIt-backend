import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import pool from '../db/pool';
import { validateEmail, validatePassword, isEmpty } from './validation';

dotenv.config();

const badRequest = { status: '400', message: 'Bad Request' };
const notFound = { status: '404', message: 'Not Found' };
const internalserverError = { status: '500', message: 'Internal Server Error' };
const conflictExists = { status: '409', message: 'Conflict' };


const loginQuery = (req, res, login) => {
  const { email, password } = req.body;
  pool.query('SELECT * FROM users WHERE email = ($1)', [email], (error, dbRes) => {
    if (error) {
      // console.log(error);
      internalserverError.description = 'Could not Log User in';
      res.status(500).send(internalserverError);
    } else {
      notFound.description = 'User does not exist';
      if (dbRes.rows[0] === undefined) {
        res.status(404).send(notFound);
      } else {
        bcrypt.compare(password, dbRes.rows[0].password,
          (bcryptError, bcryptRes) => {
            if (bcryptError) {
              res.status(404).send(notFound);
            } else if (bcryptRes) {
              const token = jwt.sign(
                {
                  email: dbRes.rows[0].email,
                  userId: dbRes.rows[0].user_id,
                },
                process.env.JWT_KEY,
                {
                  expiresIn: '4h',
                },
              );
              if (login) {
                const replyGood = { status: '200', message: 'User Logged In Successfully' };
                const dbResponse = dbRes.rows[0];
                replyGood.token = token;
                replyGood.user_id = dbResponse.user_id;
                res.status(200).send(replyGood);
              } else {
                const replyCreate = { status: '201', data: [] };
                const message = 'User Created Successfully';
                const dbResponse = dbRes.rows[0];
                replyCreate.data.push({ token, user: { user_id: dbResponse.user_id, username: dbResponse.username }, message });
                res.status(201).send(replyCreate);
              }
            } else {
              // reply.message = 'Unable to encrypt password';
              res.status(401).send(notFound);
            }
          });
      }
    }
  });
};

const logIn = (req, res) => {
  const { email, password } = req.body;
  if (isEmpty(email) || isEmpty(password)) {
    // const badReq = { status: '400', message: 'Email or password field cannot be empty' };
    badRequest.description = 'Email or password field cannot be empty';
    res.status(400).send(badRequest);
  } else if (validateEmail(email) && validatePassword(password)) {
    loginQuery(req, res, true);
  } else if (!validateEmail(email) || !validatePassword(password)) {
    const replyServer = { status: '400', message: 'Invalid email or password' };
    res.status(400).send(replyServer);
  }
};

const createUser = (req, res) => {
  const { email, username, password } = req.body;
  const registered = new Date();
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
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, (hashErr, hash) => {
          if (hashErr) {
            res.status(500).json({
              message: 'could not encrypt password',
            });
          } else if (validateEmail(email) && validatePassword(password)) {
            pool.query('INSERT INTO users(email, username, password, registered) values($1, $2, $3, $4)',
              [email, username, hash, registered], (error, realRes) => {
                if (error) {
                  internalserverError.description = 'Could not create new user ';
                  res.status(500).send(internalserverError);
                } else {
                //   res.status(500).json({ message: 'User Created Successfully' });
                  loginQuery(req, res, false);
                }
              });
          } else if (!validateEmail(email) || !validatePassword(password)) {
            badRequest.description = 'Invalid Email or Password';
            res.status(400).send(badRequest);
          }
        });
      } else {
        conflictExists.description = 'User or Email Already Exists';
        res.status(409).send(conflictExists);
      }
    });
  }
};

export {
  createUser, loginQuery, logIn,
};
