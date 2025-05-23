require("dotenv").config();
const { PrismaClient, TransactionType } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  createUser: async (req, res) => {
    const { username, email, name, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
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
          expiresIn: "1h",
        });
        res
          .status(201)
          .json({
            success: true,
            token: token,
            message: "User created successfully",
            user,
          });
      } catch (error) {
        res.status(500).json({ success: false, error: "Error creating user" });
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
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching user" });
    }
  },
  createTransaction: async (req, res) => {
    console.log("request body", req.body);
    console.log("request user", req.user);
    const { amount, date, description, category, fromAccount, toAccount } =
      req.body;

    try {
      const transaction = await prisma.transaction.create({
        data: {
          type:
            category == "Income"
              ? TransactionType.INCOME
              : category == "Expense"
              ? TransactionType.EXPENSE
              : TransactionType.TRANSFER,
          amount: parseFloat(amount),
          date: date,
          description: description,
          userId: req.user.id,
          fromAccount: fromAccount,
          toAccount: toAccount,
        },
      });

      if (category == "Income") {
        const updateAccount = await prisma.account.update({
          where: { name: toAccount },
          data: {
            balance: {
              increment: parseFloat(amount),
            },
          },
        });
      } else if (category == "Expense") {
            const updateAccount = await prisma.account.update({
            where: { name: fromAccount },
            data: {
                balance: {
                decrement: parseFloat(amount),
                },
            },
            });
        } else if (category == "Transfer") {
            const updateFromAccount = await prisma.account.update({
                where: { name: fromAccount },
                data: {
                balance: {
                    decrement: parseFloat(amount),
                },
                },
            });
            const updateToAccount = await prisma.account.update({
                where: { name: toAccount },
                data: {
                balance: {
                    increment: parseFloat(amount),
                },
                },
            });
        }

      res
        .status(201)
        .json({
          success: true,
          message: "Transaction created successfully",
          transaction,
        });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, error: "Error creating transaction" });
    }
  },
  getTransactions: async (req, res) => {
    try {
      const transactions = await prisma.transaction.findMany({
        where: { userId: req.user.id },
      });
      res.status(200).json({ success: true, message: transactions });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, error: "Error fetching transactions" });
    }
  },
  createAccount: async (req, res) => {
    console.log("request body", req.body);
    console.log("request user", req.user);
    const { name, group, balance } = req.body;

    try {
      const account = await prisma.account.create({
        data: {
          name: name,
          accountType: group,
          balance: parseFloat(balance),
          userId: req.user.id,
        },
      });
      res
        .status(201)
        .json({
          success: true,
          message: "Account created successfully",
          account,
        });
    } catch (error) {
      res.status(500).json({ success: false, error: "Error creating account" });
    }
  },
  deleteTransaction: async (req, res) => {
    const { transactionId } = req.params;
    try {
      const transaction = await prisma.transaction.delete({
        where: { id: transactionId },
      });
      res
        .status(200)
        .json({
          success: true,
          message: "Transaction deleted successfully",
          transaction,
        });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, error: "Error deleting transaction" });
    }
  },
  deleteUser: async(req,res) => {
    console.log(user?.id);
    const {userId} = req.params;
    try {
      const user = await prisma.user.delete({
        where: { id: userId },
      });
      res
        .status(200)
        .json({
          success: true,
          message: "User deleted successfully",
          user,
        });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, error: "Error deleting user" });
    }
  }
};
