import { db } from "@/db";
import { scoreboard } from "@/db/schema";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
 await db.select().from(scoreboard);
  return NextResponse.json({
    hello: "world",
  });
};
