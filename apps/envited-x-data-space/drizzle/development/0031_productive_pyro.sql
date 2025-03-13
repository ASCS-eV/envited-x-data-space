ALTER TABLE "globalIdentifiers" RENAME TO "globalIdentifier";--> statement-breakpoint
ALTER TABLE "issuer" RENAME COLUMN "guid" TO "globalIdentifierId";--> statement-breakpoint
ALTER TABLE "token" RENAME COLUMN "hash_guid" TO "hash_global_identifier_id";--> statement-breakpoint
ALTER TABLE "token" RENAME COLUMN "contract_guid" TO "contract_global_identifier_id";--> statement-breakpoint
ALTER TABLE "token" RENAME COLUMN "minter_guid" TO "minter_global_identifier_id";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "guid" TO "urn_global_identifier_id";--> statement-breakpoint
ALTER TABLE "issuer" DROP CONSTRAINT "issuer_id_unique";--> statement-breakpoint
ALTER TABLE "issuer" DROP CONSTRAINT "issuer_guid_unique";--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "user_guid_unique";--> statement-breakpoint
ALTER TABLE "issuer" DROP CONSTRAINT "issuer_guid_globalIdentifiers_id_fk";
--> statement-breakpoint
ALTER TABLE "token" DROP CONSTRAINT "token_hash_guid_globalIdentifiers_id_fk";
--> statement-breakpoint
ALTER TABLE "token" DROP CONSTRAINT "token_contract_guid_globalIdentifiers_id_fk";
--> statement-breakpoint
ALTER TABLE "token" DROP CONSTRAINT "token_minter_guid_globalIdentifiers_id_fk";
--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "user_guid_globalIdentifiers_id_fk";
--> statement-breakpoint
ALTER TABLE "issuer" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "globalIdentifier" ADD COLUMN "metadata" jsonb;--> statement-breakpoint
ALTER TABLE "globalIdentifier" ADD COLUMN "created_at" timestamp;--> statement-breakpoint
ALTER TABLE "globalIdentifier" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "address_global_identifier_id" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "issuer" ADD CONSTRAINT "issuer_globalIdentifierId_globalIdentifier_id_fk" FOREIGN KEY ("globalIdentifierId") REFERENCES "public"."globalIdentifier"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "token" ADD CONSTRAINT "token_hash_global_identifier_id_globalIdentifier_id_fk" FOREIGN KEY ("hash_global_identifier_id") REFERENCES "public"."globalIdentifier"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "token" ADD CONSTRAINT "token_contract_global_identifier_id_globalIdentifier_id_fk" FOREIGN KEY ("contract_global_identifier_id") REFERENCES "public"."globalIdentifier"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "token" ADD CONSTRAINT "token_minter_global_identifier_id_globalIdentifier_id_fk" FOREIGN KEY ("minter_global_identifier_id") REFERENCES "public"."globalIdentifier"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_urn_global_identifier_id_globalIdentifier_id_fk" FOREIGN KEY ("urn_global_identifier_id") REFERENCES "public"."globalIdentifier"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_address_global_identifier_id_globalIdentifier_id_fk" FOREIGN KEY ("address_global_identifier_id") REFERENCES "public"."globalIdentifier"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "issuer" ADD CONSTRAINT "issuer_globalIdentifierId_unique" UNIQUE("globalIdentifierId");--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_urn_global_identifier_id_unique" UNIQUE("urn_global_identifier_id");