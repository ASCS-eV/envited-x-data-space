ALTER TABLE "profile" DROP CONSTRAINT "profile_name_user_name_fk";
--> statement-breakpoint
ALTER TABLE "profilesToBusinessCategories" DROP CONSTRAINT "profilesToBusinessCategories_profile_id_profile_id_fk";
--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "user_issuer_id_issuer_id_fk";
--> statement-breakpoint
ALTER TABLE "usersToCredentialTypes" DROP CONSTRAINT "usersToCredentialTypes_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "usersToRoles" DROP CONSTRAINT "usersToRoles_user_id_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profile" ADD CONSTRAINT "profile_name_user_name_fk" FOREIGN KEY ("name") REFERENCES "user"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profilesToBusinessCategories" ADD CONSTRAINT "profilesToBusinessCategories_profile_id_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_issuer_id_issuer_id_fk" FOREIGN KEY ("issuer_id") REFERENCES "issuer"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "usersToCredentialTypes" ADD CONSTRAINT "usersToCredentialTypes_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "usersToRoles" ADD CONSTRAINT "usersToRoles_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
