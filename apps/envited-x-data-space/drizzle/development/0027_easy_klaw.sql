CREATE TABLE IF NOT EXISTS "identifiers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"method" text NOT NULL,
	"namespace" text,
	"chain_id" text,
	"nss" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "usersToCredentialTypes" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "usersToRoles" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "usersToCredentialTypes" CASCADE;--> statement-breakpoint
DROP TABLE "usersToRoles" CASCADE;--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "uuid" TO "guid";--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "user_uuid_unique";--> statement-breakpoint
ALTER TABLE "asset" DROP CONSTRAINT "asset_owner_user_id_fk";
--> statement-breakpoint
ALTER TABLE "asset" DROP CONSTRAINT "asset_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "profile" DROP CONSTRAINT "profile_principal_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "user_issuer_id_issuer_id_fk";
--> statement-breakpoint
ALTER TABLE "asset" ALTER COLUMN "owner" SET DATA TYPE uuid USING owner::uuid;--> statement-breakpoint
ALTER TABLE "asset" ALTER COLUMN "user_id" SET DATA TYPE uuid USING user_id::uuid;--> statement-breakpoint
ALTER TABLE "issuer" ALTER COLUMN "id" SET DATA TYPE uuid USING id::uuid;--> statement-breakpoint
ALTER TABLE "profile" ALTER COLUMN "principal_user_id" SET DATA TYPE uuid USING principal_user_id::uuid;--> statement-breakpoint
ALTER TABLE "token" ALTER COLUMN "hash" SET DATA TYPE uuid USING hash::uuid;--> statement-breakpoint
ALTER TABLE "token" ALTER COLUMN "contract" SET DATA TYPE uuid USING contract::uuid;--> statement-breakpoint
ALTER TABLE "token" ALTER COLUMN "minter" SET DATA TYPE uuid USING minter::uuid;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" SET DATA TYPE uuid USING id::uuid;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "issuer_id" SET DATA TYPE uuid USING issuer_id::uuid;--> statement-breakpoint
ALTER TABLE "issuer" ADD COLUMN "guid" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "issuer" ADD CONSTRAINT "issuer_guid_identifiers_id_fk" FOREIGN KEY ("guid") REFERENCES "public"."identifiers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_guid_identifiers_id_fk" FOREIGN KEY ("guid") REFERENCES "public"."identifiers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "asset" DROP COLUMN IF EXISTS "hash";--> statement-breakpoint
ALTER TABLE "issuer" ADD CONSTRAINT "issuer_guid_unique" UNIQUE("guid");--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_guid_unique" UNIQUE("guid");