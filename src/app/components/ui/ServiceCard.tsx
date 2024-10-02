import { Image } from "@chakra-ui/next-js";
import { Card, CardBody, Heading, Stack, Text } from "@chakra-ui/react";

export interface Service {
    id: number;
    title: string;
    img: string;
    description: string;
}

interface Props {
    service: Service
}

export const ServiceCard = ({ service }: Props) => {
  return (
    <Card maxW="sm" key={service.id}>
      <CardBody>
        <Image
          src={service.img}
          alt={`Imagem do serviço ${service.title}`}
          borderRadius="lg"
          width={300}
          height={200}
          loading="lazy"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{service.title}</Heading>
          <Text>{service.description}</Text>
        </Stack>
      </CardBody>
    </Card>
  );
};