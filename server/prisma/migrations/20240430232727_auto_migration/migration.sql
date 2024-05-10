/*
  Warnings:

  - You are about to drop the `Cupons` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsersCupons` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_rolId_fkey";

-- DropForeignKey
ALTER TABLE "UsersCupons" DROP CONSTRAINT "UsersCupons_cuponId_fkey";

-- DropForeignKey
ALTER TABLE "UsersCupons" DROP CONSTRAINT "UsersCupons_userId_fkey";

-- DropTable
DROP TABLE "Cupons";

-- DropTable
DROP TABLE "Roles";

-- DropTable
DROP TABLE "Users";

-- DropTable
DROP TABLE "UsersCupons";

-- CreateTable
CREATE TABLE "users" (
    "id" VARCHAR(36) NOT NULL,
    "rolId" VARCHAR(36) NOT NULL,
    "firstName" VARCHAR(150) NOT NULL,
    "lastName" VARCHAR(150) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "cuponCode" VARCHAR(6) NOT NULL,
    "registrationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(150) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cupons" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,
    "isValid" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "cupons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_cupons" (
    "userId" VARCHAR(36) NOT NULL,
    "cuponId" VARCHAR(36) NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "userCuponCode" VARCHAR(6),
    "sentCuponDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_cupons_pkey" PRIMARY KEY ("userId","cuponId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_cupons" ADD CONSTRAINT "users_cupons_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_cupons" ADD CONSTRAINT "users_cupons_cuponId_fkey" FOREIGN KEY ("cuponId") REFERENCES "cupons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
