-- CreateTable
CREATE TABLE "VirtualAccounts" (
    "id" TEXT NOT NULL,
    "acc_num" TEXT NOT NULL,
    "bank_name" TEXT NOT NULL,
    "amount" BIGINT NOT NULL,
    "is_valid" BOOLEAN NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VirtualAccounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VirtualAccounts_user_id_id_idx" ON "VirtualAccounts"("user_id", "id");

-- AddForeignKey
ALTER TABLE "VirtualAccounts" ADD CONSTRAINT "VirtualAccounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
