import { db } from "@/db";
import { users } from "@/db/schema";
import { InferResponse } from "@/types";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const paramListType = z.object({
  address: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Address"),
});

export async function GET(
  _: NextRequest,
  props: {
    params: Promise<{
      address: string;
    }>;
  }
) {
  const paramList = await paramListType.safeParseAsync(await props.params);
  if (!paramList.success)
    return NextResponse.json(
      {
        success: false,
        error: paramList.error,
      } as const,
      { status: 400 }
    );

  const data = await db
    .select()
    .from(users)
    .where(eq(users.walletAddress, paramList.data.address));

  if (!data.length)
    return NextResponse.json(
      {
        success: false,
        error: "Not Found",
      } as const,
      {
        status: 404,
      }
    );
  return NextResponse.json({
    success: true,
    data,
  } as const);
}

export type FindUserByAddressDto = InferResponse<ReturnType<typeof GET>>;
