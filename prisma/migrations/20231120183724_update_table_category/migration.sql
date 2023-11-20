-- DropForeignKey
ALTER TABLE `ToDoList` DROP FOREIGN KEY `ToDoList_categoryId_fkey`;

-- AlterTable
ALTER TABLE `ToDoList` MODIFY `categoryId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `ToDoList` ADD CONSTRAINT `ToDoList_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
