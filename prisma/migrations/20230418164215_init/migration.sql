/*
  Warnings:

  - The primary key for the `DeliveryInformation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `dateTine` on the `DeliveryInformation` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `DeliveryInformation` table. All the data in the column will be lost.
  - You are about to drop the column `deliveryInformationNumber` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderId]` on the table `DeliveryInformation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dateTime` to the `DeliveryInformation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_deliveryInformationNumber_fkey";

-- AlterTable
ALTER TABLE "DeliveryInformation" DROP CONSTRAINT "DeliveryInformation_pkey",
DROP COLUMN "dateTine",
DROP COLUMN "number",
ADD COLUMN     "dateTime" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "orderId" INTEGER,
ADD CONSTRAINT "DeliveryInformation_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "deliveryInformationNumber";

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryInformation_orderId_key" ON "DeliveryInformation"("orderId");

-- AddForeignKey
ALTER TABLE "DeliveryInformation" ADD CONSTRAINT "DeliveryInformation_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
