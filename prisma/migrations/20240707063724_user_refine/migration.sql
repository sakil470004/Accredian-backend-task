/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Referral` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[referrerEmail]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[refereeEmail]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `refereeEmail` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refereeName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referrerEmail` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referrerName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "refereeEmail" TEXT NOT NULL,
ADD COLUMN     "refereeName" TEXT NOT NULL,
ADD COLUMN     "referrerEmail" TEXT NOT NULL,
ADD COLUMN     "referrerName" TEXT NOT NULL;

-- DropTable
DROP TABLE "Referral";

-- CreateIndex
CREATE UNIQUE INDEX "User_referrerEmail_key" ON "User"("referrerEmail");

-- CreateIndex
CREATE UNIQUE INDEX "User_refereeEmail_key" ON "User"("refereeEmail");
