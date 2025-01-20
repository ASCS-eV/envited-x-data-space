ALTER TABLE "profile" ALTER COLUMN "slug" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "profile" ADD CONSTRAINT "profile_slug_unique" UNIQUE("slug");