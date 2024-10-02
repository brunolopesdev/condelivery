import { Box, Heading, Flex, Badge, Text, Skeleton } from "@chakra-ui/react";
import { Orders } from "../profile/page";

interface CompletedOrdersProps {
  orders: Orders[];
  loading: boolean;
}

const CompletedOrders: React.FC<CompletedOrdersProps> = ({ orders, loading }) => {
  return orders.length > 0 ? (
    <Box mt={8}>
      <Heading size="md" mb={4} textAlign="center">
        Pedidos Concluídos
      </Heading>
      <Skeleton isLoaded={!loading}>
        <Flex gap={4} wrap="wrap" justify={["center", "space-around"]}>
          {orders.map((order, index) => (
            <Box
              bg="white"
              p={4}
              borderRadius="md"
              shadow="md"
              width={["100%", "300px"]}
              key={order.id}
              mb={4}
            >
              <Heading size="sm" mb={2}>
                Pedido {index + 1}
              </Heading>
              <Badge colorScheme="red" fontSize="16px">
                {order.plataforma}
              </Badge>
              <Text fontSize="sm" color="gray.500" fontWeight={600}>
                <Badge>Código:</Badge> {order.codigo_confirmacao}
              </Text>
              <Text fontSize="sm" color="gray.500" fontWeight={600}>
                <Badge>Data:</Badge>{" "}
                {new Date(order.data_entrega).toLocaleDateString()}
              </Text>
            </Box>
          ))}
        </Flex>
      </Skeleton>
    </Box>
  ) : null;
};

export default CompletedOrders;
