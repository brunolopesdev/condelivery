import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const apiUrl = `https://condelivery-backend.vercel.app/avaliacoes`;

  try {

    const response = await axios.get(apiUrl);

    return NextResponse.json(
      {
        message: "Avaliações encontradas",
        avaliacoes: response.data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao buscar avaliacoes:", error);

    return NextResponse.json(
      {
        message: "Erro ao cadastrar solicitação",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 400 }
    );
  }
}
