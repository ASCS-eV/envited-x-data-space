ALTER TABLE "addressType" ADD COLUMN "created_at" timestamp;--> statement-breakpoint
ALTER TABLE "addressType" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "companyCategory" ADD COLUMN "created_at" timestamp;--> statement-breakpoint
ALTER TABLE "companyCategory" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "credentialType" ADD COLUMN "created_at" timestamp;--> statement-breakpoint
ALTER TABLE "credentialType" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "issuer" ADD COLUMN "created_at" timestamp;--> statement-breakpoint
ALTER TABLE "issuer" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "profile" ADD COLUMN "created_at" timestamp;--> statement-breakpoint
ALTER TABLE "profile" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "role" ADD COLUMN "created_at" timestamp;--> statement-breakpoint
ALTER TABLE "role" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_name_unique" UNIQUE("name");