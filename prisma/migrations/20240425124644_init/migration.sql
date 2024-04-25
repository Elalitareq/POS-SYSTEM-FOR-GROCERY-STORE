-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPERADMIN', 'ADMIN', 'EMPLOYEE');

-- CreateEnum
CREATE TYPE "SaleType" AS ENUM ('WHOLESALE', 'REGULAR');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "lastModified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "synced" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "sku" TEXT NOT NULL,
    "categoryID" INTEGER NOT NULL,
    "inventoryCount" INTEGER NOT NULL,
    "regularPrice" DOUBLE PRECISION NOT NULL,
    "salePrice" DOUBLE PRECISION NOT NULL,
    "wholesalePrice" DOUBLE PRECISION NOT NULL,
    "costPrice" DOUBLE PRECISION NOT NULL,
    "lastModified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "synced" BOOLEAN NOT NULL DEFAULT false,
    "categoryId" INTEGER,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Batch" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "receivedDate" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "costPrice" DOUBLE PRECISION NOT NULL,
    "lastModified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "synced" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Batch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "lastModified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "synced" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "customerId" INTEGER,
    "employeeId" INTEGER NOT NULL,
    "saleType" "SaleType" NOT NULL,
    "lastModified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "synced" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransactionDetail" (
    "id" SERIAL NOT NULL,
    "transactionId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "priceAtTimeOfSale" DOUBLE PRECISION NOT NULL,
    "lastModified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "synced" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TransactionDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Action" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "actionType" TEXT NOT NULL,
    "lastModified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "synced" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Batch" ADD CONSTRAINT "Batch_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionDetail" ADD CONSTRAINT "TransactionDetail_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionDetail" ADD CONSTRAINT "TransactionDetail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
