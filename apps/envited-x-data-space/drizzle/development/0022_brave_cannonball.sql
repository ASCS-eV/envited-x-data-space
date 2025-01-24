DO $$ BEGIN
 ALTER TABLE "asset" ADD CONSTRAINT "asset_owner_user_id_fk" FOREIGN KEY ("owner") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
