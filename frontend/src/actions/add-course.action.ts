"use client";

import { db } from "@/db";
import { courses } from "@/db/schema";

export async function addCourseAction(body: typeof courses.$inferInsert) {
  return db.insert(courses).values(body).returning();
}
