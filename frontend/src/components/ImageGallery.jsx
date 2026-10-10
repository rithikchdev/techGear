import { Box, Button, Flex, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";

export default function ImageGallery({ images, loading, selectedId, onSelect, onDelete }) {
  return (
    <Box>
      <Heading size="lg" mb={4}>
        Gallery
      </Heading>

      {loading ? (
        <Text>Loading...</Text>
      ) : images.length === 0 ? (
        <Text color="gray.600">No images yet. Upload your first one above.</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={5}>
          {images.map((img) => (
            <Box
              key={img._id}
              bg="white"
              borderRadius="lg"
              overflow="hidden"
              shadow="sm"
              borderWidth="2px"
              borderColor={selectedId === img._id ? "blue.500" : "transparent"}
            >
              <Image
                src={img.imageUrl}
                alt={img.title || "Uploaded image"}
                w="100%"
                h="200px"
                objectFit="cover"
              />
              <Box p={4}>
                <Text fontWeight="semibold" mb={3} truncate>
                  {img.title || "Untitled"}
                </Text>
                <Flex gap={2}>
                  <Button size="sm" onClick={() => onSelect(img._id)}>
                    View ideas
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    colorPalette="red"
                    onClick={() => onDelete(img._id)}
                  >
                    Delete
                  </Button>
                </Flex>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}