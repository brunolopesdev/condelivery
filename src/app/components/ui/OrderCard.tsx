import { Orders } from "@/app/profile/page";
import { Box, Heading, Text, Badge, Button, HStack } from "@chakra-ui/react";

interface OrderCardProps {
  order: Orders;
  index: number;
  updateOrderStatus: (id: number, status: string) => Promise<void>;
  setSelectedOrderId: (id: number | null) => void;
  sendOrderNotification: (moradorId: number, message: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({
  order,
  index,
  updateOrderStatus,
  setSelectedOrderId,
  sendOrderNotification,
}) => {
  const handleStartDelivery = () => {
    updateOrderStatus(order.id, "entrega iniciada");
    sendOrderNotification(
      order.morador?.id,
      `A entrega do pedido ${order.codigo_confirmacao} foi iniciada.`
    );
  };

  const handleFinishDelivery = () => {
    updateOrderStatus(order.id, "entregue");
    sendOrderNotification(
      order.morador?.id,
      `A entrega do pedido ${order.codigo_confirmacao} foi concluída.`
    );
  };

  const handleCancelDelivery = () => {
    updateOrderStatus(order.id, "cancelado");
    sendOrderNotification(
      order.morador?.id,
      `O pedido ${order.codigo_confirmacao} foi cancelado.`
    );
  }

  return (
    <Box
      bg="white"
      p={4}
      borderRadius="md"
      shadow="md"
      width={["100%", "300px"]}
      mb={[4, 0]}
    >
      <Heading size="sm" mb={2}>
        Pedido {index + 1}
      </Heading>
      <Text mb={2}>
        <Badge colorScheme="blue" fontSize="16px">
          {order.plataforma}
        </Badge>
      </Text>
      <Text fontSize="sm" color="gray.500" mb={2}>
        <Badge>Código:</Badge> {order.codigo_confirmacao}
      </Text>
      <Text fontSize="sm" color="gray.500" fontWeight={600}>
        <Badge>Data:</Badge> {new Date(order.data_entrega).toLocaleDateString()}
      </Text>
      <Text fontSize="sm" color="gray.500" fontWeight={600}>
        <Badge>Status:</Badge> {order.status}
      </Text>
      <HStack mt={4}>
        {order.status === "pendente" && (
          <Button colorScheme="blue" size={"sm"} onClick={handleStartDelivery}>
            Iniciar
          </Button>
        )}
        {order.status === "entrega iniciada" && (
          <Button colorScheme="blue" size={"sm"} onClick={handleFinishDelivery}>
            Concluir
          </Button>
        )}
        <Button
          colorScheme="red"
          size={"sm"}
          onClick={() => [setSelectedOrderId(order.id), handleCancelDelivery()]}
        >
          Relatar Problema
        </Button>
      </HStack>
    </Box>
  );
};

export default OrderCard;
