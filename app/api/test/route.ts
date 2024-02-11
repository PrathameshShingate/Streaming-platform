import { connectToDatabase, disconnectFromDatabase } from "@/lib/database";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await connectToDatabase();

    if (!db) {
      return new NextResponse("DATABASE_CONNECTION_ERR", { status: 500 });
    }

    return new NextResponse("Test api");
  } catch (error) {
    console.log("TEST_ERR", error);
    return new NextResponse("INTERNAL_SERVER_ERROR", { status: 500 });
  } finally {
    // await disconnectFromDatabase();
  }
}
