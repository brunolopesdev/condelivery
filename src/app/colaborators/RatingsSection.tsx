import { Box, Heading, Text, Flex, Badge } from "@chakra-ui/react";
import { Ratings, RatingsCard } from "../components/ui/RatingsCard";

interface RatingsSectionProps {
  ratings: Ratings[];
}

const RatingsSection: React.FC<RatingsSectionProps> = ({ ratings }) => {
  return ratings.length > 0 ? (
    <Box mt={8}>
      <Heading size="md" mb={4} textAlign="center">
        Suas Avaliações
      </Heading>
      <Flex gap={4} wrap="wrap" justify={["center", "space-around"]}>
        {ratings.map((rating, index) => (
          <RatingsCard rating={rating} index={index} />
        ))}
      </Flex>
    </Box>
  ) : null;
};

export default RatingsSection;
