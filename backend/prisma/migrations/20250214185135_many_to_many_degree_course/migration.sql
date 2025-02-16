/*
  Warnings:

  - You are about to drop the column `degreeId` on the `Course` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_degreeId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "degreeId";

-- CreateTable
CREATE TABLE "_CourseToDegree" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CourseToDegree_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CourseToDegree_B_index" ON "_CourseToDegree"("B");

-- AddForeignKey
ALTER TABLE "_CourseToDegree" ADD CONSTRAINT "_CourseToDegree_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToDegree" ADD CONSTRAINT "_CourseToDegree_B_fkey" FOREIGN KEY ("B") REFERENCES "Degree"("id") ON DELETE CASCADE ON UPDATE CASCADE;
