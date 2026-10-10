import { Box, Heading, Link, SimpleGrid, Text } from "@chakra-ui/react";
import { colors, panelProps } from "../ui.js";

export default function Recommendations({ image }) {
  if (!image) return null;

  return (
    <Box mt={14}>
      <Text color={colors.accent} fontSize="sm" mb={1}>
        $ recommend --source amazon
      </Text>
      <Heading size="lg" mb={1} color={colors.text}>
        Recommended for "{image.title || "this image"}"
      </Heading>
      <Text color={colors.muted} fontSize="sm" mb={5}>
        Ideas based on your image.
      </Text>

      {image.recommendations?.length ? (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={5}>
          {image.recommendations.map((rec) => (
            <Box
              key={rec._id || rec.title}
              p={5}
              {...panelProps}
              borderLeftWidth="3px"
              borderLeftColor={colors.accent}
              transition="all 0.2s"
              _hover={{ borderColor: colors.accent, boxShadow: "0 0 18px rgba(34, 211, 238, 0.15)" }}
            >
              <Text fontWeight="bold" mb={2} color={colors.text}>
                {rec.title}
              </Text>
              <Text fontSize="sm" color={colors.muted} mb={4}>
                {rec.reason}
              </Text>
              {rec.link && (
                <Link
                  href={rec.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  color={colors.accent}
                  fontWeight="bold"
                  fontSize="sm"
                >
                  View on Amazon →
                </Link>
              )}
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <Text color={colors.muted}>No recommendations available for this image.</Text>
      )}
    </Box>
  );
}