import { Collaborators, Condos } from "@/app/dashboard/page";
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
  condos: Condos[];
}

export default function Condominios({ condos }: Props) {
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
              <Th>endereço</Th>
              <Th>moradores</Th>
              <Th>taxa</Th>
            </Tr>
          </Thead>
          <Tbody>
            {condos.map((condo) => (
              <Tr key={condo.id}>
                <Td>{condo.id}</Td>
                <Td>{condo.nome}</Td>
                <Td>{condo.endereco}</Td>
                <Td>{condo.numero_moradores}</Td>
                <Td>R${condo.taxa_condominio}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
