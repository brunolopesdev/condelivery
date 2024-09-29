"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { RegistrationModal } from "../../components/RegistrationModal";

export default function Login() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [error, setError] = useState({
    message: "",
    status: false,
  });
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    condominioId: 0,
    password: "",
    tipo_usuario: "morador",
    data_registro: new Date(),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError({
      message: "",
      status: false,
    });
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      // redirect: false,
      callbackUrl: "/profile",
      email: formData.email,
      password: formData.password,
    });

    if (res?.ok === false) {
      setError({
        message: "Usuário ou senha inválidos",
        status: true,
      });
    }
  };

  return (
    <Container maxW="container.xl">
      <Header title="Condelivery - Login" />

      <Box
        as="header"
        bg="gray.100"
        color="black"
        p={8}
        textAlign="center"
        shadow="md"
      >
        <Heading as="h2">Bem-vindo ao Condelivery</Heading>
        <Text my={4}>
          Simplifique a sua experiência com entregas em condomínios!
        </Text>
        <VStack spacing={4}>
          <Input
            placeholder="Digite seu e-mail para começar"
            width="350px"
            bg="white"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <HStack spacing={4}>
            <Button
              colorScheme="white"
              bg="#4CAF50"
              variant="solid"
              w={240}
              onClick={onOpen}
            >
              Cadastrar
            </Button>
          </HStack>
        </VStack>
      </Box>

      <Box py={8} px={4}>
        <Heading as="h3" textAlign="center" mb={6}>
          Log In
        </Heading>
        <VStack spacing={4} maxW="md" mx="auto">
          <Input
            placeholder="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <Button
            colorScheme="green"
            bg="#4CAF50"
            width="full"
            onClick={handleLogin}
          >
            Entrar
          </Button>
          {error.status && <Text color="red.500">{error.message}</Text>}
          <Button
            colorScheme="white"
            width="full"
            bg="#757575"
            variant="outline"
            color="white"
          >
            Esqueceu a senha
          </Button>
        </VStack>
      </Box>

      <RegistrationModal
        isOpen={isOpen}
        onClose={onClose}
      />

      <Footer />
    </Container>
  );
}
