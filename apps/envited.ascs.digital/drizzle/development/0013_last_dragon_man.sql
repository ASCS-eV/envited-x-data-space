ALTER TABLE "user" ADD COLUMN "uuid" uuid;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_uuid_unique" UNIQUE("uuid");