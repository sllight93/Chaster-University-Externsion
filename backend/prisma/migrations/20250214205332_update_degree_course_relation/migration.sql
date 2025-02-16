/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Degree` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Degree" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'Bachelor';

-- CreateIndex
CREATE UNIQUE INDEX "Course_name_key" ON "Course"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Degree_name_key" ON "Degree"("name");
