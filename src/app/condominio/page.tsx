'use client'

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Input,
  Link,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  VStack,
  Avatar,
} from "@chakra-ui/react";
import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function Condominios() {
  const [selectedCondo, setSelectedCondo] = useState("Condomínio Tropicalia");

  return (
    <Container maxW="container.xl">
      <Header title="Condomínio" />

      <Box as="header" bg="gray.100" color="black" p={8} textAlign="center">
        <Heading as="h2">Bem-vindo ao Condelivery</Heading>
        <Text my={4}>
          Simplifique a administração de entregas no seu condomínio!
        </Text>
        <HStack spacing={4} justify="center">
          <Button colorScheme="gray">Cadastrar</Button>
          <Button colorScheme="green">Entrar</Button>
        </HStack>
      </Box>

      <Box py={8} px={4}>
        <Heading as="h3" textAlign="center" mb={6}>
          Condomínios Disponíveis
        </Heading>
        <Text textAlign="center" mb={4}>
          Escolha um condomínio para começar
        </Text>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          <Box textAlign="center" p={4}>
            <Avatar size="xl" mb={4} />
            <Text fontSize="xl" fontWeight="bold">
              Condomínio Tropicalia
            </Text>
            <Button
              mt={4}
              onClick={() => setSelectedCondo("Condomínio Tropicalia")}
            >
              Selecionar
            </Button>
          </Box>
          <Box textAlign="center" p={4}>
            <Avatar size="xl" mb={4} />
            <Text fontSize="xl" fontWeight="bold">
              Solar Residencial Sol
            </Text>
            <Button
              mt={4}
              onClick={() => setSelectedCondo("Solar Residencial Sol")}
            >
              Selecionar
            </Button>
          </Box>
          <Box textAlign="center" p={4}>
            <Avatar size="xl" mb={4} />
            <Text fontSize="xl" fontWeight="bold">
              Condomínio Primavera
            </Text>
            <Button
              mt={4}
              onClick={() => setSelectedCondo("Condomínio Primavera")}
            >
              Selecionar
            </Button>
          </Box>
        </SimpleGrid>
      </Box>

      <Box py={8} px={4} bg="gray.50">
        <Heading as="h3" textAlign="center" mb={6}>
          Detalhes do Condomínio
        </Heading>
        <VStack spacing={4} maxW="md" mx="auto">
          <Input placeholder="Nome do Administrador" />
          <Input placeholder="Contato" />
          <Button colorScheme="green" width="full">
            Salvar
          </Button>
        </VStack>
      </Box>

      <Box py={8} px={4}>
        <Heading as="h3" textAlign="center" mb={6}>
          Administração do {selectedCondo}
        </Heading>
        <Flex
          align="center"
          justify="center"
          p={6}
          borderWidth={1}
          borderRadius="lg"
          mb={6}
        >
          <Avatar size="lg" mr={4} />
          <Box>
            <Text fontSize="lg" fontWeight="bold">
              Admin Nome
            </Text>
            <Text fontSize="sm" color="gray.500">
              Administrador do {selectedCondo}
            </Text>
          </Box>
          <Spacer />
          <Button colorScheme="green">Adicionar Entrega</Button>
        </Flex>
      </Box>

      <Box py={8} px={4}>
        <Heading as="h3" textAlign="center" mb={6}>
          Atividades
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          <Box p={6} borderWidth={1} borderRadius="lg">
            <Text fontWeight="bold" mb={2}>
              Atividade 1
            </Text>
            <Text color="gray.500" mb={4}>
              Notificação de recebimento de entrega
            </Text>
            <Text>Data: 12/09/2024</Text>
          </Box>
          <Box p={6} borderWidth={1} borderRadius="lg">
            <Text fontWeight="bold" mb={2}>
              Atividade 2
            </Text>
            <Text color="gray.500" mb={4}>
              Entrega finalizada
            </Text>
            <Text>Data: 11/09/2024</Text>
          </Box>
        </SimpleGrid>
      </Box>

      <Footer />
    </Container>
  );
}
