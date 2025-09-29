/*
  Warnings:

  - Added the required column `duration` to the `meetings` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'RH', 'ADMIN');

-- CreateEnum
CREATE TYPE "MeetingStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "meetings" ADD COLUMN     "duration" INTEGER NOT NULL DEFAULT 30,
ADD COLUMN     "status" "MeetingStatus" NOT NULL DEFAULT 'APPROVED';

-- Update existing meetings to have proper duration based on time difference
UPDATE "meetings" SET "duration" = EXTRACT(EPOCH FROM ("endTime" - "startTime")) / 60;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';
