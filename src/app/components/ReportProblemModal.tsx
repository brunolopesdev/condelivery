import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  useToast,
} from "@chakra-ui/react";

interface ReportProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleReportProblem: () => void;
  problemDescription: string;
  setProblemDescription: (description: string) => void;
}

const ReportProblemModal: React.FC<ReportProblemModalProps> = ({
  isOpen,
  onClose,
  handleReportProblem,
  problemDescription,
  setProblemDescription,
}) => {
  const toast = useToast();

  const submitProblem = async () => {
    try {
      await handleReportProblem();
      toast({
        title: "Problema relatado com sucesso.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Erro ao relatar problema.",
        description: "Ocorreu um erro ao relatar o problema. Tente novamente.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Relatar Problema</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Textarea
            placeholder="Descreva o problema"
            value={problemDescription}
            onChange={(e) => setProblemDescription(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="blue" onClick={submitProblem}>
            Relatar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReportProblemModal;
