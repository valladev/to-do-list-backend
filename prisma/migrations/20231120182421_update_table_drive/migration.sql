/*
  Warnings:

  - Added the required column `operation` to the `Drive` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Drive` ADD COLUMN `operation` VARCHAR(191) NOT NULL,
    ADD COLUMN `taskId` INTEGER NULL,
    ADD COLUMN `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Drive` ADD CONSTRAINT `Drive_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Drive` ADD CONSTRAINT `Drive_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
