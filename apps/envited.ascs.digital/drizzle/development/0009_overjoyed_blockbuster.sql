ALTER TABLE "companyCategory" RENAME TO "businessCategory";--> statement-breakpoint
ALTER TABLE "profilesToCompanyCategories" RENAME TO "profilesToBusinessCategories";--> statement-breakpoint
ALTER TABLE "profilesToBusinessCategories" RENAME COLUMN "company_category_id" TO "business_category_id";--> statement-breakpoint
ALTER TABLE "businessCategory" DROP CONSTRAINT "companyCategory_id_unique";--> statement-breakpoint
ALTER TABLE "businessCategory" DROP CONSTRAINT "companyCategory_name_unique";--> statement-breakpoint
ALTER TABLE "profilesToBusinessCategories" DROP CONSTRAINT "profilesToCompanyCategories_profile_id_profile_id_fk";
--> statement-breakpoint
ALTER TABLE "profilesToBusinessCategories" DROP CONSTRAINT "profilesToCompanyCategories_company_category_id_companyCategory_id_fk";
--> statement-breakpoint
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
--> statement-breakpoint
ALTER TABLE "businessCategory" ADD CONSTRAINT "businessCategory_id_unique" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "businessCategory" ADD CONSTRAINT "businessCategory_name_unique" UNIQUE("name");