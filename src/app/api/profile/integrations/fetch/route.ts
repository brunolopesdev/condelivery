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
      `https://condelivery-backend.vercel.app/moradores/${id}/integracoes`
    );

    return NextResponse.json({ message: "Data found", data });
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
