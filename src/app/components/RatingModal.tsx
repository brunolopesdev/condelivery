import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Orders } from "../profile/page";
import { useUserContext } from "../context/UserContext";

interface Props {
  isRatingModalOpen: boolean;
  onRatingModalClose: () => void;
  selectedOrder: Orders | null;
}

export const RatingModal = ({
  isRatingModalOpen,
  onRatingModalClose,
  selectedOrder,
}: Props) => {
  const toast = useToast();
  const { user } = useUserContext();
  const [rating, setRating] = useState<number>(0);
  const [comments, setComments] = useState<string>("");

  const handleRatingSubmit = async () => {
    if (!selectedOrder) return;

    try {
      await axios.post(`/api/profile/rating`, {
        nota: rating,
        comentarios: comments,
        moradorId: user?.moradorId,
        colaboradorId: selectedOrder.colaborador?.id,
        data_avaliacao: new Date().toISOString(),
      });

      toast({
        title: "Avaliação enviada!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setRating(0);
      setComments("");
      onRatingModalClose();
    } catch (error) {
      toast({
        title: "Erro ao enviar avaliação.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isRatingModalOpen} onClose={onRatingModalClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Avalie sua entrega</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Nota</FormLabel>
            <HStack>
              {[1, 2, 3, 4, 5].map((star) => (
                <Tooltip key={star} label={`${star} estrela(s)`}>
                  <Icon
                    as={star <= rating ? AiFillStar : AiOutlineStar}
                    boxSize={8}
                    color={star <= rating ? "yellow.400" : "gray.300"}
                    onClick={() => setRating(star)}
                    cursor="pointer"
                  />
                </Tooltip>
              ))}
            </HStack>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Comentários</FormLabel>
            <Input
              type="text"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Comentários sobre a entrega"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleRatingSubmit}>
            Enviar Avaliação
          </Button>
          <Button variant="ghost" onClick={onRatingModalClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
