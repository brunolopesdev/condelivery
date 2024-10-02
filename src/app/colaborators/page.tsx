"use client";
import { Box, Heading, Text, Container, useToast } from "@chakra-ui/react";
import { useEffect, useState, useCallback } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useUserContext } from "../context/UserContext";
import axios from "axios";
import { sendOrderNotification } from "../utils/sendOrderNotification";
import { Orders } from "../profile/page";
import ReportProblemModal from "../components/ReportProblemModal";
import { Ratings } from "../components/ui/RatingsCard";
import ActiveOrders from "./ActiveOrders";
import CompletedOrders from "./CompletedOrders";
import RatingsSection from "./RatingsSection";

const CollaboratorsPage = () => {
  const { user, getUserOrders } = useUserContext();
  const [collaboratorOrders, setCollaboratorOrders] = useState<Orders[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [problemDescription, setProblemDescription] = useState<string>("");
  const [ratings, setRatings] = useState<Ratings[]>([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const fetchRatings = useCallback(async (id: number) => {
    const { data } = await axios.get(`/api/collaborators/ratings?id=${id}`);
    setRatings(data.data);
  }, []);

  const fetchCollaboratorOrders = useCallback(
    async (id: number, type: string) => {
      setLoading(true);
      try {
        const response = await getUserOrders(id, type);
        setCollaboratorOrders(response);
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
        toast({
          title: "Erro ao buscar pedidos.",
          description:
            "Ocorreu um erro ao buscar os pedidos. Tente novamente mais tarde.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    },
    [getUserOrders, toast]
  );

  const updateOrderStatus = useCallback(async (id: number, status: string) => {
    await axios.put(`/api/profile/update/order?id=${id}`, { status });
    setCollaboratorOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    );
  }, []);

  useEffect(() => {
    if (user?.colaborador) {
      fetchRatings(5);
      fetchCollaboratorOrders(5, "colaboradores");
    }
  }, [user, fetchRatings, fetchCollaboratorOrders]);

  return (
    <Container bg="white" minH="100vh" maxW="container.xl">
      <Header title={user?.name || ""} />
      <Box bg="gray.200" p={[4, 6]} textAlign="center" shadow="md">
        <Heading size={["md", "lg"]}>Bem-vindo, Colaborador!</Heading>
        <Text fontSize={["sm", "md"]}>
          Aqui você pode visualizar e entregar os pedidos dos moradores.
        </Text>
      </Box>

      <ActiveOrders
        orders={collaboratorOrders}
        updateOrderStatus={updateOrderStatus}
        loading={loading}
        setSelectedOrderId={setSelectedOrderId}
        sendOrderNotification={sendOrderNotification}
      />

      <CompletedOrders
        loading={loading}
        orders={collaboratorOrders.filter(
          (order) => order.status.toLowerCase() === "entregue"
        )}
      />

      <RatingsSection ratings={ratings} />

      <ReportProblemModal
        isOpen={selectedOrderId !== null}
        onClose={() => setSelectedOrderId(null)}
        handleReportProblem={() => {}}
        problemDescription={problemDescription}
        setProblemDescription={setProblemDescription}
      />

      <Footer />
    </Container>
  );
};

export default CollaboratorsPage;
