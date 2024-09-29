import { Box, Text } from "@chakra-ui/react";

export const Footer = () => {
    return (
      <Box as="footer" py={8} textAlign="center">
        <Text>&copy; 2024 Condelivery. Todos os direitos reservados.</Text>
        <Text mt={4}>Termos & Condições | Política de Privacidade</Text>
      </Box>
    );
}