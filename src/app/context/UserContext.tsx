import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

interface UserContextType {
  user: {
    id: number;
    name: string;
    email: string;
    type: string;
    phone: number;
    moradores: {
      id: number;
    };
    moradorId: number;
    colaborador: {
      id: number;
      numero_entregas: number;
      avaliacao_media: number;
    };
  } | null;
  setUser: (
    user: {
      id: number;
      name: string;
      email: string;
      type: string;
      phone: number;
      moradores: {
        id: number;
      };
      moradorId: number;
      colaborador: {
        id: number;
        numero_entregas: number;
        avaliacao_media: number;
      };
    } | null
  ) => void;
  updateUser: (user: {
    id: number;
    nome: string;
    email: string;
    type: string;
    telefone: number;
  }) => void;
  getUserOrders: (id: number, type: string) => any;
  ratings: {
    id: number;
    nota: number;
    comentarios: string;
  }[];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState<UserContextType["user"]>(null);
  const [ratings, setRatings] = useState([]);

  const updateUser = async (user: {
    id: number;
    nome: string;
    email: string;
    type: string;
    telefone: number;
  }) => {
    await axios.put(`/api/profile/update/user?id=${user.id}`, user);
  };

  const getAllRatings = async () => {
    const { data } = await axios.get(`/api/profile/rating`);

    setRatings(data.avaliacoes);
  };

  const getUserOrders = async (id: number, type: string) => {
    try {
      const { data } = await axios.get(
        `/api/profile/orders?type=${type}&id=${id}`
      );
      return data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  useEffect(() => {
    getAllRatings();
  }, []);

  useEffect(() => {
    if (session && !user) {
      setUser({
        id: session.user.id,
        phone: session.user.telefone,
        name: session.user.nome,
        email: session.user.email,
        type: session.user.tipo_usuario,
        moradores: session.user.moradores,
        colaborador: session.user.colaborador,
        moradorId: session.user.morador.id,
      });
    }
  }, [session]);

  return (
    <UserContext.Provider
      value={{ user, setUser, updateUser, getUserOrders, ratings }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
