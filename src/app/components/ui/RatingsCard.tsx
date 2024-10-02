import { Box, Text } from "@chakra-ui/react";

export interface Ratings {
  id: number;
  nota: number;
  comentarios: string;
}

interface Props {
    rating: Ratings;
    index: number;
}

export const RatingsCard = ({ rating, index }: Props) => {
  return (
    <Box
      key={rating.id}
      bg="white"
      p={4}
      borderRadius="md"
      shadow="md"
      width={["100%", "300px"]}
      mb={4}
    >
      <Text textAlign={"center"} fontWeight={600}>
        Avaliação {index + 1}
      </Text>
      <Text textAlign={"center"}>
        {Array.from({ length: 5 }, (_, i) => (i < rating.nota ? "⭐" : "☆"))}
      </Text>
      <Text
        fontSize="sm"
        color="gray.500"
        textAlign={"center"}
        fontWeight={600}
      >
        {rating.comentarios}
      </Text>
    </Box>
  );
};
