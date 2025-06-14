CREATE TABLE "courses" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"course_name" varchar NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "dao_votes" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"user_id" bigint NOT NULL,
	"proposal_id" bigint NOT NULL,
	"vote_choice" varchar(255) NOT NULL,
	"voted_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quizzes" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"course_id" bigint NOT NULL,
	"quiz_name" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "scoreboard" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"quiz_id" bigint NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "scoreboard_items" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"scoreboardId" bigint NOT NULL,
	"quiz_id" bigint NOT NULL,
	"score" bigint NOT NULL,
	"completed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"is_credit_minted" boolean DEFAULT false NOT NULL,
	"is_badge_minted" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"wallet_address" varchar(255) NOT NULL,
	"student_nft_id" bigint NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "dao_votes" ADD CONSTRAINT "dao_votes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quizzes" ADD CONSTRAINT "quizzes_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scoreboard" ADD CONSTRAINT "scoreboard_quiz_id_quizzes_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scoreboard_items" ADD CONSTRAINT "scoreboard_items_scoreboardId_scoreboard_id_fk" FOREIGN KEY ("scoreboardId") REFERENCES "public"."scoreboard"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scoreboard_items" ADD CONSTRAINT "scoreboard_items_quiz_id_quizzes_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("id") ON DELETE no action ON UPDATE no action;