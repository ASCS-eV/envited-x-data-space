CREATE TABLE IF NOT EXISTS "token" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"hash" text,
	"timestamp" text,
	"contract" text,
	"creator" text,
	"token_id" text,
	"thumbnail" text,
	"cover_image" text,
	"token_metadata" jsonb
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "uuid" uuid;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_uuid_unique" UNIQUE("uuid");