require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const controller = require('../controller/apiController');





module.exports = router;