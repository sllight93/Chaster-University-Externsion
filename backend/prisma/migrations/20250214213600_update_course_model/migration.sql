/*
  Warnings:

  - You are about to drop the column `course_id` on the `classes` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `classes` table. All the data in the column will be lost.
  - You are about to drop the column `difficulty` on the `classes` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `courses` table. All the data in the column will be lost.
  - The primary key for the `degree_course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `course_id` on the `degree_course` table. All the data in the column will be lost.
  - You are about to drop the column `degree_id` on the `degree_course` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `degrees` table. All the data in the column will be lost.
  - You are about to drop the `class_prerequisite` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `courseId` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `daysOfWeek` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pointsRequired` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseId` to the `degree_course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `degreeId` to the `degree_course` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "class_prerequisite" DROP CONSTRAINT "class_prerequisite_class_id_fkey";

-- DropForeignKey
ALTER TABLE "class_prerequisite" DROP CONSTRAINT "class_prerequisite_prerequisite_id_fkey";

-- DropForeignKey
ALTER TABLE "classes" DROP CONSTRAINT "classes_course_id_fkey";

-- DropForeignKey
ALTER TABLE "degree_course" DROP CONSTRAINT "degree_course_course_id_fkey";

-- DropForeignKey
ALTER TABLE "degree_course" DROP CONSTRAINT "degree_course_degree_id_fkey";

-- AlterTable
ALTER TABLE "classes" DROP COLUMN "course_id",
DROP COLUMN "created_at",
DROP COLUMN "difficulty",
ADD COLUMN     "courseId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "daysOfWeek" JSONB NOT NULL,
ADD COLUMN     "pointsRequired" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "created_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "degree_course" DROP CONSTRAINT "degree_course_pkey",
DROP COLUMN "course_id",
DROP COLUMN "degree_id",
ADD COLUMN     "courseId" TEXT NOT NULL,
ADD COLUMN     "degreeId" TEXT NOT NULL,
ADD CONSTRAINT "degree_course_pkey" PRIMARY KEY ("degreeId", "courseId");

-- AlterTable
ALTER TABLE "degrees" DROP COLUMN "created_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "class_prerequisite";

-- CreateTable
CREATE TABLE "tasks" (
    "id" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "minDuration" INTEGER NOT NULL,
    "maxDuration" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam_tasks" (
    "id" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "minDuration" INTEGER NOT NULL,
    "maxDuration" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "exam_tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "punishments" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "minDuration" INTEGER NOT NULL,
    "maxDuration" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "punishments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clubs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "modifiers" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clubs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "degree_course" ADD CONSTRAINT "degree_course_degreeId_fkey" FOREIGN KEY ("degreeId") REFERENCES "degrees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "degree_course" ADD CONSTRAINT "degree_course_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_tasks" ADD CONSTRAINT "exam_tasks_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
