/*
  Warnings:

  - You are about to drop the column `roleName` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_roleName_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "roleName",
ADD COLUMN     "roleId" VARCHAR(100);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
