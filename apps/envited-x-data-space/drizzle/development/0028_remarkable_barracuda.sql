CREATE TABLE IF NOT EXISTS "usersToCredentialTypes" (
	"user_id" uuid NOT NULL,
	"credential_type_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "usersToRoles" (
	"user_id" uuid NOT NULL,
	"role_id" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "usersToCredentialTypes" ADD CONSTRAINT "usersToCredentialTypes_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "usersToCredentialTypes" ADD CONSTRAINT "usersToCredentialTypes_credential_type_id_credentialType_id_fk" FOREIGN KEY ("credential_type_id") REFERENCES "public"."credentialType"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "usersToRoles" ADD CONSTRAINT "usersToRoles_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "usersToRoles" ADD CONSTRAINT "usersToRoles_role_id_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."role"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
