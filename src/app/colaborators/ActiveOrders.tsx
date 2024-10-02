import {
  Box,
  Flex,
  Heading,
  Badge,
  Button,
  HStack,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { Orders } from "@/app/profile/page";
import OrderCard from "../components/ui/OrderCard";

interface ActiveOrdersProps {
  orders: Orders[];
  updateOrderStatus: (id: number, status: string) => Promise<void>;
  loading: boolean;
  setSelectedOrderId: (id: number | null) => void;
  sendOrderNotification: (moradorId: number, message: string) => void;
}

const ActiveOrders: React.FC<ActiveOrdersProps> = ({
  orders,
  updateOrderStatus,
  loading,
  setSelectedOrderId,
  sendOrderNotification,
}) => {
  return (
    <Box mt={6}>
      <Heading size="md" mb={4} textAlign="center">
        Pedidos Ativos
      </Heading>
      <Skeleton isLoaded={!loading}>
        <Flex
          gap={4}
          wrap="wrap"
          justify={["center"]}
          align="center"
        >
          {orders
            .filter((order) => order.status.toLowerCase() !== "entregue")
            .map((order, index) => (
              <OrderCard
                key={order.id}
                order={order}
                index={index}
                updateOrderStatus={updateOrderStatus}
                setSelectedOrderId={setSelectedOrderId}
                sendOrderNotification={sendOrderNotification}
              />
            ))}
        </Flex>
      </Skeleton>
    </Box>
  );
};

export default ActiveOrders;
