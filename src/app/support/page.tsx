'use client'

import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Input,
  Link,
  Spacer,
  Stack,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import axios from "axios";
import { useState } from "react";

export default function Suporte() {
  const toast = useToast();
  const [problemDescription, setProblemDescription] = useState("");
  const user = { colaborador: { id: 1 } };

  const handleReportProblem = async () => {
      try {
        await axios.post(`/api/support/create`, {
          tipo_problema: "Suporte",
          status: "Pendente",
          colaboradorId: user?.colaborador ? user?.colaborador?.id : null,
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
  };

  return (
    <Container maxW="container.xl">
      <Header title="Suporte" />

      <Box as="header" bg="gray.100" color="black" p={8} textAlign="center">
        <Heading as="h2">Bem-vindo ao Suporte Condelivery</Heading>
        <Text my={4}>Nossa equipe está aqui para te ajudar!</Text>
      </Box>

      <Box py={8} textAlign="center">
        <Flex alignItems="center" justifyContent="center">
          <Avatar size="xl" mr={4} />
          <Box>
            <Text fontSize="xl" fontWeight="bold">
              Equipe Condelivery
            </Text>
            <Text color="gray.500">
              Suporte Técnico - Atendimento ao Cliente
            </Text>
            <Text>Estamos disponíveis 24/7 para te auxiliar</Text>
          </Box>
        </Flex>
      </Box>

      <Box py={8} px={4}>
        <Heading as="h3" textAlign="center" mb={6}>
          Entre em Contato
        </Heading>
        <Text textAlign="center" mb={4}>
          Envie sua mensagem que responderemos rapidamente
        </Text>
        <VStack spacing={4} maxW="md" mx="auto">
          <Input
            placeholder="Nome"
          />
          <Input
            placeholder="Email"
          />
          <Textarea
            placeholder="Digite sua mensagem aqui"
            rows={5}
            value={problemDescription}
            onChange={(e) => setProblemDescription(e.target.value)}
          />
          <HStack spacing={4} width="full">
            <Button
              colorScheme="gray"
              width="full"
              onClick={() => setProblemDescription("")}
            >
              Limpar
            </Button>
            <Button
              colorScheme="green"
              width="full"
              onClick={handleReportProblem}
            >
              Enviar
            </Button>
          </HStack>
        </VStack>
      </Box>

      <Box py={8} px={4} bg="gray.50">
        <Heading as="h3" textAlign="center" mb={6}>
          Últimas Interações
        </Heading>
        <Text textAlign="center" mb={4}>
          Veja o que nossos clientes estão falando sobre nosso suporte
        </Text>
        <Flex
          p={6}
          borderWidth={1}
          borderRadius="lg"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Text fontWeight="bold">Cliente123</Text>
            <Text fontSize="sm" color="gray.500">
              12/09/2024 - São Paulo
            </Text>
            <Text mt={4}>
              "Atendimento excelente, resolveram minha dúvida rapidamente."
            </Text>
          </Box>
        </Flex>
      </Box>

      <Footer />
    </Container>
  );
}
