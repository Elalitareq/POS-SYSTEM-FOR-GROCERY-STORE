/*
  Warnings:

  - You are about to drop the column `synced` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `synced` on the `Batch` table. All the data in the column will be lost.
  - You are about to drop the column `synced` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `synced` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `synced` on the `TransactionDetail` table. All the data in the column will be lost.
  - You are about to drop the column `synced` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Action" DROP COLUMN "synced";

-- AlterTable
ALTER TABLE "Batch" DROP COLUMN "synced";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "synced";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "synced";

-- AlterTable
ALTER TABLE "TransactionDetail" DROP COLUMN "synced";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "synced";
