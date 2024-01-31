ALTER TABLE "profile" RENAME COLUMN "first_name" TO "sales_name";--> statement-breakpoint
ALTER TABLE "profile" RENAME COLUMN "phone" TO "sales_phone";--> statement-breakpoint
ALTER TABLE "profile" RENAME COLUMN "email" TO "sales_email";--> statement-breakpoint
ALTER TABLE "profile" RENAME COLUMN "last_name" TO "principal_name";--> statement-breakpoint
ALTER TABLE "profile" ADD COLUMN "slug" text;--> statement-breakpoint
ALTER TABLE "profile" ADD COLUMN "principal_phone" text;--> statement-breakpoint
ALTER TABLE "profile" ADD COLUMN "principal_email" text;