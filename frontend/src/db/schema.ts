import {
  bigint,
  bigserial,
  boolean,
  index,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: bigserial("id", { mode: "bigint" }).notNull().primaryKey(),
    walletAddress: varchar("wallet_address", { length: 255 })
      .unique()
      .notNull(),
    studentNFTId: bigint("student_nft_id", { mode: "bigint" })
      .unique()
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("wallet_address_idx").on(t.walletAddress)]
);

export const courses = pgTable("courses", {
  id: bigserial("id", { mode: "bigint" }).notNull().primaryKey(),
  courseName: varchar("course_name").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const quizzes = pgTable("quizzes", {
  id: bigserial("id", { mode: "bigint" }).notNull().primaryKey(),
  courseId: bigint("course_id", { mode: "bigint" })
    .references(() => courses.id)
    .notNull(),
  quizName: varchar("quiz_name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const scoreboard = pgTable("scoreboard", {
  id: bigserial("id", { mode: "bigint" }).notNull().primaryKey(),
  quizId: bigint("quiz_id", { mode: "bigint" })
    .references(() => quizzes.id)
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const scoreboardItems = pgTable(
  "scoreboard_items",
  {
    id: bigserial("id", { mode: "bigint" }).notNull().primaryKey(),
    scoreboardId: bigint("scoreboardId", { mode: "bigint" })
      .references(() => scoreboard.id)
      .notNull(),
    studentId: bigint("student_id", { mode: "bigint" })
      .references(() => users.id)
      .notNull(),
    score: bigint("score", { mode: "bigint" }).notNull(),
    completedAt: timestamp("completed_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    isCreditMinted: boolean("is_credit_minted").notNull().default(false),
    isBadgeMinted: boolean("is_badge_minted").notNull().default(false),
  },
  (t) => [
    unique("scoreboard_id_and_student_only_one").on(
      t.scoreboardId,
      t.studentId
    ),
  ]
);

export const daoVotes = pgTable("dao_votes", {
  id: bigserial("id", { mode: "bigint" }).notNull().primaryKey(),
  userId: bigint("user_id", { mode: "bigint" })
    .references(() => users.id)
    .notNull(),
  proposalId: bigint("proposal_id", { mode: "bigint" }).notNull(),
  voteChoice: varchar("vote_choice", { length: 255 }).notNull(),
  votedAt: timestamp("voted_at", { withTimezone: true }).notNull().defaultNow(),
});
