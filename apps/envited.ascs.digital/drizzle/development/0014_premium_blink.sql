ALTER TABLE "asset" RENAME TO "upload";--> statement-breakpoint
ALTER TABLE "upload" DROP CONSTRAINT "asset_user_id_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "upload" ADD CONSTRAINT "upload_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
