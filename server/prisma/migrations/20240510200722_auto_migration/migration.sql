/*
  Warnings:

  - You are about to drop the column `isValidated` on the `users_coupons` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users_coupons" DROP COLUMN "isValidated",
ADD COLUMN     "isSent" BOOLEAN NOT NULL DEFAULT false;
