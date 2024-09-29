import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiUrl = `https://condelivery-backend.vercel.app/usuarios`;

  try {
    const data = await req.json();

    const response = await axios.post(apiUrl, data);

    return NextResponse.json(
      {
        message: "Usuário cadastrado com sucesso!",
        user: response.data,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Erro ao cadastrar usuário",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 400 }
    );
  }
}
