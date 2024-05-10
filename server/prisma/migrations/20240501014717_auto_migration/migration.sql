-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_rolId_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "rolId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
