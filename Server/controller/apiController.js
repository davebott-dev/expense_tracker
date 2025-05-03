require('dotenv').config();
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    createUser: async (req, res) => {
        const { username, email,name, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        } else {
            try {
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = await prisma.user.create({
                    data: {
                        username,
                        email,
                        name,
                        password: hashedPassword,
                    },
                });
                const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
                    expiresIn: '1h',
                });
                res.status(201).json({ success: true, token:token,message: 'User created successfully', user });
            } catch (error) {
                res.status(500).json({ success: false, error: 'Error creating user' });
            }
        }
    },
    getUser: async (req, res) => {
        try {
            const user = await prisma.user.findUnique({
                where: { id: req.user.id },
                include: { Transaction: true, Account: true },
            });
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error fetching user' });
        }
    },
    createTransaction: async(req,res)=> {
        const { type, amount, date, description, categoryId, userId } = req.body;
        try {
            const transaction = await prisma.transaction.create({
                data: {
                    type,
                    amount,
                    date,
                    description,
                    categoryId,
                    userId,
                },
            });
            res.status(201).json({ success: true, message: 'Transaction created successfully', transaction });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Error creating transaction' });
        }
    },
    getTransactions: async (req, res) => {
        try {
            const transactions = await prisma.transaction.findMany({
                where: { userId: req.user.id },
                include: { category: true },
            });
            res.status(200).json(transactions);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching transactions' });
        }
    },
    createAccount: async(req,res)=> {
        const { name, group, balance, userId } = req.body;

        const user = await prisma.user.findUnique({
            where: {id: userId},
        });
        
        try {
            const account = await prisma.account.create({
                data: {
                    name,
                    accountType: group,
                    balance,
                    userId,
                },
            });
            res.status(201).json({ success: true, message: 'Account created successfully', account });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Error creating account' });
        }
    }

}