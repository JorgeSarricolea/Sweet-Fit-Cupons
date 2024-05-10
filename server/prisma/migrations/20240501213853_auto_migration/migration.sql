/*
  Warnings:

  - Added the required column `code` to the `cupons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cupons" ADD COLUMN     "code" VARCHAR(6) NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "cuponCode" DROP NOT NULL;
