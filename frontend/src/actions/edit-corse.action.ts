import { db } from "@/db";
import { courses } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function updateCourseAction(
  id: string, // ID kursus yang akan diupdate
  updates: Partial<typeof courses.$inferInsert> // Bagian data yang ingin diupdate
) {
  try {
   
    const result = await db.update(courses)
      .set(updates)
      .where(eq(courses.id, id))
      .returning();

    // Pastikan ada hasil yang dikembalikan. Jika tidak ada, kemungkinan ID tidak ditemukan.
    if (result.length === 0) {
      throw new Error(`Course with ID ${id} not found or no changes were made.`);
    }

    return result[0]; // Mengembalikan objek kursus yang sudah diupdate
  } catch (error) {
    console.error("Error updating course data:", error);
    throw error; // Lempar kembali error agar bisa ditangani di komponen yang memanggil
  }
}
