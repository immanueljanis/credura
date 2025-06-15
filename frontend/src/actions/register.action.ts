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
  try {
    const r = await db.insert(users).values(body).returning();
    return {
      success: true,
      data: r[0],
    } as const;
  } catch (err) {
    return {
      success: false,
      message: "User Already Registered",
    };
  }
};
