import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiUrl = `https://condelivery-backend.vercel.app/integracoes`;

  try {
    const data = await req.json();

    const response = await axios.post(apiUrl, data);

    return NextResponse.json(
      {
        message: "Integração cadastrada com sucesso!",
        data: response.data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao cadastrar Integração:", error);

    return NextResponse.json(
      {
        message: "Erro ao cadastrar Integração",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 400 }
    );
  }
}
