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

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        },
        async (jwtPayload, done) => {
            try {
                const user = await prisma.user.findUnique({
                    where: { id: jwtPayload.userId },
                });
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'User not found' });
                }
            } catch (error) {
                return done(error, false);
            }

        }
    )
);

router.post("/signup", controller.createUser);
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await prisma.user.findFirst({
            where: { username },
        });
        if (!user) {
            return res.status(400).json({ success: false, error: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false,  error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.status(200).json({ success:true, message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ success:false, error: 'Error logging in' });
    }
});
router.get("/user", passport.authenticate('jwt', { session: false }), controller.getUser);
router.post("/createAccount", passport.authenticate('jwt',{session:false}), controller.createAccount);
router.post("/createTransaction", passport.authenticate('jwt',{session:false}), controller.createTransaction);
router.get("/getTransactions", passport.authenticate('jwt',{session:false}), controller.getTransactions);

module.exports = router;