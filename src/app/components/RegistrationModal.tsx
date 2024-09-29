import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationModal = ({
  isOpen,
  onClose,
}: Props) => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    condominioId: 0,
    password: "",
    tipo_usuario: "morador",
    data_registro: new Date(),
    complemento: "",
  });
  const [error, setError] = useState({
    message: "",
    status: false,
  });
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError({
      message: "",
      status: false,
    });
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCondominioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      condominioId: Number(value),
    }));
  };

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(`/api/registration`, {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        password: formData.password,
        data_registro: formData.data_registro,
        tipo_usuario: formData.tipo_usuario,
      });

      if (data.message === "Usuário cadastrado com sucesso!") {
        await axios.post(`/api/morador`, {
          usuarioId: data.user.id,
          condominioId: formData.condominioId,
          complemento: formData.complemento,
          preferencias_notificacoes: true,
        });

        setSuccess(true);
      }
    } catch (error) {
      console.error(error);
      setSuccess(false);
    }

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cadastrar Novo Usuário</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Nome</FormLabel>
            <Input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Telefone</FormLabel>
            <Input
              type="tel"
              name="telefone"
              value={formData.telefone}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Senha</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Condomínio</FormLabel>
            <Select
              placeholder="Selecione o seu condomínio"
              onChange={handleCondominioChange}
            >
              <option value={1}>Condominio 1</option>
              <option value={2}>Condominio 2</option>
              <option value={3}>Condominio 3</option>
            </Select>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Complemento</FormLabel>
            <Input
              type="text"
              name="complemento"
              value={formData.complemento}
              onChange={handleInputChange}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="green" mr={3} onClick={handleSubmit}>
            Cadastrar
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
