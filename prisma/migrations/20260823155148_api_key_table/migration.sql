-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email_verfied" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "email_verified_at" TIMESTAMP(3),
ADD COLUMN     "phone_verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "phone_verified_at" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "ApiKeys" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "api_key" TEXT NOT NULL,
    "is_valid" BOOLEAN NOT NULL DEFAULT true,
    "expires_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApiKeys_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ApiKeys_user_id_key" ON "ApiKeys"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "ApiKeys_api_key_key" ON "ApiKeys"("api_key");

-- CreateIndex
CREATE INDEX "ApiKeys_user_id_api_key_idx" ON "ApiKeys"("user_id", "api_key");

-- CreateIndex
CREATE INDEX "User_id_email_phone_idx" ON "User"("id", "email", "phone");

-- AddForeignKey
ALTER TABLE "ApiKeys" ADD CONSTRAINT "ApiKeys_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
