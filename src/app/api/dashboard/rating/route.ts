import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Id não fornecido" }, { status: 400 });
  }

  try {
    const { data } = await axios.get(
      `https://condelivery-backend.vercel.app/colaboradores/${id}/avaliacoes`
    );

    return NextResponse.json({ message: "Ratings found", data });
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch Ratings" },
      { status: 500 }
    );
  }
}
