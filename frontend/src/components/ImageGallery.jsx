import { Box, Button, Flex, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { colors, panelProps, ghostBtn, dangerBtn } from "../ui.js";

export default function ImageGallery({ images, loading, selectedId, onSelect, onDelete }) {
  return (
    <Box>
      <Text color={colors.accent} fontSize="sm" mb={1}>
        $ ls ./gallery
      </Text>
      <Heading size="lg" mb={5} color={colors.text}>
        Gallery
      </Heading>

      {loading ? (
        <Text color={colors.muted}>Loading...</Text>
      ) : images.length === 0 ? (
        <Text color={colors.muted}>No images yet. Upload your first one above.</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={5}>
          {images.map((img) => {
            const active = selectedId === img._id;
            return (
              <Box
                key={img._id}
                {...panelProps}
                overflow="hidden"
                borderColor={active ? colors.accent : colors.border}
                boxShadow={active ? "0 0 18px rgba(34, 211, 238, 0.25)" : "none"}
                transition="all 0.2s"
                _hover={{ borderColor: colors.accent }}
              >
                <Image
                  src={img.imageUrl}
                  alt={img.title || "Uploaded image"}
                  w="100%"
                  h="200px"
                  objectFit="cover"
                />
                <Box p={4}>
                  <Text fontWeight="bold" mb={3} truncate color={colors.text}>
                    {img.title || "untitled"}
                  </Text>
                  <Flex gap={2}>
                    <Button size="sm" onClick={() => onSelect(img._id)} {...ghostBtn}>
                      View ideas
                    </Button>
                    <Button size="sm" onClick={() => onDelete(img._id)} {...dangerBtn}>
                      Delete
                    </Button>
                  </Flex>
                </Box>
              </Box>
            );
          })}
        </SimpleGrid>
      )}
    </Box>
  );
}