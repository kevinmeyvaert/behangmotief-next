import { Box, Container, HStack, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box as="footer" bg="#fcfcff" color="black" mt={6}>
      <Container maxW={{ sm: 'max-content', xl: 'container.xl' }}>
        <HStack justify={'space-between'} py={8}>
          <Text>Made with ♥️ in Gent, Belgium.</Text>
          <Text>
            <a
              href="https://instagram.com/behangmotief"
              target="_blank"
              title="@behangmotief on Instagram"
              rel="noreferrer"
            >
              &copy; Behangmotief, {new Date().getFullYear()}
            </a>
          </Text>
        </HStack>
      </Container>
    </Box>
  );
};

export default Footer;
