CREATE TABLE IF NOT EXISTS "asset" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"hash" text,
	"timestamp" text,
	"contract" text,
	"creator" text,
	"token_id" text,
	"token_metadata" jsonb
);
