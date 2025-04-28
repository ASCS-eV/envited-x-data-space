ALTER TABLE "token" ADD COLUMN "web_global_identifier_id" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "token" ADD CONSTRAINT "token_web_global_identifier_id_globalIdentifier_id_fk" FOREIGN KEY ("web_global_identifier_id") REFERENCES "public"."globalIdentifier"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
