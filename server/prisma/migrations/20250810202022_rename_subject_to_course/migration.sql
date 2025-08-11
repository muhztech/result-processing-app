/*
  Warnings:

  - You are about to drop the column `subject` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the `Subject` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Result" DROP COLUMN "subject",
ADD COLUMN     "course" TEXT NOT NULL DEFAULT 'Unknown';

-- DropTable
DROP TABLE "public"."Subject";

-- CreateTable
CREATE TABLE "public"."Course" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Course_name_key" ON "public"."Course"("name");
