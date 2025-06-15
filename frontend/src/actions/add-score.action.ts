"use server";

import { db } from "@/db";
import { scoreboardItems } from "@/db/schema";

export type AddScoreActionDto = {
  scoreboardId: string;
  studentId: string;
  score: string;
};

export async function addScoreAction(body: AddScoreActionDto) {
  await db.insert(scoreboardItems)
    .values({
      score: BigInt(body.scoreboardId),
      scoreboardId: BigInt(body.scoreboardId),
      studentId: BigInt(body.studentId),
    })
    .onConflictDoUpdate({
      target: [scoreboardItems.scoreboardId, scoreboardItems.studentId],
      set: {
        score: BigInt(body.score),
      },
    });

    return { success: true };
}
