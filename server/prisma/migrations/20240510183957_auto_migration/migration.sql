/*
  Warnings:

  - You are about to drop the `cupons` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_cupons` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "users_cupons" DROP CONSTRAINT "users_cupons_email_fkey";

-- DropTable
DROP TABLE "cupons";

-- DropTable
DROP TABLE "users_cupons";

-- CreateTable
CREATE TABLE "coupons" (
    "id" VARCHAR(36) NOT NULL,
    "code" VARCHAR(6) NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,
    "isValid" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "coupons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_coupons" (
    "id" VARCHAR(36) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "userCouponCode" VARCHAR(6),
    "cuponExpirationDate" TIMESTAMP(3),
    "applicationDate" TIMESTAMP(3),

    CONSTRAINT "users_coupons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "coupons_code_key" ON "coupons"("code");

-- AddForeignKey
ALTER TABLE "users_coupons" ADD CONSTRAINT "users_coupons_email_fkey" FOREIGN KEY ("email") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
