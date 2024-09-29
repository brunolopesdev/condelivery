"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "./context/UserContext";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <UserProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </UserProvider>
    </SessionProvider>
  );
}
