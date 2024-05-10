/*
  Warnings:

  - You are about to drop the column `roleId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_roleId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "roleId",
ADD COLUMN     "roleName" VARCHAR(100);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_roleName_fkey" FOREIGN KEY ("roleName") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
