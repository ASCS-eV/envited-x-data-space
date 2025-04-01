CREATE TABLE IF NOT EXISTS "addressType" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"description" text,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "addressType_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "asset" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cid" text,
	"name" text,
	"metadata" jsonb,
	"manifest" jsonb,
	"status" text,
	"owner_id" uuid,
	"user_id" uuid NOT NULL,
	"token_id" uuid,
	"created_at" timestamp,
	"modified_at" timestamp
);
--> statement-breakpoint
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
CREATE TABLE IF NOT EXISTS "credentialType" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"description" text,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "globalIdentifier" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"method" text NOT NULL,
	"namespace" text,
	"chain_id" text,
	"nss" text NOT NULL,
	"metadata" jsonb,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "composite_identifier_unique" UNIQUE("method","namespace","chain_id","nss")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "issuer" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"globalIdentifierId" uuid,
	"name" text,
	"url" text,
	"type" text,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "issuer_globalIdentifierId_unique" UNIQUE("globalIdentifierId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profile" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"logo" text,
	"street_address" text,
	"postal_code" text,
	"address_locality" text,
	"address_country" text,
	"sales_name" text,
	"sales_phone" text,
	"sales_email" text,
	"principal_user_id" uuid,
	"principal_name" text,
	"principal_phone" text,
	"principal_email" text,
	"website" text,
	"offerings" jsonb,
	"is_published" boolean DEFAULT false,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "profile_name_unique" UNIQUE("name"),
	CONSTRAINT "profile_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profilesToBusinessCategories" (
	"profile_id" uuid NOT NULL,
	"business_category_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "role" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"description" text,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "role_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "token" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"hash_global_identifier_id" uuid,
	"contract_global_identifier_id" uuid,
	"minter_global_identifier_id" uuid,
	"token_id" integer,
	"name" text,
	"description" text,
	"creators" jsonb,
	"publishers" jsonb,
	"date" timestamp,
	"type" text,
	"rights" text,
	"rights_uri" text,
	"language" text,
	"artifact_uri" text,
	"identifier" text,
	"external_uri" text,
	"display_uri" text,
	"token_metadata" jsonb,
	"domain_metadata" jsonb,
	"manifest" jsonb,
	"created_at" timestamp,
	"modified_at" timestamp,
	CONSTRAINT "token_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tokenAttributes" (
	"token_id" uuid,
	"name" text NOT NULL,
	"value" text NOT NULL,
	CONSTRAINT "tokenAttributes_token_id_name_pk" PRIMARY KEY("token_id","name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tokenTag" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "tokenTag_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tokensToTokenTags" (
	"token_id" uuid NOT NULL,
	"tag_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"urn_global_identifier_id" uuid,
	"address_global_identifier_id" uuid,
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
	"issuer_id" uuid NOT NULL,
	"address_type_id" uuid,
	"issuance_date" timestamp,
	"expiration_date" timestamp,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "user_id_unique" UNIQUE("id"),
	CONSTRAINT "user_urn_global_identifier_id_unique" UNIQUE("urn_global_identifier_id"),
	CONSTRAINT "user_name_unique" UNIQUE("name")
);
--> statement-breakpoint
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
 ALTER TABLE "asset" ADD CONSTRAINT "asset_token_id_token_id_fk" FOREIGN KEY ("token_id") REFERENCES "public"."token"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "issuer" ADD CONSTRAINT "issuer_globalIdentifierId_globalIdentifier_id_fk" FOREIGN KEY ("globalIdentifierId") REFERENCES "public"."globalIdentifier"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profile" ADD CONSTRAINT "profile_name_user_name_fk" FOREIGN KEY ("name") REFERENCES "public"."user"("name") ON DELETE no action ON UPDATE no action;
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
 ALTER TABLE "tokensToTokenTags" ADD CONSTRAINT "tokensToTokenTags_token_id_token_id_fk" FOREIGN KEY ("token_id") REFERENCES "public"."token"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tokensToTokenTags" ADD CONSTRAINT "tokensToTokenTags_tag_id_tokenTag_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tokenTag"("id") ON DELETE no action ON UPDATE no action;
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
