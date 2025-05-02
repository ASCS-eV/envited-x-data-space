ALTER TABLE "asset" ADD COLUMN "manifest_global_identifier_id" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "asset" ADD CONSTRAINT "asset_manifest_global_identifier_id_globalIdentifier_id_fk" FOREIGN KEY ("manifest_global_identifier_id") REFERENCES "public"."globalIdentifier"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
