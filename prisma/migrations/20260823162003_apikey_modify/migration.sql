-- CreateEnum
CREATE TYPE "APIKEYTYPE" AS ENUM ('LIVE', 'TEST');

-- DropIndex
DROP INDEX "ApiKeys_user_id_key";

-- AlterTable
ALTER TABLE "ApiKeys" ADD COLUMN     "type" "APIKEYTYPE" NOT NULL DEFAULT 'LIVE';
