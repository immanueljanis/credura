"use server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

const insertSchema = createInsertSchema(users, {
  walletAddress: (z) => z.regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Address"),
});

export type RegisterActionDto = Omit<
  // @ts-expect-error its because mismatched version of zod
  z.infer<typeof insertSchema>,
  "id" | "createdAt"
>;
export const registerAction = async (body: RegisterActionDto) => {
  const result = await insertSchema.safeParseAsync(body);
  if (!result.success)
    return { success: false, message: result.error.message } as const;
  const r = await db.insert(users).values(result.data).returning();
  return {
    success: true,
    data: r[0],
  } as const;
};
