import { Collaborators } from "@/app/dashboard/page";
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
  collaborators: Collaborators[];
}

export default function Colaboradores({ collaborators }: Props) {
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
              <Th>avaliação média</Th>
              <Th>número de entregas</Th>
              <Th>data de contratação</Th>
            </Tr>
          </Thead>
          <Tbody>
            {collaborators.map((collaborator) => (
              <Tr key={collaborator.id}>
                <Td>{collaborator.id}</Td>
                <Td>{collaborator.avaliacao_media}</Td>
                <Td>{collaborator.numero_entregas}</Td>
                <Td>
                  {new Date(collaborator.data_contratacao).toLocaleDateString()}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
