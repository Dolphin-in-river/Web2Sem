-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Customer', 'Supplier', 'Moderator', 'Admin');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CardOnline', 'CardOffline', 'CashOffline');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('InProcessing', 'WaitingToSent', 'Sent', 'WaitingAtThePickUpPoint', 'Received');

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" SERIAL NOT NULL,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductInWarehouse" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "linkToPhoto" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "amountInWarehouse" INTEGER NOT NULL,
    "supplierId" INTEGER,

    CONSTRAINT "ProductInWarehouse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductForCustomer" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "amountInOrder" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "customerId" INTEGER,
    "orderId" INTEGER,

    CONSTRAINT "ProductForCustomer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "dateTime" TEXT NOT NULL,
    "orderStatus" "OrderStatus" NOT NULL,
    "deliveryInformationNumber" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "isConfirm" BOOLEAN NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "dateTime" TEXT NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupportChat" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "SupportChat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "dateTime" TEXT NOT NULL,
    "supportChatId" INTEGER,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeliveryInformation" (
    "number" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "dateTine" TEXT NOT NULL,

    CONSTRAINT "DeliveryInformation_pkey" PRIMARY KEY ("number")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_personId_key" ON "Customer"("personId");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_personId_key" ON "Supplier"("personId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductForCustomer_productId_key" ON "ProductForCustomer"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_orderId_key" ON "Payment"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "SupportChat_customerId_key" ON "SupportChat"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "SupportChat_personId_key" ON "SupportChat"("personId");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductInWarehouse" ADD CONSTRAINT "ProductInWarehouse_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductForCustomer" ADD CONSTRAINT "ProductForCustomer_productId_fkey" FOREIGN KEY ("productId") REFERENCES "ProductInWarehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductForCustomer" ADD CONSTRAINT "ProductForCustomer_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductForCustomer" ADD CONSTRAINT "ProductForCustomer_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_deliveryInformationNumber_fkey" FOREIGN KEY ("deliveryInformationNumber") REFERENCES "DeliveryInformation"("number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportChat" ADD CONSTRAINT "SupportChat_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_supportChatId_fkey" FOREIGN KEY ("supportChatId") REFERENCES "SupportChat"("id") ON DELETE SET NULL ON UPDATE CASCADE;
