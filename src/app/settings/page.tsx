"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Link,
  Radio,
  RadioGroup,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import axios from "axios";
import { useUserContext } from "../context/UserContext";

interface Integrations {
  id: number;
  plataforma: string;
  moradorId: number;
  data_integracao: string;
  status: string;
}

export default function Settings() {
  const { user } = useUserContext();
  const [selectedApp, setSelectedApp] = useState("iFood");
  const [integrations, setIntegrations] = useState<Integrations[]>([]);
  const toast = useToast();

  const fetchIntegrations = async (id: number) => {
    try {
      const { data } = await axios.get(
        `/api/profile/integrations/fetch?id=${id}`
      );

      setIntegrations(data.data);
      toast({
        title: "Integrações encontradas.",
        description: "Integrações carregadas com sucesso.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Erro ao buscar integrações:", error);
      toast({
        title: "Erro ao buscar integrações.",
        description: "Ocorreu um erro. Tente novamente mais tarde.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleIntegrations = async () => {
    if (user?.moradorId) {
      try {
        await axios.post("/api/profile/integrations/create", {
          plataforma: selectedApp,
          moradorId: user.moradorId,
          data_integracao: new Date(),
          status: "Ativado",
        });

        toast({
          title: "Integração criada.",
          description: `A integração com ${selectedApp} foi ativada com sucesso.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        fetchIntegrations(user.moradorId); // Atualizar a lista de integrações
      } catch (error) {
        console.error("Erro ao criar integração:", error);
        toast({
          title: "Erro ao criar integração.",
          description: "Ocorreu um erro. Tente novamente mais tarde.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Morador não encontrado.",
        description: "Por favor, verifique suas informações de usuário.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (user?.moradorId) {
      fetchIntegrations(user.moradorId);
    }
  }, [user]);

  return (
    <Container maxW="container.xl">
      <Header title="Configurações da conta" />

      <Box
        as="header"
        bg="#0000001A"
        color="black"
        p={8}
        textAlign="center"
        shadow="md"
      >
        <Heading as="h2">Configurações do Aplicativo</Heading>
        <Text>Personalize suas preferências</Text>
      </Box>

      <Box py={8} px={4}>
        <Heading as="h3" mb={6}>
          Integrações com Aplicativos
        </Heading>
        <Text mb={4}>Selecione os aplicativos para integração</Text>

        <RadioGroup onChange={setSelectedApp} value={selectedApp}>
          <HStack spacing={8}>
            <Radio value="ifood">iFood</Radio>
            <Radio value="rappi">Rappi</Radio>
            <Radio value="uber eats">Uber Eats</Radio>
            <Radio value="mercado livre">Mercado Livre</Radio>
          </HStack>
        </RadioGroup>
        <Button mt={4} colorScheme="green" onClick={handleIntegrations}>
          Salvar
        </Button>
      </Box>

      <Box py={8} px={4}>
        <Heading as="h3" mb={6}>
          Notificações de Aplicativos Terceiros
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          {integrations.length > 0 ? (
            integrations.map((integration) => (
              <Box
                key={integration.id}
                p={6}
                borderWidth={1}
                borderRadius="lg"
                textAlign="center"
              >
                <Text fontSize="2xl" mb={2}>
                  {integration.plataforma}
                </Text>
                <Text color="gray.500" mb={4}>
                  Receber notificações de entregas
                </Text>
                <Text fontWeight="bold">{integration.status}</Text>
              </Box>
            ))
          ) : (
            <Text>Nenhuma integração ativa</Text>
          )}
        </SimpleGrid>
      </Box>

      <Footer />
    </Container>
  );
}
