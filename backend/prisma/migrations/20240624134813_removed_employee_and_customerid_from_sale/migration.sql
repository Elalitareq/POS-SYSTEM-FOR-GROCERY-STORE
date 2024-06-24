/*
  Warnings:

  - You are about to drop the column `customerId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "customerId",
DROP COLUMN "employeeId";
