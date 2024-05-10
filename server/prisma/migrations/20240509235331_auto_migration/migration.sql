/*
  Warnings:

  - You are about to drop the column `isAvailable` on the `users_cupons` table. All the data in the column will be lost.
  - You are about to drop the column `sentCuponDate` on the `users_cupons` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users_cupons" DROP COLUMN "isAvailable",
DROP COLUMN "sentCuponDate",
ADD COLUMN     "applicationDate" TIMESTAMP(3),
ADD COLUMN     "cuponExpirationDate" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "users_cupons" ADD CONSTRAINT "users_cupons_userCuponCode_fkey" FOREIGN KEY ("userCuponCode") REFERENCES "cupons"("code") ON DELETE SET NULL ON UPDATE CASCADE;
