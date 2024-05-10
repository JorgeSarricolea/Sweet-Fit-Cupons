/*
  Warnings:

  - The primary key for the `users_cupons` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "users_cupons" DROP CONSTRAINT "users_cupons_cuponId_fkey";

-- AlterTable
ALTER TABLE "users_cupons" DROP CONSTRAINT "users_cupons_pkey",
ALTER COLUMN "cuponId" DROP NOT NULL,
ALTER COLUMN "sentCuponDate" DROP NOT NULL,
ADD CONSTRAINT "users_cupons_pkey" PRIMARY KEY ("userId");

-- AddForeignKey
ALTER TABLE "users_cupons" ADD CONSTRAINT "users_cupons_cuponId_fkey" FOREIGN KEY ("cuponId") REFERENCES "cupons"("id") ON DELETE SET NULL ON UPDATE CASCADE;
