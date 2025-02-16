/*
  Warnings:

  - You are about to drop the column `difficulty` on the `classes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "classes" DROP COLUMN "difficulty";

-- CreateTable
CREATE TABLE "class_prerequisite" (
    "class_id" TEXT NOT NULL,
    "prerequisite_id" TEXT NOT NULL,

    CONSTRAINT "class_prerequisite_pkey" PRIMARY KEY ("class_id","prerequisite_id")
);

-- AddForeignKey
ALTER TABLE "class_prerequisite" ADD CONSTRAINT "class_prerequisite_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_prerequisite" ADD CONSTRAINT "class_prerequisite_prerequisite_id_fkey" FOREIGN KEY ("prerequisite_id") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
