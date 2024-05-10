/*
  Warnings:

  - You are about to drop the column `cuponCode` on the `users_cupons` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users_cupons" DROP CONSTRAINT "users_cupons_cuponCode_fkey";

-- AlterTable
ALTER TABLE "users_cupons" DROP COLUMN "cuponCode";
