CREATE TABLE IF NOT EXISTS "tokenAttributes" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"value" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tokenTag" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tokensToTokenAttributes" (
	"token_id" uuid NOT NULL,
	"attribute_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tokensToTokenTags" (
	"token_id" uuid NOT NULL,
	"tag_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "token" RENAME COLUMN "creator" TO "minter";--> statement-breakpoint
ALTER TABLE "token" RENAME COLUMN "thumbnail" TO "display_uri";--> statement-breakpoint
ALTER TABLE "token" ADD COLUMN "name" text;--> statement-breakpoint
ALTER TABLE "token" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "token" ADD COLUMN "creators" jsonb;--> statement-breakpoint
ALTER TABLE "token" ADD COLUMN "publishers" jsonb;--> statement-breakpoint
ALTER TABLE "token" ADD COLUMN "date" timestamp;--> statement-breakpoint
ALTER TABLE "token" ADD COLUMN "type" text;--> statement-breakpoint
ALTER TABLE "token" ADD COLUMN "rights" text;--> statement-breakpoint
ALTER TABLE "token" ADD COLUMN "rights_uri" text;--> statement-breakpoint
ALTER TABLE "token" ADD COLUMN "language" text;--> statement-breakpoint
ALTER TABLE "token" ADD COLUMN "artifact_uri" text;--> statement-breakpoint
ALTER TABLE "token" ADD COLUMN "identifier" text;--> statement-breakpoint
ALTER TABLE "token" ADD COLUMN "external_uri" text;--> statement-breakpoint
ALTER TABLE "token" ADD COLUMN "modified_at" timestamp;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tokensToTokenAttributes" ADD CONSTRAINT "tokensToTokenAttributes_token_id_token_id_fk" FOREIGN KEY ("token_id") REFERENCES "public"."token"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tokensToTokenAttributes" ADD CONSTRAINT "tokensToTokenAttributes_attribute_id_tokenAttributes_id_fk" FOREIGN KEY ("attribute_id") REFERENCES "public"."tokenAttributes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tokensToTokenTags" ADD CONSTRAINT "tokensToTokenTags_token_id_token_id_fk" FOREIGN KEY ("token_id") REFERENCES "public"."token"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tokensToTokenTags" ADD CONSTRAINT "tokensToTokenTags_tag_id_tokenTag_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tokenTag"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
