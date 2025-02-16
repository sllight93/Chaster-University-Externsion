/*
  Warnings:

  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Club` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Degree` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExamTask` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Punishment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CourseToDegree` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_courseId_fkey";

-- DropForeignKey
ALTER TABLE "ExamTask" DROP CONSTRAINT "ExamTask_classId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_classId_fkey";

-- DropForeignKey
ALTER TABLE "_CourseToDegree" DROP CONSTRAINT "_CourseToDegree_A_fkey";

-- DropForeignKey
ALTER TABLE "_CourseToDegree" DROP CONSTRAINT "_CourseToDegree_B_fkey";

-- DropTable
DROP TABLE "Class";

-- DropTable
DROP TABLE "Club";

-- DropTable
DROP TABLE "Course";

-- DropTable
DROP TABLE "Degree";

-- DropTable
DROP TABLE "ExamTask";

-- DropTable
DROP TABLE "Punishment";

-- DropTable
DROP TABLE "Task";

-- DropTable
DROP TABLE "_CourseToDegree";

-- CreateTable
CREATE TABLE "degrees" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'Bachelor',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "degrees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "class_prerequisite" (
    "class_id" TEXT NOT NULL,
    "prerequisite_id" TEXT NOT NULL,

    CONSTRAINT "class_prerequisite_pkey" PRIMARY KEY ("class_id","prerequisite_id")
);

-- CreateTable
CREATE TABLE "degree_course" (
    "degree_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,

    CONSTRAINT "degree_course_pkey" PRIMARY KEY ("degree_id","course_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "degrees_name_key" ON "degrees"("name");

-- CreateIndex
CREATE UNIQUE INDEX "courses_name_key" ON "courses"("name");

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_prerequisite" ADD CONSTRAINT "class_prerequisite_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_prerequisite" ADD CONSTRAINT "class_prerequisite_prerequisite_id_fkey" FOREIGN KEY ("prerequisite_id") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "degree_course" ADD CONSTRAINT "degree_course_degree_id_fkey" FOREIGN KEY ("degree_id") REFERENCES "degrees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "degree_course" ADD CONSTRAINT "degree_course_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
