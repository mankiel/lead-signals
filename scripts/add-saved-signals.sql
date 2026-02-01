-- Create SavedSignal table
CREATE TABLE IF NOT EXISTS "SavedSignal" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "signalId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "metadata" JSONB,
    "sourceUrl" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedSignal_pkey" PRIMARY KEY ("id")
);

-- Create unique constraint on userId + signalId
CREATE UNIQUE INDEX IF NOT EXISTS "SavedSignal_userId_signalId_key" ON "SavedSignal"("userId", "signalId");

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS "SavedSignal_userId_idx" ON "SavedSignal"("userId");
CREATE INDEX IF NOT EXISTS "SavedSignal_signalId_idx" ON "SavedSignal"("signalId");

-- Add foreign key constraint to User table
ALTER TABLE "SavedSignal" ADD CONSTRAINT "SavedSignal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
