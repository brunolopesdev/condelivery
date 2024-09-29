
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const type = searchParams.get("type");

  if (!id || !type) {
    return NextResponse.json({ error: "ID was not provided" }, { status: 400 });
  }

  try {
    const { data } = await axios.get(
      `https://condelivery-backend.vercel.app/${type}/${id}/notificacoes`
    );

    return NextResponse.json({ message: "Notifications found", data });
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
