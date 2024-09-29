import { Deliveries } from "@/app/dashboard/page";
import { Box, Heading } from "@chakra-ui/react";
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
  deliveries: Deliveries[];
}

export default function Entregas({ deliveries }: Props) {
  return (
    <Box>
      <Heading as="h2" size="lg" mb={4}>
        Últimas Entregas
      </Heading>
      <Box>
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>id</Th>
                <Th>plataforma</Th>
                <Th>data</Th>
                <Th>código</Th>
              </Tr>
            </Thead>
            <Tbody>
              {deliveries.map((delivery) => (
                <Tr key={delivery.id}>
                  <Td>{delivery.id}</Td>
                  <Td>{delivery.plataforma}</Td>
                  <Td>
                    {new Date(delivery.data_entrega).toLocaleDateString()}
                  </Td>
                  <Td>{delivery.codigo_confirmacao}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
