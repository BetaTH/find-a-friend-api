/*
  Warnings:

  - You are about to drop the column `whatsapp_link` on the `orgs` table. All the data in the column will be lost.
  - Added the required column `whatsapp_number` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "whatsapp_link",
ADD COLUMN     "whatsapp_number" TEXT NOT NULL;
