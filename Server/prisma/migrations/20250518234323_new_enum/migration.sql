/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `type` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('INCOME', 'EXPENSE', 'TRANSFER');

-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "balance" SET DEFAULT 0,
ALTER COLUMN "name" SET DEFAULT 'Main Account';

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "type",
ADD COLUMN     "type" "TransactionType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Account_name_key" ON "Account"("name");
