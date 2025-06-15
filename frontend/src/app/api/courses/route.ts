import { db } from "@/db";
import { courses } from "@/db/schema";
import { InferResponse } from "@/types";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await db.select().from(courses);
  return NextResponse.json(
    result.map((x) => ({ ...x, id: x.id + "", tags: x.tags?.split(",") ?? [] }))
  );
}

export type FindCoursesDto = InferResponse<ReturnType<typeof GET>>;
