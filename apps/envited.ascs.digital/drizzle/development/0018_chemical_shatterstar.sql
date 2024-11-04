CREATE TABLE IF NOT EXISTS "tokenAttributes" (
	"token_id" integer,
	"contract" text NOT NULL,
	"name" text NOT NULL,
	"value" text NOT NULL,
	CONSTRAINT "tokenAttributes_contract_token_id_pk" PRIMARY KEY("contract","token_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tokenTag" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "tokenTag_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tokensToTokenTags" (
	"token_id" uuid NOT NULL,
	"tag_id" integer NOT NULL
);
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
