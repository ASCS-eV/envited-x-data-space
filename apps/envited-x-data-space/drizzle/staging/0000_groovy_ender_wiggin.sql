CREATE TABLE IF NOT EXISTS "addressType" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"description" text,
	CONSTRAINT "addressType_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "companyCategory" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"description" text,
	CONSTRAINT "companyCategory_id_unique" UNIQUE("id"),
	CONSTRAINT "companyCategory_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "credentialType" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "issuer" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"url" text,
	"type" text,
	CONSTRAINT "issuer_id_unique" UNIQUE("id")
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
CREATE TABLE IF NOT EXISTS "role" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"description" text,
	CONSTRAINT "role_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"is_ascs_member" boolean,
	"is_envited_member" boolean,
	"street_address" text,
	"postal_code" text,
	"address_locality" text,
	"address_country" text,
	"vat_id" text,
	"privacy_policy_accepted" text,
	"articles_of_association_accepted" text,
	"contribution_rules_accepted" text,
	"issuer_id" text NOT NULL,
	"address_type_id" uuid,
	"issuance_date" timestamp,
	"expiration_date" timestamp,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "user_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "usersToCredentialTypes" (
	"user_id" text NOT NULL,
	"credential_type_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "usersToRoles" (
	"user_id" text NOT NULL,
	"role_id" text NOT NULL
);
--> statement-breakpoint
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
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_issuer_id_issuer_id_fk" FOREIGN KEY ("issuer_id") REFERENCES "public"."issuer"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_address_type_id_addressType_id_fk" FOREIGN KEY ("address_type_id") REFERENCES "public"."addressType"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
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
