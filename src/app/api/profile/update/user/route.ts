import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function PUT(req: NextRequest) {
  try {
    const { id, ...userData } = await req.json();
    const apiUrl = `https://condelivery-backend.vercel.app/usuarios/${id}`;

    const response = await axios.put(apiUrl, userData);

    return NextResponse.json(
      {
        message: "Usuário atualizado com sucesso!",
        user: response.data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Erro ao atualizar usuário",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 400 }
    );
  }
}