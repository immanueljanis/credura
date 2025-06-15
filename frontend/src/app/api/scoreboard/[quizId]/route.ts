import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, props: {
    params: Promise<{ quizId: string }>
}) {
    const paramList = await props.params;
    paramList.quizId;
    return NextResponse.json({ success: true });
}