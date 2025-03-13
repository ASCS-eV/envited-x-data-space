ALTER TABLE "token" RENAME COLUMN "hash" TO "hash_guid";--> statement-breakpoint
ALTER TABLE "token" RENAME COLUMN "contract" TO "contract_guid";--> statement-breakpoint
ALTER TABLE "token" RENAME COLUMN "minter" TO "minter_guid";--> statement-breakpoint
ALTER TABLE "token" DROP CONSTRAINT "token_hash_user_id_fk";
--> statement-breakpoint
ALTER TABLE "token" DROP CONSTRAINT "token_contract_user_id_fk";
--> statement-breakpoint
ALTER TABLE "token" DROP CONSTRAINT "token_minter_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "token" ADD CONSTRAINT "token_hash_guid_globalIdentifiers_id_fk" FOREIGN KEY ("hash_guid") REFERENCES "public"."globalIdentifiers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "token" ADD CONSTRAINT "token_contract_guid_globalIdentifiers_id_fk" FOREIGN KEY ("contract_guid") REFERENCES "public"."globalIdentifiers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "token" ADD CONSTRAINT "token_minter_guid_globalIdentifiers_id_fk" FOREIGN KEY ("minter_guid") REFERENCES "public"."globalIdentifiers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
