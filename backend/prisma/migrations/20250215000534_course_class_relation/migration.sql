/*
  Warnings:

  - You are about to drop the column `courseId` on the `classes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "classes" DROP CONSTRAINT "classes_courseId_fkey";

-- AlterTable
ALTER TABLE "classes" DROP COLUMN "courseId";

-- CreateTable
CREATE TABLE "course_class" (
    "courseId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,

    CONSTRAINT "course_class_pkey" PRIMARY KEY ("courseId","classId")
);

-- AddForeignKey
ALTER TABLE "course_class" ADD CONSTRAINT "course_class_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_class" ADD CONSTRAINT "course_class_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
