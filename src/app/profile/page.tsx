"use client";

import {
  Box,
  Flex,
  Avatar,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  VStack,
  HStack,
  Container,
  useToast,
  Progress,
  Tooltip,
  Badge,
  Skeleton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Icon,
} from "@chakra-ui/react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useUserContext } from "../context/UserContext";
import { ChangeEvent, useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";

interface User {
  id: number;
  nome: string;
  email: string;
  type: string;
  telefone: string;
}

export interface Orders {
  codigo_confirmacao: string;
  data_entrega: string;
  id: number;
  plataforma: string[];
  status: string;
  complemento: string;
  colaborador?: {
    id: number;
  };
  morador: {
    id: number;
  };
}

const statusArray = ["Cancelado", "Pendente", "Entrega iniciada", "Entregue"];

const ProfilePage = () => {
  const { user, updateUser, getUserOrders } = useUserContext();
  const [userOrders, setUserOrders] = useState<Orders[]>([]);
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();
  const [updatedUser, setUpdatedUser] = useState<User>({
    id: user?.id || 0,
    nome: user?.name || "",
    email: user?.email || "",
    type: user?.type || "",
    telefone: user?.phone?.toString() || "",
  });

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOrder, setSelectedOrder] = useState<Orders | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [comments, setComments] = useState<string>("");

  const handleInputChange =
    (field: keyof User) => (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      if (user) {
        setUpdatedUser((prev) => ({
          ...prev,
          id: user?.id,
          [field]: value,
        }));
      }
    };

  const handleSave = async () => {
    if (!updatedUser.nome || !updatedUser.email || !updatedUser.telefone) {
      toast({
        title: "Erro",
        description: "Todos os campos devem ser preenchidos.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (updatedUser.id) {
      try {
        await updateUser({
          ...updatedUser,
          telefone: Number(updatedUser.telefone),
        });
        toast({
          title: "Sucesso",
          description: "Usuário atualizado com sucesso!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Failed to update user:", error);
      }
    }
  };

  const fetchOrders = async (id: number) => {
    if (id) {
      const orders = await getUserOrders(id, "moradores");
      
      setUserOrders(orders);
    }
  };

  const handleRatingSubmit = async () => {
    if (!selectedOrder) return;

    try {
      await axios.post(`/api/profile/rating`, {
        nota: rating,
        comentarios: comments,
        moradorId: user?.moradorId,
        colaboradorId: selectedOrder.colaborador?.id,
        data_avaliacao: new Date().toISOString(),
      });

      toast({
        title: "Avaliação enviada!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setRating(0);
      setComments("");
      onClose();
    } catch (error) {
      toast({
        title: "Erro ao enviar avaliação.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`/api/profile/delete/user?id=${user?.id}`);
      toast({
        title: "Usuário excluído com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erro ao excluir usuário.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    onDeleteModalClose();
  };

  useEffect(() => {
    if (user?.moradorId) {
      fetchOrders(3);
    }
  }, [user]);

  return (
    <Container minH="100vh" maxW="container.xl">
      <Header title="Perfil" />

      <Box bg="white" borderRadius="md" shadow="md">
        <Flex bg="gray.100" align="center" mb={4} p={4}>
          <Avatar size="xl" name={user?.name} src="" />
          <VStack align="start" ml={4}>
            <Heading size="md">{user?.name}</Heading>
            <Text color="gray.500">Detalhes do Perfil</Text>
          </VStack>
          <VStack ml="auto">
            <Button colorScheme="blue" size={"sm"}>
              Editar Perfil
            </Button>
            <Button colorScheme="red" size={"sm"} onClick={onDeleteModalOpen}>
              Excluir Perfil
            </Button>
          </VStack>
        </Flex>

        <Heading size="md" mb={4} p={4}>
          Informações Pessoais
        </Heading>
        <Text mb={4} p={4}>
          Atualize suas informações
        </Text>
        <VStack spacing={4} align="stretch" p={4}>
          <HStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>E-mail</FormLabel>
              <Input
                type="email"
                placeholder="Digite seu novo e-mail"
                value={updatedUser.email}
                onChange={handleInputChange("email")}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Nome</FormLabel>
              <Input
                type="text"
                placeholder="Digite seu nome"
                value={updatedUser.nome}
                onChange={handleInputChange("nome")}
              />
            </FormControl>
          </HStack>
          <HStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Telefone</FormLabel>
              <Input
                type="tel"
                placeholder="Telefone"
                value={updatedUser.telefone}
                onChange={handleInputChange("telefone")}
              />
            </FormControl>
          </HStack>
          <Button colorScheme="green" onClick={handleSave}>
            Salvar alterações
          </Button>
        </VStack>
      </Box>

      <Box bg="white" mt={4} p={4} borderRadius="md" shadow="md">
        <Heading size="md" mb={4}>
          Últimos Pedidos
        </Heading>
        {userOrders.length === 0 && (
          <Text>Você ainda não fez nenhum pedido.</Text>
        )}
        {userOrders.length > 0 && (
          <Skeleton h={200} isLoaded={userOrders.length > 0}>
            <Flex gap={4}>
              {userOrders.length > 0 &&
                userOrders.map((order) => (
                  <Box
                    key={order.id}
                    borderWidth="1px"
                    borderRadius="lg"
                    p={4}
                    width="300px"
                    shadow="md"
                  >
                    <Heading size="sm" mb={2}>
                      <Badge colorScheme="red" fontSize="16px">
                        {order.plataforma}
                      </Badge>
                    </Heading>
                    <Text
                      fontSize="sm"
                      color="gray.500"
                      mb={2}
                      fontWeight={600}
                    >
                      <Badge>Data:</Badge>{" "}
                      {new Date(order.data_entrega).toLocaleDateString()}
                    </Text>
                    <Text fontSize="sm" color="gray.500" mb={2}>
                      <Tooltip label="Informe esse código ao Colaborador para confirmar a sua entrega!">
                        <Badge>Código: {order.codigo_confirmacao}</Badge>
                      </Tooltip>
                    </Text>
                    <Text
                      fontSize="sm"
                      color="gray.500"
                      mb={4}
                      fontWeight={600}
                    >
                      <Badge>Status:</Badge> {order.status}
                    </Text>

                    <Progress
                      colorScheme={
                        order.status === "Pendente"
                          ? "yellow"
                          : order.status === "Entrega iniciada"
                          ? "orange"
                          : order.status === "Entregue"
                          ? "green"
                          : order.status === "Cancelado"
                          ? "red"
                          : "gray"
                      }
                      value={
                        (statusArray.indexOf(order.status) + 1) *
                        (100 / statusArray.length)
                      }
                      size="sm"
                      mb={4}
                    />

                    {order.status === "Entregue" && (
                      <Text
                        color={"grey"}
                        fontSize="sm"
                        onClick={() => {
                          setSelectedOrder(order);
                          onOpen();
                        }}
                      >
                        Avaliar Entrega
                      </Text>
                    )}
                  </Box>
                ))}
            </Flex>
          </Skeleton>
        )}
      </Box>

      <Modal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Excluir Perfil</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Tem certeza que deseja excluir o perfil? Esta ação não pode ser
              desfeita.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={handleDeleteUser}>
              Sim, Excluir
            </Button>
            <Button variant="ghost" onClick={onDeleteModalClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Avalie sua entrega</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Nota</FormLabel>
              <HStack>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Tooltip key={star} label={`${star} estrela(s)`}>
                    <Icon
                      as={star <= rating ? AiFillStar : AiOutlineStar}
                      boxSize={8}
                      color={star <= rating ? "yellow.400" : "gray.300"}
                      onClick={() => setRating(star)}
                      cursor="pointer"
                    />
                  </Tooltip>
                ))}
              </HStack>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Comentários</FormLabel>
              <Input
                type="text"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Comentários sobre a entrega"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleRatingSubmit}>
              Enviar Avaliação
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

export default ProfilePage;
