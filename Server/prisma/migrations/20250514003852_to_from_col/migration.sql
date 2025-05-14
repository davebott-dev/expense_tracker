/*
  Warnings:

  - Added the required column `fromAccount` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toAccount` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "fromAccount" TEXT NOT NULL,
ADD COLUMN     "toAccount" TEXT NOT NULL;
