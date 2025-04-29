ALTER TABLE "globalIdentifier" RENAME COLUMN "nss" TO "scoped_identifier";--> statement-breakpoint
ALTER TABLE "globalIdentifier" DROP CONSTRAINT "composite_identifier_unique";--> statement-breakpoint
ALTER TABLE "globalIdentifier" ADD COLUMN "fqdn" text;--> statement-breakpoint
ALTER TABLE "globalIdentifier" ADD CONSTRAINT "composite_identifier_unique" UNIQUE("method","namespace","chain_id","scoped_identifier");