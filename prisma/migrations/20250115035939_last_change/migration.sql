/*
  Warnings:

  - Made the column `categoryId` on table `item` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `item` DROP FOREIGN KEY `Item_categoryId_fkey`;

-- DropIndex
DROP INDEX `Item_categoryId_fkey` ON `item`;

-- AlterTable
ALTER TABLE `item` ALTER COLUMN `created_at` DROP DEFAULT,
    MODIFY `categoryId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
