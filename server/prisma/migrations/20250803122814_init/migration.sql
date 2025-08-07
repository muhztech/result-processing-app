/*
  Warnings:

  - You are about to drop the column `course` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `grade` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `semester` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `matric_no` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[regNumber]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `score` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regNumber` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Student_matric_no_key";

-- AlterTable
ALTER TABLE "public"."Result" DROP COLUMN "course",
DROP COLUMN "grade",
DROP COLUMN "semester",
DROP COLUMN "unit",
ADD COLUMN     "score" INTEGER NOT NULL,
ADD COLUMN     "subject" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Student" DROP COLUMN "matric_no",
ADD COLUMN     "regNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Student_regNumber_key" ON "public"."Student"("regNumber");
