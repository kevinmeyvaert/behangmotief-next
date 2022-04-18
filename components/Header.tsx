import { InfoIcon, SearchIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/input';
import { Box, Flex } from '@chakra-ui/layout';
import { IconButton } from '@chakra-ui/react';

const Header = ({ onSubmitSearch, onSetSearchInput, onOpenSideBar, searchInput }) => {
  return (
    <Box as="header">
      <Flex gap={2} mt={4} justify="end">
        <form onSubmit={onSubmitSearch}>
          <InputGroup w="sm">
            <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
            <Input
              type="search "
              placeholder="Search an artist or venue"
              value={searchInput}
              onChange={(e) => onSetSearchInput(e.target.value)}
            />
            {searchInput !== '' && (
              <InputRightElement
                children={
                  <IconButton
                    aria-label="Remove search input"
                    icon={<SmallCloseIcon color="gray.300" />}
                    onClick={() => onSetSearchInput('')}
                    size="sm"
                  />
                }
              />
            )}
          </InputGroup>
        </form>
        <IconButton
          icon={<InfoIcon color="gray.600" />}
          aria-label="About"
          onClick={onOpenSideBar}
        />
      </Flex>
    </Box>
  );
};

export default Header;
