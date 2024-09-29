import { Deliveries } from "@/app/dashboard/page";
import { Box, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

interface Props {
  deliveries: Deliveries[];
}

export default function Pedidos({ deliveries }: Props) {
  return (
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
                <Td>{new Date(delivery.data_entrega).toLocaleDateString()}</Td>
                <Td>{delivery.codigo_confirmacao}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
