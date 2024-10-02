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
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useUserContext } from "../context/UserContext";
import { BellIcon, HamburgerIcon } from "@chakra-ui/icons";
import axios from "axios";

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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isMobile = useBreakpointValue({ base: true, md: false });
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toast = useToast();

  const fetchNotifications = async (id: number) => {
    try {
      const { data } = await axios.get(
        `/api/profile/notifications?id=${id}&type=${"moradores"}`
      );
      setNotifications(data.data);
    } catch (error) {
      console.error("Erro ao buscar notificações:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchNotifications(3);
    }
  }, [user, toast]);

  return (
    <Flex as="nav" bg="blue.900" color="white" p={4} alignItems="center">
      <Heading as="h1" size="lg" letterSpacing="tight">
        {title}
      </Heading>
      <Spacer />
      {isMobile ? (
        <>
          <IconButton
            aria-label="Abrir menu"
            icon={<HamburgerIcon />}
            onClick={onOpen}
            variant="outline"
            colorScheme="whiteAlpha"
            mr={4}
          />

          <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Menu</DrawerHeader>

              <DrawerBody>
                <Stack as="ul" spacing={4} listStyleType="none">
                  <li>
                    <Link href="/" onClick={onClose}>
                      Início
                    </Link>
                  </li>
                  <li>
                    <Link href="/support" onClick={onClose}>
                      Suporte
                    </Link>
                  </li>

                  {user ? (
                    <>
                      {user.type === "morador" && (
                        <>
                          <li>
                            <Link href="/profile" onClick={onClose}>
                              Perfil
                            </Link>
                          </li>
                          <li>
                            <Link href="/settings" onClick={onClose}>
                              Configurações
                            </Link>
                          </li>
                        </>
                      )}
                      {user.type === "colaborador" && (
                        <li>
                          <Link href="/colaborators" onClick={onClose}>
                            Minha Área
                          </Link>
                        </li>
                      )}
                      {user.type === "admin" && (
                        <>
                          <li>
                            <Link href="/profile" onClick={onClose}>
                              Perfil
                            </Link>
                          </li>
                          <li>
                            <Link href="/settings" onClick={onClose}>
                              Configurações
                            </Link>
                          </li>
                          <li>
                            <Link href="/colaborators" onClick={onClose}>
                              Minha Área
                            </Link>
                          </li>
                          <li>
                            <Link href="/dashboard" onClick={onClose}>
                              Dashboard
                            </Link>
                          </li>
                        </>
                      )}

                      <li>
                        <Flex align="center">
                          <Avatar name={user.name} src="" bg="#86a6d7" />
                          <Box ml="3">
                            <Text fontWeight="bold" textTransform="capitalize">
                              {user.name}
                            </Text>
                            <Text
                              fontSize="sm"
                              cursor="pointer"
                              onClick={() =>
                                signOut({ callbackUrl: "/auth/login" })
                              }
                            >
                              Sair
                            </Text>
                          </Box>
                        </Flex>
                      </li>
                    </>
                  ) : (
                    <li>
                      <Link href="/auth/login" onClick={onClose}>
                        Login
                      </Link>
                    </li>
                  )}
                </Stack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      ) : (
        <HStack as="ul" spacing={6} listStyleType="none">
          <li>
            <Link href="/">Início</Link>
          </li>
          <li>
            <Link href="/support">Suporte</Link>
          </li>
          {user ? (
            <>
              {user.type === "morador" && (
                <>
                  <li>
                    <Link href="/profile">Perfil</Link>
                  </li>
                  <li>
                    <Link href="/settings">Configurações</Link>
                  </li>
                </>
              )}
              {user.type === "colaborador" && (
                <li>
                  <Link href="/colaborators">Minha Área</Link>
                </li>
              )}
              {user.type === "admin" && (
                <>
                  <li>
                    <Link href="/profile">Perfil</Link>
                  </li>
                  <li>
                    <Link href="/settings">Configurações</Link>
                  </li>
                  <li>
                    <Link href="/colaborators">Minha Área</Link>
                  </li>
                  <li>
                    <Link href="/dashboard">Dashboard</Link>
                  </li>
                </>
              )}

              <Flex>
                <Avatar name={user.name} src="" bg="#86a6d7" />
                <Box ml="3">
                  <Text fontWeight="bold" textTransform="capitalize">
                    {user.name}
                  </Text>
                  <Text
                    fontSize="sm"
                    cursor="pointer"
                    onClick={() => signOut({ callbackUrl: "/auth/login" })}
                  >
                    Sair
                  </Text>
                </Box>
              </Flex>
            </>
          ) : (
            <li>
              <Link href="/auth/login">Login</Link>
            </li>
          )}
        </HStack>
      )}

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
            colorScheme="green"
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
                  <Box key={notification.mensagem} p={4} borderWidth="1px">
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
            <Button
              colorScheme="blue"
              onClick={() => [toggleModal(), setNotifications([])]}
            >
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
