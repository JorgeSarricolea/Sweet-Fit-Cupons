/*
  Warnings:

  - The primary key for the `users_cupons` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cuponId` on the `users_cupons` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `users_cupons` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `cupons` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `users_cupons` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `users_cupons` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "users_cupons" DROP CONSTRAINT "users_cupons_cuponId_fkey";

-- DropForeignKey
ALTER TABLE "users_cupons" DROP CONSTRAINT "users_cupons_userId_fkey";

-- AlterTable
ALTER TABLE "users_cupons" DROP CONSTRAINT "users_cupons_pkey",
DROP COLUMN "cuponId",
DROP COLUMN "userId",
ADD COLUMN     "cuponCode" VARCHAR(6),
ADD COLUMN     "email" VARCHAR(255) NOT NULL,
ADD COLUMN     "id" VARCHAR(36) NOT NULL,
ADD CONSTRAINT "users_cupons_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "cupons_code_key" ON "cupons"("code");

-- AddForeignKey
ALTER TABLE "users_cupons" ADD CONSTRAINT "users_cupons_email_fkey" FOREIGN KEY ("email") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_cupons" ADD CONSTRAINT "users_cupons_cuponCode_fkey" FOREIGN KEY ("cuponCode") REFERENCES "cupons"("code") ON DELETE SET NULL ON UPDATE CASCADE;
