import { SearchIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/input';
import { Box } from '@chakra-ui/layout';
import { chakra, IconButton } from '@chakra-ui/react';

const Header = ({ onSubmitSearch, onSetSearchInput, onOpenSideBar, searchInput }) => {
  return (
    <Box as="header">
      <chakra.form
        onSubmit={onSubmitSearch}
        display="flex"
        mt={4}
        flexDirection="row"
        justifyContent="flex-end"
      >
        <InputGroup w={{ base: '100%', sm: 'xs', xl: 'md' }}>
          <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
          <Input
            type="search "
            placeholder="Search an artist or venue"
            value={searchInput}
            onChange={(e) => onSetSearchInput(e.target.value)}
            _focusVisible={{
              boxShadow: 'none',
              border: 'none',
              outlineColor: 'black',
              outlineOffset: '-2px',
            }}
          />
          {searchInput !== '' && (
            <InputRightElement
              children={
                <IconButton
                  aria-label="Remove search input"
                  icon={<SmallCloseIcon color="black" />}
                  onClick={() => onSetSearchInput('')}
                  size="xs"
                  background="none"
                  _focusVisible={{
                    outlineColor: "black",
                  }}
                />
              }
            />
          )}
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
    </Box>
  );
};

export default Header;
