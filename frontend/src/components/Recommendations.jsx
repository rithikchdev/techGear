import { Box, Heading, Link, SimpleGrid, Text } from "@chakra-ui/react";

export default function Recommendations({ image }) {
  if (!image) return null;

  return (
    <Box mt={14}>
      <Heading size="lg" mb={1}>
        Recommended for "{image.title || "this image"}"
      </Heading>
      <Text color="gray.600" mb={5}>
        Ideas based on your image. Links open Amazon search results.
      </Text>

      {image.recommendations?.length ? (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={5}>
          {image.recommendations.map((rec) => (
            <Box key={rec._id || rec.title} bg="white" p={5} borderRadius="lg" shadow="sm">
              <Text fontWeight="bold" mb={2}>
                {rec.title}
              </Text>
              <Text fontSize="sm" color="gray.600" mb={4}>
                {rec.reason}
              </Text>
              {rec.link && (
                <Link
                  href={rec.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="blue.600"
                  fontWeight="semibold"
                >
                  View on Amazon →
                </Link>
              )}
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <Text color="gray.600">No recommendations available for this image.</Text>
      )}
    </Box>
  );
}