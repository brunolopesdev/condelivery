import { Collaborators, Users } from "@/app/dashboard/page";
import { sendOrderNotification } from "@/app/utils/sendOrderNotification";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

interface Props {
  isPedidoModalOpen: boolean;
  onPedidoModalClose: () => void;
  data: {
    users: Users[];
    collaborators: Collaborators[];
  };
}

export const CreateOrderModal = ({
  isPedidoModalOpen,
  onPedidoModalClose,
  data,
}: Props) => {
  const [orderFormData, setOrderFormData] = useState({
    moradorId: 0,
    colaboradorId: 0,
    data_entrega: new Date(),
    status: "pendente",
    codigo_confirmacao: "",
    plataforma: "",
  });

  const handleMoradorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderFormData((prevData) => ({
      ...prevData,
      moradorId: Number(event.target.value),
    }));
  };

  const handleColaboradorChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setOrderFormData((prevData) => ({
      ...prevData,
      colaboradorId: Number(event.target.value),
    }));
  };

  const handleDataEntregaChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOrderFormData((prevData) => ({
      ...prevData,
      data_entrega: new Date(event.target.value),
    }));
  };

  const handlePlataformaChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setOrderFormData((prevData) => ({
      ...prevData,
      plataforma: event.target.value,
    }));
  };

  const handleCodigoConfirmacaoChange = () => {
    const codigo = Math.floor(1000 + Math.random() * 9000).toString();
    setOrderFormData((prevData) => ({
      ...prevData,
      codigo_confirmacao: codigo,
    }));
  };

  const handleSubmitOrder = async () => {
    await axios.post(
      `/api/dashboard/orders/create`,
      orderFormData
    );

    sendOrderNotification(orderFormData.moradorId, "Novo pedido criado!");
  };

  return (
    <Modal isOpen={isPedidoModalOpen} onClose={onPedidoModalClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Criar Pedido</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Morador</FormLabel>
            <Select
              placeholder="Selecione o morador"
              onChange={handleMoradorChange}
            >
              {data.users.map((user) => {
                if (user.tipo_usuario === "morador" && user.moradores.length) {
                  console.log("Morador:", user);
                  return (
                    <option key={user.id} value={user.moradores[0].id}>
                      {user.nome}
                    </option>
                  );
                }
                return null;
              })}
            </Select>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Colaborador</FormLabel>
            <Select
              placeholder="Selecione o colaborador"
              onChange={handleColaboradorChange}
            >
              {data.collaborators.map((collaborator) => (
                <option key={collaborator.id} value={collaborator.id}>
                  {collaborator.id}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Data de Entrega</FormLabel>
            <Input type="date" onChange={handleDataEntregaChange} />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Status</FormLabel>
            <Select>
              <option value="Pendente">
                Aguardando retirada pelo colaborador
              </option>
              <option value="Entrega iniciada">
                Retirado pelo colaborador
              </option>
              <option value="Entregue">Entregue</option>
              <option value="Cancelado">Cancelado</option>
            </Select>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Plataforma</FormLabel>
            <Select onChange={handlePlataformaChange}>
              <option value="IFood">IFood</option>
              <option value="UberEats">UberEats</option>
              <option value="Rappi">Rappi</option>
              <option value="Mercado Livre">Mercado Livre</option>
            </Select>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Código de Confirmação</FormLabel>
            <Input
              placeholder="Código de confirmação"
              value={Math.floor(1000 + Math.random() * 9000)}
              onFocus={handleCodigoConfirmacaoChange}
              readOnly
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => [handleSubmitOrder(), onPedidoModalClose()]}>
            Salvar
          </Button>
          <Button variant="ghost" onClick={onPedidoModalClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
