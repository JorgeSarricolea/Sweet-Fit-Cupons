/*
  Warnings:

  - You are about to drop the column `cuponExpirationDate` on the `users_coupons` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users_coupons" DROP COLUMN "cuponExpirationDate",
ADD COLUMN     "couponExpirationDate" TIMESTAMP(3);
