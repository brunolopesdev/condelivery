import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiUrl = `https://condelivery-backend.vercel.app/suportes`;

  try {
    const data = await req.json();

    const response = await axios.post(apiUrl, data);

    return NextResponse.json(
      {
        message: "Solicitação cadastrada com sucesso!",
        suporte: response.data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao cadastrar suporte:", error);

    return NextResponse.json(
      {
        message: "Erro ao cadastrar solicitação",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 400 }
    );
  }
}
