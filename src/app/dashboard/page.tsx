"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  VStack,
  Heading,
  Button,
  Spacer,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import {
  FaHome,
  FaUsers,
  FaTruck,
  FaListAlt,
  FaBuilding,
} from "react-icons/fa";
import axios from "axios";

import Pedidos from "../components/dashboard/Orders";
import Entregas from "../components/dashboard/Deliveries";
import Colaboradores from "../components/dashboard/Collaborators";
import Condominios from "../components/dashboard/Condos";
import Moradores from "../components/dashboard/Residents";
import Overview from "../components/dashboard/Overview";
import { RegistrationModal } from "../components/RegistrationModal";
import { CreateOrderModal } from "../components/dashboard/CreateOrderModal";

export interface Users {
  id: number;
  nome: string;
  email: string;
  tipo_usuario: string;
  moradores: {
    id: number;
  }[]
}
export interface Collaborators {
  avaliacao_media: number;
  data_contratacao: string;
  id: number;
  numero_entregas: number;
}

export interface Deliveries {
  id: number;
  data_entrega: string;
  status: string;
  plataforma: string;
  complemento: string;
  codigo_confirmacao: string;
}

export interface Condos {
  data_registro: string;
  endereco: string;
  id: number;
  nome: string;
  numero_moradores: number;
  taxa_condominio: number;
}

interface DashboardData {
  users: Users[];
  deliveries: Deliveries[];
  orders: any[];
  condos: Condos[];
  collaborators: Collaborators[];
}

export default function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isPedidoModalOpen,
    onOpen: onPedidoModalOpen,
    onClose: onPedidoModalClose,
  } = useDisclosure();
  const {
    isOpen: isUserModalOpen,
    onOpen: onUserModalOpen,
    onClose: onUserModalClose,
  } = useDisclosure();

  const [activeSection, setActiveSection] = useState("Overview");
  const [data, setData] = useState({
    users: [] as DashboardData["users"],
    deliveries: [],
    orders: [],
    condos: [],
    collaborators: [],
  });

  const [loading, setLoading] = useState(true);

  const renderSection = () => {
    switch (activeSection) {
      case "Pedidos":
        return <Pedidos deliveries={data.deliveries} />;
      case "Entregas":
        return <Entregas deliveries={data.deliveries} />;
      case "Colaboradores":
        return <Colaboradores collaborators={data.collaborators} />;
      case "Condomínios":
        return <Condominios condos={data.condos} />;
      case "Moradores":
        return <Moradores residents={data.users} />;
      default:
        return <Overview data={data} />;
    }
  };

  const fetchAllData = async () => {
    try {
      const response = await axios.get("/api/dashboard");
      console.log('Response: ', response.data);
      setData(response.data);
      console.log("Data: ", response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  if (loading) {
    return <Flex height="100vh" alignItems={'center'} justifyContent={'center'}><Spinner size={'xl'}/></Flex>;
  }

  return (
    <Flex height="100vh">
      <Box bg="blue.900" w="250px" color="white" p={4}>
        <Heading as="h3" size="lg" textAlign="center" mb={8}>
          Condelivery Admin
        </Heading>
        <VStack as="nav" spacing={4}>
          <Button
            variant="ghost"
            leftIcon={<FaHome />}
            onClick={() => setActiveSection("Overview")}
            colorScheme="whiteAlpha"
            width="full"
          >
            Visão Geral
          </Button>
          <Button
            variant="ghost"
            leftIcon={<FaListAlt />}
            onClick={() => setActiveSection("Pedidos")}
            colorScheme="whiteAlpha"
            width="full"
          >
            Pedidos
          </Button>
          <Button
            variant="ghost"
            leftIcon={<FaTruck />}
            onClick={() => setActiveSection("Entregas")}
            colorScheme="whiteAlpha"
            width="full"
          >
            Entregas
          </Button>
          <Button
            variant="ghost"
            leftIcon={<FaUsers />}
            onClick={() => setActiveSection("Colaboradores")}
            colorScheme="whiteAlpha"
            width="full"
          >
            Colaboradores
          </Button>
          <Button
            variant="ghost"
            leftIcon={<FaBuilding />}
            onClick={() => setActiveSection("Condomínios")}
            colorScheme="whiteAlpha"
            width="full"
          >
            Condomínios
          </Button>
          <Button
            variant="ghost"
            leftIcon={<FaHome />}
            onClick={() => setActiveSection("Moradores")}
            colorScheme="whiteAlpha"
            width="full"
          >
            Moradores
          </Button>
        </VStack>
      </Box>

      <Box bg="gray.50" flex="1" p={8}>
        <Flex alignItems="center" mb={8}>
          <Heading as="h1" size="xl">
            {activeSection === "Overview" ? "Visão Geral" : activeSection}
          </Heading>
          <Spacer />
          <Button colorScheme="green" onClick={onOpen}>
            Ações rápidas
          </Button>
        </Flex>

        {renderSection()}

        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader>Selecione uma ação</DrawerHeader>
            <DrawerBody>
              <VStack spacing={4}>
                <Button onClick={onPedidoModalOpen} w={'full'}>Criar Pedido</Button>
                <Button onClick={onUserModalOpen} w={'full'}>Cadastrar Usuário</Button>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        <RegistrationModal
          isOpen={isUserModalOpen}
          onClose={onUserModalClose}
        />

        <CreateOrderModal isPedidoModalOpen={isPedidoModalOpen} onPedidoModalClose={onPedidoModalClose} data={data} />

      </Box>
    </Flex>
  );
}
