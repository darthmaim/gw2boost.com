-- CreateTable
CREATE TABLE "AuthRequest" (
    "id" TEXT NOT NULL,
    "code_verifier" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthRequest_pkey" PRIMARY KEY ("id")
);
