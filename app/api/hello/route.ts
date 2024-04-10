import main from "@/drizzle/health";
import { NextResponse } from "next/server";

main();

export async function GET() {
  const data = {
    name: "Dendi",
    age: "21",
  };

  return NextResponse.json({ data });
}
