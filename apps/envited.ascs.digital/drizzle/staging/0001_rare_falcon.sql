CREATE TABLE IF NOT EXISTS "companyCategory" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"description" text,
	CONSTRAINT "companyCategory_id_unique" UNIQUE("id"),
	CONSTRAINT "companyCategory_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profile" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"description" text,
	"logo" text,
	"street_address" text,
	"postal_code" text,
	"address_locality" text,
	"address_country" text,
	"first_name" text,
	"last_name" text,
	"phone" text,
	"email" text,
	"website" text,
	"offerings" jsonb,
	CONSTRAINT "profile_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profilesToCompanyCategories" (
	"profile_id" uuid NOT NULL,
	"company_category_id" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "address_location" TO "address_locality";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profilesToCompanyCategories" ADD CONSTRAINT "profilesToCompanyCategories_profile_id_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profilesToCompanyCategories" ADD CONSTRAINT "profilesToCompanyCategories_company_category_id_companyCategory_id_fk" FOREIGN KEY ("company_category_id") REFERENCES "public"."companyCategory"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
