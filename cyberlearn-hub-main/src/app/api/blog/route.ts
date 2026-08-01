import { NextResponse } from "next/server";
import { articles } from "@/data/site";

export async function GET() {
  return NextResponse.json(articles);
}
