ALTER TABLE "scoreboard_items" RENAME COLUMN "quiz_id" TO "student_id";--> statement-breakpoint
ALTER TABLE "scoreboard_items" DROP CONSTRAINT "scoreboard_items_quiz_id_quizzes_id_fk";
--> statement-breakpoint
ALTER TABLE "scoreboard_items" ADD CONSTRAINT "scoreboard_items_student_id_users_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;