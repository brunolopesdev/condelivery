import { Users } from "@/app/dashboard/page";
import { Box, Heading, Text, SimpleGrid } from "@chakra-ui/react";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

interface Props {
  residents: Users[];
}

export default function Moradores({ residents }: Props) {
  return (
    <Box>
      <Heading as="h2" size="lg" mb={4}>
        Colaboradores Ativos
      </Heading>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>id</Th>
              <Th>nome</Th>
              <Th>tipo de usuário</Th>
            </Tr>
          </Thead>
          <Tbody>
            {residents.map((resident) => (
              <Tr key={resident.id}>
                <Td>{resident.id}</Td>
                <Td>{resident.nome}</Td>
                <Td>{resident.tipo_usuario}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
