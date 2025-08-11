/*
  Warnings:

  - Made the column `course` on table `Result` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Result" ALTER COLUMN "course" SET NOT NULL;
