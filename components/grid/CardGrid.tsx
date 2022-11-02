import { SimpleGrid, Spinner } from "@chakra-ui/react";
import Card from "./Card";
import { CardProps } from "./Card";

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
          imageUrl={data.imageUrl}
          key={data.id}
          id={data.id}
          price={data.price}
          amount={data.amount}
          currency={data.currency}
          name={data.name}
        />
      ))}
    </SimpleGrid>
  );
};

export default CardGrid;
