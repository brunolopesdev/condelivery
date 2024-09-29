import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";

interface Props {
  data: any;
}

export default function Overview({ data }: Props) {
  return (
    <Box>
      <Heading as="h2" size="lg" mb={4}>
        Visão Geral
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        <Box bg="green.100" p={6} borderRadius="md">
          <Heading as="h4" size="md">
            Total de Pedidos
          </Heading>
          <Text fontSize="2xl">{data.deliveries.length}</Text>
        </Box>
        <Box bg="blue.100" p={6} borderRadius="md">
          <Heading as="h4" size="md">
            Entregas Concluídas
          </Heading>
          <Text fontSize="2xl">{data.deliveries.length}</Text>
        </Box>
        <Box bg="yellow.100" p={6} borderRadius="md">
          <Heading as="h4" size="md">
            Colaboradores Ativos
          </Heading>
          <Text fontSize="2xl">{data.collaborators.length}</Text>
        </Box>
        <Box bg="purple.100" p={6} borderRadius="md">
          <Heading as="h4" size="md">
            Condomínios Ativos
          </Heading>
          <Text fontSize="2xl">{data.condos.length}</Text>
        </Box>
        <Box bg="pink.100" p={6} borderRadius="md">
          <Heading as="h4" size="md">
            Total de Moradores
          </Heading>
          <Text fontSize="2xl">{data.users.length}</Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
}
