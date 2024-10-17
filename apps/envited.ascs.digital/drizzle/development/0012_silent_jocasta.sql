ALTER TABLE "profile" ADD COLUMN "principal_user_id" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profile" ADD CONSTRAINT "profile_principal_user_id_user_id_fk" FOREIGN KEY ("principal_user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
