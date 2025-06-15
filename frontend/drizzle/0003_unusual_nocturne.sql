ALTER TABLE "courses" ADD COLUMN "instructor" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "duration" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "level" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "student_enrolled" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "rating" double precision DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "price" double precision DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "image" varchar;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "tags" varchar;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "category" varchar;--> statement-breakpoint
ALTER TABLE "scoreboard_items" ADD CONSTRAINT "scoreboard_id_and_student_only_one" UNIQUE("scoreboardId","student_id");