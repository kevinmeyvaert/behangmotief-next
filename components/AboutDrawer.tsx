import {
  Box,
  CloseButton,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  HStack,
  Tag,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';

const referrals = [
  'Democrazy',
  'Crammerock',
  'Studio Brussel',
  'Cactusfestival',
  'HEAR HEAR',
  'Pukkelpop',
  'Boomtown',
  'Gladiolen',
  'VI.BE',
  'Gent Jazz',
];

export const AboutDrawer = ({ isDrawerOpen, onCloseDrawer }) => {
  return (
    <Drawer onClose={onCloseDrawer} isOpen={isDrawerOpen} size="md">
      <DrawerOverlay />
      <DrawerContent bg="black" color="white">
        <DrawerHeader>
          <HStack justify="flex-end">
            <CloseButton onClick={onCloseDrawer} _focus={{ outlineColor: 'white' }} />
          </HStack>
        </DrawerHeader>

        <DrawerBody>
          <Box width="100%" overflow={'hidden'}>
            <Box
              margin="0 auto"
              backgroundImage="/profile-sprites-sm.jpg"
              backgroundSize="cover"
              width="400px"
              height="500px"
              animation="profile-picture 0.9s steps(6) infinite"
            />
          </Box>
          <Text lineHeight="2" mb={5} mt={10}>
            Belgian freelance concert- &amp; festivalphotographer based in Gent. Part of Wannabes, a
            rockphotography collective.
          </Text>
          <Heading as="h3" fontSize="xl" mb={4}>
            Contact
          </Heading>
          <Text lineHeight="2" mb={5}>
            hallo@behangmotief.be
          </Text>
          <Heading as="h3" fontSize="xl" mb={4}>
            Referrals
          </Heading>
          <Wrap spacing={2} mb={4}>
            {referrals.map((referral) => (
              <WrapItem key={referral}>
                <Tag size="lg">{referral}</Tag>
              </WrapItem>
            ))}
          </Wrap>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
