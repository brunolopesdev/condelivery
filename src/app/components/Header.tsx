"use client";

import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { Link } from "@chakra-ui/next-js";
import {
  Avatar,
  Badge,
  Box,
  Flex,
  Heading,
  HStack,
  Spacer,
  Text,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useUserContext } from "../context/UserContext";
import { BellIcon } from "@chakra-ui/icons";
import io from "socket.io-client";

interface Props {
  title: string;
}

interface Notification {
  data: string;
  mensagem: string;
  id: number;
}

export const Header = ({ title }: Props) => {
  const { user } = useUserContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const socket = io("http://localhost:3000", {
    query: { userId: user?.id },
  });

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const toast = useToast();

  useEffect(() => {
    if (user) {
      socket.on("new_notification", (newNotification: Notification) => {
        setNotifications((prev) => [...prev, newNotification]);

        toast({
          title: "Nova Notificação",
          description: newNotification.mensagem,
          status: "info",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      });

      return () => {
        socket.off("new_notification");
      };
    }
  }, [user, toast]);

  return (
    <Flex as="nav" bg="blue.900" color="white" p={4} alignItems="center">
      <Heading as="h1" size="lg" letterSpacing="tight">
        {title}
      </Heading>
      <Spacer />
      <HStack as="ul" spacing={6} listStyleType="none">
        <li>
          <Link href="/" color="white">
            Início
          </Link>
        </li>
        <li>
          <Link href="/support" color="white">
            Suporte
          </Link>
        </li>

        {user ? (
          <>
            {/* Verificando o tipo do usuário */}
            {user.type === "morador" && (
              <>
                <li>
                  <Link href="/profile" color="white">
                    Perfil
                  </Link>
                </li>
                <li>
                  <Link href="/settings" color="white">
                    Configurações
                  </Link>
                </li>
              </>
            )}
            {user.type === "colaborador" && (
              <li>
                <Link href="/colaborators" color="white">
                  Minha Área
                </Link>
              </li>
            )}
            {user.type === "admin" && (
              <>
                <li>
                  <Link href="/profile" color="white">
                    Perfil
                  </Link>
                </li>
                <li>
                  <Link href="/settings" color="white">
                    Configurações
                  </Link>
                </li>
                <li>
                  <Link href="/colaborators" color="white">
                    Minha Área
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" color="white">
                    Dashboard
                  </Link>
                </li>
              </>
            )}

            <Flex>
              <Avatar name={user.name} src="" bg="green" />
              <Box ml="3">
                <Text fontWeight="bold" textTransform="capitalize">
                  {user.name}
                </Text>
                <HStack justifyContent="space-between">
                  <Text fontSize="sm">{user.type}</Text>
                  <Text
                    fontSize="sm"
                    cursor="pointer"
                    onClick={() => signOut({ callbackUrl: "/auth/login" })}
                  >
                    sair
                  </Text>
                </HStack>
              </Box>
            </Flex>

            <Box position="relative" ml={4}>
              <IconButton
                icon={<BellIcon />}
                aria-label="Notificações"
                variant="outline"
                colorScheme="whiteAlpha"
                onClick={toggleModal}
              />
              {notifications.length > 0 && (
                <Badge
                  colorScheme="red"
                  borderRadius="full"
                  position="absolute"
                  top="-1"
                  right="-1"
                  fontSize="0.8em"
                >
                  {notifications.length}
                </Badge>
              )}
            </Box>
          </>
        ) : (
          <li>
            <Link href="/auth/login" color="white">
              Login
            </Link>
          </li>
        )}
      </HStack>

      <Modal
        isOpen={isModalOpen}
        onClose={toggleModal}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Notificações</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {notifications.length > 0 ? (
              <Stack spacing={4}>
                {notifications.map((notification) => (
                  <Box key={notification.id} p={4} borderWidth="1px">
                    <Text>{notification.mensagem}</Text>
                    <Badge colorScheme="blue">
                      {new Date(notification.data).toLocaleDateString()}
                    </Badge>
                  </Box>
                ))}
              </Stack>
            ) : (
              <Text>Você não tem novas notificações.</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={toggleModal}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
