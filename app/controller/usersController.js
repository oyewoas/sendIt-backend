import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import pool from '../db/pool';
import { validateEmail, validatePassword, isEmpty } from './validate';

dotenv.config();