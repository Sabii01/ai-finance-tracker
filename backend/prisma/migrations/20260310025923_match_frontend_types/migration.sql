/*
  Warnings:

  - The values [COMPLETED,PENDING] on the enum `ExpenseStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [ACTIVE,PAUSED,COMPLETED] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `currency` on the `Subscription` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ExpenseStatus_new" AS ENUM ('completed', 'pending');
ALTER TABLE "Expense" ALTER COLUMN "status" TYPE "ExpenseStatus_new" USING ("status"::text::"ExpenseStatus_new");
ALTER TYPE "ExpenseStatus" RENAME TO "ExpenseStatus_old";
ALTER TYPE "ExpenseStatus_new" RENAME TO "ExpenseStatus";
DROP TYPE "public"."ExpenseStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('active', 'paused', 'cancelled');
ALTER TABLE "Subscription" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "public"."Status_old";
COMMIT;

-- AlterTable
ALTER TABLE "Expense" ALTER COLUMN "category" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "currency",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "paymentMethod" DROP NOT NULL;
