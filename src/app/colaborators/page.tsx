"use client";
import {
  Box,
  Flex,
  Button,
  Heading,
  Text,
  HStack,
  Avatar,
  Icon,
  Container,
  Tooltip,
  Badge,
  Skeleton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useUserContext } from "../context/UserContext";
import { useEffect, useState } from "react";
import { Orders } from "../profile/page";
import axios from "axios";
import { sendOrderNotification } from "../utils/sendOrderNotification";

interface Ratings {
  id: number;
  nota: number;
  data_avaliacao: string;
  comentarios: string;
}

const CollaboratorsPage = () => {
  const { user, getUserOrders } = useUserContext();
  const [collaboratorOrders, setCollaboratorOrders] = useState<Orders[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [problemDescription, setProblemDescription] = useState<string>("");
  const [ratings, setRatings] = useState<Ratings[]>([]);
  const toast = useToast();

  const handleReportProblem = async () => {
    if (selectedOrderId) {
      try {
        await axios.post(`/api/support/create`, {
          tipo_problema: "Entrega",
          status: "Pendente",
          colaboradorId: user?.colaborador?.id,
          descricao: problemDescription,
          data_solicitacao: new Date(),
        });

        toast({
          title: "Solicitação enviada.",
          description: "Seu problema foi relatado com sucesso.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        setProblemDescription("");
        setSelectedOrderId(null);
        onClose();
      } catch (error) {
        console.error("Erro ao enviar solicitação:", error);

        toast({
          title: "Erro ao enviar solicitação.",
          description:
            "Ocorreu um erro ao relatar o problema. Tente novamente mais tarde.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const fetchRatings = async (id: number) => {
    const { data } = await axios.get(`/api/collaborators/ratings?id=${id}`);

    setRatings(data.data);
  };

  const fetchCollaboratorOrders = async (id: number, type: string) => {
    const response = await getUserOrders(id, type);
    setCollaboratorOrders(response);
  };

  const updateOrderStatus = async (id: number, status: string) => {
    const { data } = await axios.put(`/api/profile/update/order?id=${id}`, {
      status,
    });

    setCollaboratorOrders((prevOrders) => {
      const updatedOrders = prevOrders.map((order) => {
        if (order.id === id) {
          return { ...order, status: status };
        }
        return order;
      });

      return updatedOrders;
    });
  };

  useEffect(() => {
    if (user?.colaborador) {
      fetchRatings(user?.colaborador.id);
      fetchCollaboratorOrders(user.colaborador.id, "colaboradores");
    }
  }, [user]);

  return (
    <Container bg="white" minH="100vh" maxW="container.xl" p={0}>
      <Header title="{nome colaborador}" />

      <Box bg="gray.200" p={6} textAlign="center" shadow="md">
        <Heading size="lg">Bem-vindo, Colaborador!</Heading>
        <Text>
          Aqui você pode visualizar e entregar os pedidos dos moradores.
        </Text>
      </Box>

      <Box mt={6}>
        <Heading size="md" mb={4} textAlign="center">
          Pedidos Ativos
        </Heading>
        {collaboratorOrders.length === 0 && (
          <Text textAlign="center" color="gray.500">
            Nenhum pedido ativo no momento.
          </Text>
        )}
        {collaboratorOrders.length > 0 && (
          <Skeleton isLoaded={collaboratorOrders.length > 0} h={300}>
            <Flex gap={4} wrap="wrap" justify="center">
              {collaboratorOrders.map((order, index) => {
                if (order.status.toLowerCase() !== "entregue") {
                  return (
                    <Box
                      bg="white"
                      p={4}
                      borderRadius="md"
                      shadow="md"
                      width="300px"
                      key={order.id}
                    >
                      <Heading size="sm" mb={2}>
                        Pedido {index + 1}
                      </Heading>
                      <Text mb={2}>
                        <Badge colorScheme="blue" fontSize="16px">
                          {order.plataforma}
                        </Badge>
                      </Text>
                      <Text fontSize="sm" color="gray.500" mb={2}>
                        <Tooltip label="Solicite esse código ao morador para concluir a entrega!">
                          <Badge>Código: {order.codigo_confirmacao}</Badge>
                        </Tooltip>
                      </Text>
                      <Text fontSize="sm" color="gray.500" fontWeight={600}>
                        <Badge>Data:</Badge>{" "}
                        {new Date(order.data_entrega).toLocaleDateString()}
                      </Text>
                      <Text fontSize="sm" color="gray.500" fontWeight={600}>
                        <Badge>Local de entrega:</Badge>{" "}
                        {order.complemento && order?.complemento}
                      </Text>
                      <Text
                        color={
                          order.status.toLowerCase() === "entregue"
                            ? "green.500"
                            : "yellow.500"
                        }
                        mt={2}
                        fontWeight={600}
                        textTransform={"capitalize"}
                      >
                        <Badge>Status:</Badge> {order.status}
                      </Text>
                      <HStack mt={2} justify="center">
                        {order.status.toLowerCase() === "pendente" && (
                          <Button
                            colorScheme="blue"
                            size="sm"
                            onClick={() => [
                              updateOrderStatus(order.id, "entrega iniciada"),
                              sendOrderNotification(
                                order.morador?.id,
                                `A entrega do pedido ${order.codigo_confirmacao} foi iniciada.`
                              ),
                            ]}
                          >
                            Iniciar entrega
                          </Button>
                        )}
                        {order.status.toLowerCase() === "entrega iniciada" && (
                          <Button
                            colorScheme="green"
                            size="sm"
                            onClick={() => [
                              updateOrderStatus(order.id, "entregue"),
                              sendOrderNotification(
                                order.morador?.id,
                                `A entrega do pedido ${order.codigo_confirmacao} foi concluída.`
                              ),
                            ]}
                          >
                            Concluir entrega
                          </Button>
                        )}
                        {order.status.toLowerCase() === "entregue" && (
                          <Button colorScheme="gray" size="sm" disabled>
                            Entrega finalizada
                          </Button>
                        )}
                        {order.status.toLowerCase() === "cancelado" && (
                          <Button colorScheme="red" size="sm" disabled>
                            Cancelado
                          </Button>
                        )}
                      </HStack>
                      <Text
                        color="grey"
                        fontSize={"small"}
                        mt={2}
                        textAlign={"center"}
                      >
                        Problemas com o pedido?{" "}
                        <Button
                          variant="link"
                          colorScheme="red"
                          size="sm"
                          onClick={() => {
                            setSelectedOrderId(order.id);
                            onOpen();
                          }}
                        >
                          Relatar
                        </Button>
                      </Text>
                    </Box>
                  );
                }
              })}
            </Flex>
          </Skeleton>
        )}
      </Box>

      {collaboratorOrders.length > 0 && (
        <Box mt={8}>
          <Heading size="md" mb={4} textAlign="center">
            Pedidos Concluídos
          </Heading>
          <Flex gap={6} justify="center">
            {collaboratorOrders.map((order, index) => {
              if (order.status.toLowerCase() === "entregue") {
                return (
                  <Box
                    bg="white"
                    p={4}
                    borderRadius="md"
                    shadow="md"
                    width="300px"
                    key={order.id}
                  >
                    <Heading size="sm" mb={2}>
                      Pedido {index + 1}
                    </Heading>
                    <Text mb={2}>
                      <Badge colorScheme="red" fontSize="16px">
                        {order.plataforma}
                      </Badge>
                    </Text>
                    <Text fontSize="sm" color="gray.500" mb={2}>
                      <Badge>Código: {order.codigo_confirmacao}</Badge>
                    </Text>
                    <Text fontSize="sm" color="gray.500" fontWeight={600}>
                      <Badge>Data:</Badge>{" "}
                      {new Date(order.data_entrega).toLocaleDateString()}
                    </Text>
                    <Text fontSize="sm" color="gray.500" fontWeight={600}>
                      <Badge>Local de entrega:</Badge>{" "}
                      {order.complemento && order?.complemento}
                    </Text>
                    <Text
                      color={
                        order.status.toLowerCase() === "entregue"
                          ? "green.500"
                          : "yellow.500"
                      }
                      mt={2}
                      fontWeight={600}
                      textTransform={"capitalize"}
                    >
                      <Badge>Status:</Badge> {order.status}
                    </Text>
                    <HStack mt={2} justify="center">
                      <Icon as={FaCheckCircle} color="green.500" />
                      <Text color="green.500" fontWeight="600">
                        Entregue
                      </Text>
                    </HStack>
                  </Box>
                );
              }
            })}
          </Flex>
        </Box>
      )}

      {collaboratorOrders.length > 0 && (
        <Skeleton isLoaded={ratings.length > 0} h={200}>
          <Box mt={8}>
            <Heading size="md" mb={4} textAlign="center">
              Avaliações dos Pedidos
            </Heading>
            {ratings.map((rating, index) => (
              <Flex gap={4} justify="center" key={rating.id}>
                <Box
                  bg="white"
                  p={4}
                  borderRadius="md"
                  shadow="md"
                  width="300px"
                >
                  <Text textAlign={"center"} fontWeight={600}>
                    Avaliação {index + 1}
                  </Text>
                  <Text textAlign={"center"}>
                    {Array.from({ length: 5 }, (_, i) =>
                      i < rating.nota ? "⭐" : "☆"
                    )}
                  </Text>

                  <Text
                    fontSize="sm"
                    color="gray.500"
                    textAlign={"center"}
                    fontWeight={600}
                  >
                    {rating.comentarios}
                  </Text>
                </Box>
              </Flex>
            ))}
          </Box>
        </Skeleton>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Relatar Problema</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              placeholder="Descreva o problema..."
              value={problemDescription}
              onChange={(e) => setProblemDescription(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleReportProblem}>
              Enviar
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Footer />
    </Container>
  );
};

export default CollaboratorsPage;
