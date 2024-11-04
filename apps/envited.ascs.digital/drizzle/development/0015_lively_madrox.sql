ALTER TABLE "token" RENAME COLUMN "timestamp" TO "created_at";--> statement-breakpoint
ALTER TABLE "token" ALTER COLUMN "token_id" SET DATA TYPE integer USING token_id::integer;--> statement-breakpoint
ALTER TABLE "token" ALTER COLUMN "created_at" SET DATA TYPE timestamp USING created_at::timestamp without time zone;--> statement-breakpoint
ALTER TABLE "token" DROP COLUMN IF EXISTS "cover_image";