import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiUrl = `https://condelivery-backend.vercel.app/login`;

  try {
    const data = await req.json();

    console.log('Data:', data);

    const response = await axios.post(apiUrl, data);

    return NextResponse.json(
      {
        message: "Login realizado!",
        user: response.data,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Erro ao realizar login",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 400 }
    );
  }
}
