/*
  Warnings:

  - A unique constraint covering the columns `[category]` on the table `Item` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `item` ADD COLUMN `category` VARCHAR(191) NOT NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX `Item_category_key` ON `Item`(`category`);
