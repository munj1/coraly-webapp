import { SimpleGrid, Spinner } from "@chakra-ui/react";
import Card from "./Card";

type CardProps = {
  status: string;
  title: string;
  imgUrl: string;
};

const CardGrid = ({ data }: { data: CardProps[] }) => {
  if (!data) {
    return <Spinner />;
  }

  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={[2, 4, 6]} w="full">
      {data.map((data) => (
        <Card
          status={data.status}
          title={data.title}
          imgUrl={data.imgUrl}
          key={data.title}
        />
      ))}
    </SimpleGrid>
  );
};

export default CardGrid;
