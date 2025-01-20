CREATE TABLE IF NOT EXISTS "businessCategory" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"description" text,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "businessCategory_id_unique" UNIQUE("id"),
	CONSTRAINT "businessCategory_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profilesToBusinessCategories" (
	"profile_id" uuid NOT NULL,
	"business_category_id" text NOT NULL
);
--> statement-breakpoint
DROP TABLE "companyCategory" CASCADE;--> statement-breakpoint
DROP TABLE "profilesToCompanyCategories" CASCADE;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profilesToBusinessCategories" ADD CONSTRAINT "profilesToBusinessCategories_profile_id_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profilesToBusinessCategories" ADD CONSTRAINT "profilesToBusinessCategories_business_category_id_businessCategory_id_fk" FOREIGN KEY ("business_category_id") REFERENCES "public"."businessCategory"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
