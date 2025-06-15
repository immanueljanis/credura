import { db } from "@/db";
import { courses } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function updateCourseAction(
  id: string, //
  updates: Partial<typeof courses.$inferInsert>
) {
  try {
    const result = await db.update(courses)
      .set(updates)
      .where(eq(courses.id, BigInt(id)))
      .returning();


    if (result.length === 0) {
      throw new Error(
        `Course with ID ${id} not found or no changes were made.`
      );
    }

    return result[0];
  } catch (error) {
    console.error("Error updating course data:", error);
    throw error;
  }
}
