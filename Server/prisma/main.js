const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const account = await prisma.account.deleteMany();
    const transactions = await prisma.transaction.deleteMany();
    const user = await prisma.user.deleteMany();

    console.dir(account, { depth: null });
    console.dir(transactions, { depth: null });
    console.dir(user, { depth: null });
}


main()