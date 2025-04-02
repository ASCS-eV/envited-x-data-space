ALTER TABLE "identifiers" RENAME TO "globalIdentifiers";--> statement-breakpoint
ALTER TABLE "asset" RENAME COLUMN "owner" TO "owner_id";--> statement-breakpoint
ALTER TABLE "issuer" DROP CONSTRAINT "issuer_guid_identifiers_id_fk";
--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "user_guid_identifiers_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "asset" ADD CONSTRAINT "asset_owner_id_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "asset" ADD CONSTRAINT "asset_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "issuer" ADD CONSTRAINT "issuer_guid_globalIdentifiers_id_fk" FOREIGN KEY ("guid") REFERENCES "public"."globalIdentifiers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profile" ADD CONSTRAINT "profile_principal_user_id_user_id_fk" FOREIGN KEY ("principal_user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "token" ADD CONSTRAINT "token_hash_user_id_fk" FOREIGN KEY ("hash") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "token" ADD CONSTRAINT "token_contract_user_id_fk" FOREIGN KEY ("contract") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "token" ADD CONSTRAINT "token_minter_user_id_fk" FOREIGN KEY ("minter") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_guid_globalIdentifiers_id_fk" FOREIGN KEY ("guid") REFERENCES "public"."globalIdentifiers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_issuer_id_issuer_id_fk" FOREIGN KEY ("issuer_id") REFERENCES "public"."issuer"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
