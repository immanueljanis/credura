import { NextResponse } from "next/server";

export type InferResponse<T> = T extends Promise<NextResponse<infer R>>
  ? R
  : T extends NextResponse<infer R>
  ? R
  : T;
