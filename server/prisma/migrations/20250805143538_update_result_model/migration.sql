/*
  Warnings:

  - You are about to drop the column `score` on the `Result` table. All the data in the column will be lost.
  - Added the required column `ca` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exam` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grade` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remark` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Made the column `semester` on table `Result` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Result" DROP COLUMN "score",
ADD COLUMN     "ca" INTEGER NOT NULL,
ADD COLUMN     "exam" INTEGER NOT NULL,
ADD COLUMN     "grade" TEXT NOT NULL,
ADD COLUMN     "remark" TEXT NOT NULL,
ADD COLUMN     "total" INTEGER NOT NULL,
ALTER COLUMN "semester" SET NOT NULL;
