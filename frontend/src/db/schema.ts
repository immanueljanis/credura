import { pgTable, serial } from "drizzle-orm/pg-core";

export const scoreboard = pgTable("scoreboard", {
    id: serial("id").primaryKey(),
})