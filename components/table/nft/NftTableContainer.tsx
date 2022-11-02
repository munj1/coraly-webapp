import {
  Box,
  Button,
  ButtonGroup,
  Container,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";

export const NftTableContainer = ({ title, children }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Container
      py={{ base: "4", md: "8" }}
      px={{ base: "0", md: 8 }}
      minW={{ base: "100%", md: "100%" }}
    >
      <Box
        bg="bg-surface"
        boxShadow={{ base: "none", md: useColorModeValue("sm", "sm-dark") }}
        borderRadius={useBreakpointValue({ base: "none", md: "lg" })}
      >
        <Stack spacing="5">
          <Box px={{ base: "4", md: "6" }} pt="5">
            <Stack
              direction={{ base: "column", md: "row" }}
              justify="space-between"
            >
              <Text fontSize="lg" fontWeight="medium">
                {title}
              </Text>
            </Stack>
          </Box>
          <Box overflowX="auto">{children}</Box>
          {/* Pagination */}
          {/* <Box px={{ base: "4", md: "6" }} pb="5">
            <HStack spacing="3" justify="space-between">
              {!isMobile && (
                <Text color="muted" fontSize="sm">
                  Showing 1 to 5 of 42 results
                </Text>
              )}
              <ButtonGroup
                spacing="3"
                justifyContent="space-between"
                width={{ base: "full", md: "auto" }}
                variant="secondary"
              >
                <Button>Previous</Button>
                <Button>Next</Button>
              </ButtonGroup>
            </HStack>
          </Box> */}
        </Stack>
      </Box>
    </Container>
  );
};
