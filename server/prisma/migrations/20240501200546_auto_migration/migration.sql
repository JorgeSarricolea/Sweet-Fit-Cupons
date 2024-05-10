/*
  Warnings:

  - You are about to drop the column `rolId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_rolId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "rolId",
ADD COLUMN     "roleId" VARCHAR(36);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
