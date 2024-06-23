/*
  Warnings:

  - You are about to drop the column `synced` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "synced",
ADD COLUMN     "soldCount" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "categoryID" DROP NOT NULL,
ALTER COLUMN "inventoryCount" SET DEFAULT 0,
ALTER COLUMN "salePrice" DROP NOT NULL,
ALTER COLUMN "wholesalePrice" DROP NOT NULL;
