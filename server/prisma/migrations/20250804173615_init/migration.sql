/*
  Warnings:

  - Added the required column `semester` to the `Result` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Result" ADD COLUMN     "semester" INTEGER NOT NULL;
