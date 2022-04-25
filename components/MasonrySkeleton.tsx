import { AspectRatio, SimpleGrid } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/react';

const MasonrySkeleton = () => {
  const foo = new Array(9).fill(0);
  return (
    <SimpleGrid columns={{ sm: 1, md: 3 }} spacing={6}>
      {foo.map(() => (
        <AspectRatio ratio={3 / 2}>
          <Skeleton />
        </AspectRatio>
      ))}
    </SimpleGrid>
  );
};

export default MasonrySkeleton;
