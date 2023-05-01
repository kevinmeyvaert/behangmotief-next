import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  chakra,
  Collapse,
  Divider,
  Highlight,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Spinner,
  Text,
} from '@chakra-ui/react';

const Header = ({
  onSubmitSearch,
  onSetSearchInput,
  onOpenSideBar,
  searchInput,
  albums,
  isLoadingSearch,
}) => {
  return (
    <Box position={'absolute'} zIndex="overlay" right={0}>
      <chakra.form
        onSubmit={onSubmitSearch}
        display="flex"
        px={4}
        flexDirection="row"
        justifyContent="flex-end"
      >
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
          <Input
            w={{ base: '100%', md: 'md' }}
            background="white"
            type="search"
            placeholder="Search an artist or venue"
            value={searchInput}
            onChange={(e) => onSetSearchInput(e.target.value)}
            _focus={{
              borderColor: 'black',
            }}
            _focusVisible={{
              boxShadow: 'none',
              border: 'none',
              outlineColor: 'black',
              outlineOffset: '-2px',
            }}
          />
          <InputRightElement>{isLoadingSearch && <Spinner />}</InputRightElement>
        </InputGroup>
        <IconButton
          aria-label="About"
          onClick={onOpenSideBar}
          bgImage="url('/icon.jpg')"
          bgSize="cover"
          bgPosition="center"
          bgRepeat="no-repeat"
          ml={2}
          _hover={{
            backgroundColor: 'none',
            opacity: 0.7,
          }}
          _focusVisible={{
            opacity: 0.7,
          }}
        />
      </chakra.form>

      <Collapse in={searchInput.length > 1} animateOpacity>
        <Box pos="absolute" top="55px" ml={4} mt={2} pr={8} w={{ base: '100%' }}>
          <Box background={'white'} borderRadius="md" maxH={'75vh'} overflow="scroll" py={4}>
            {albums?.length === 0 && (
              <Text px={4}>
                Found no results for <chakra.span bg="gray.300">{searchInput}</chakra.span>. 🥺
              </Text>
            )}
            {albums?.length > 0 &&
              albums?.map((album, i) => (
                <Link href={`/album/${album.slug}`} _hover={{ textDecoration: 'none' }}>
                  <HStack _hover={{ backgroundColor: 'gray.100' }} px={4} py={2}>
                    <Box
                      w="25%"
                      pt="16.665%"
                      bg={`url(https://r.wannabes.be/S=W800,H800,PD2/${album.thumbnail.hires})`}
                      bgSize="cover"
                      bgPos="center"
                    />
                    <Box px={2}>
                      <Text color="black" fontWeight="bold">
                        <Highlight query={searchInput} styles={{ bg: 'gray.300' }}>
                          {album.artist.name}
                        </Highlight>
                      </Text>
                      <Text color="black" fontStyle="italic">
                        <Highlight query={searchInput} styles={{ bg: 'gray.300' }}>
                          {album.venue.name}
                        </Highlight>
                      </Text>
                      <Text>{new Date(album.date).toLocaleDateString('be-NL')}</Text>
                    </Box>
                  </HStack>
                  {i !== albums.length - 1 && <Divider />}
                </Link>
              ))}
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};

export default Header;
