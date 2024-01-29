DO $$ BEGIN
 ALTER TABLE "profile" ADD CONSTRAINT "profile_name_user_name_fk" FOREIGN KEY ("name") REFERENCES "public"."user"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
