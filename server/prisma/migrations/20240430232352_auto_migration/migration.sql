/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Users" (
    "id" VARCHAR(36) NOT NULL,
    "rolId" VARCHAR(36) NOT NULL,
    "firstName" VARCHAR(150) NOT NULL,
    "lastName" VARCHAR(150) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "cuponCode" VARCHAR(6) NOT NULL,
    "registrationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(150) NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cupons" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,
    "isValid" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Cupons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersCupons" (
    "userId" VARCHAR(36) NOT NULL,
    "cuponId" VARCHAR(36) NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "userCuponCode" VARCHAR(6),
    "sentCuponDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsersCupons_pkey" PRIMARY KEY ("userId","cuponId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersCupons" ADD CONSTRAINT "UsersCupons_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersCupons" ADD CONSTRAINT "UsersCupons_cuponId_fkey" FOREIGN KEY ("cuponId") REFERENCES "Cupons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
