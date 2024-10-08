"use client";

import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Image, Link } from "@chakra-ui/next-js";
import { useUserContext } from "./context/UserContext";
import { RatingsCard } from "./components/ui/RatingsCard";
import { ServiceCard } from "./components/ui/ServiceCard";

export default function Home() {
  const { ratings } = useUserContext();

  const services = [
    {
      id: 1,
      title: "Agilidade",
      img: "https://images.unsplash.com/photo-1695654392283-4ea0fa0b4bb6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Entregas rápidas e seguras para o seu condomínio.",
    },
    {
      id: 2,
      title: "Plataforma completa",
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Plataforma completa para gerenciar entregas em condomínios.",
    },
    {
      id: 3,
      title: "Segurança",
      img: "https://images.unsplash.com/photo-1695653422550-4615553d90c3?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Entregas seguras e confiáveis com colaboradores qualificados.",
    },
  ];

  return (
    <Container maxW="container.xl">
      <Header title="Condelivery" />

      <Box
        as="header"
        bg="gray.100"
        color="black"
        p={8}
        textAlign="center"
        shadow="md"
      >
        <Heading as="h2">Simplifique entregas em condomínios!</Heading>
        <Text my={4}>
          Gerencie com eficiência os serviços de entregas em seu complexo
          residencial.
        </Text>
        <Button colorScheme="green" bg="#4CAF50">
          Começar
        </Button>
      </Box>

      <Box py={8}>
        <Heading as="h2" textAlign="center" mb={8}>
          Serviços em destaque
        </Heading>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
          {services.map((service) => (
            <ServiceCard service={service} />
          ))}
        </SimpleGrid>
      </Box>

      <Box py={8}>
        <Heading as="h2" textAlign="center" mb={8}>
          Avaliações de clientes
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          {ratings?.map((rating, index) => (
            <Flex gap={4} justify="center" key={rating.id}>
              <RatingsCard rating={rating} index={index} />
            </Flex>
          ))}
        </SimpleGrid>
      </Box>

      <Box py={8} bg="gray.50" borderRadius="md">
        <Heading as="h2" textAlign="center" mb={8}>
          Comece já!
        </Heading>
        <VStack spacing={4} maxW="lg" mx="auto">
          <Input placeholder="Nome completo" />
          <Input placeholder="Email" />
          <Link
            href={"/auth/login"}
            as={Button}
            colorScheme="green"
            variant="outline"
            fontWeight={700}
          >
            Enviar
          </Link>
        </VStack>
      </Box>

      <Footer />
    </Container>
  );
}
