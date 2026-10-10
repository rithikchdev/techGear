import { useState, useEffect } from "react";
import { Box, Button, Heading, Image, Input, Stack, Text } from "@chakra-ui/react";

export default function UploadForm({ onUpload }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [title, setTitle] = useState("");
  const [inputKey, setInputKey] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const submit = async (e) => {
    e.preventDefault();
    if (!file) return setError("Please choose an image first");

    setError("");
    setUploading(true);
    try {
      await onUpload(file, title.trim());
      setFile(null);
      setTitle("");
      setInputKey((k) => k + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box bg="white" p={6} borderRadius="lg" shadow="sm" mb={10}>
      <Heading size="lg" mb={4}>
        Add an image
      </Heading>
      <Box as="form" onSubmit={submit}>
        <Stack gap={4}>
          <input
            key={inputKey}
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0] || null)}
          />
          <Input
            placeholder="Title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxW="400px"
          />
          {preview && (
            <Image
              src={preview}
              alt="Preview"
              maxH="200px"
              maxW="300px"
              objectFit="cover"
              borderRadius="md"
            />
          )}
          {error && <Text color="red.600">{error}</Text>}
          <Box>
            <Button type="submit" colorPalette="blue" loading={uploading}>
              Upload
            </Button>
            {uploading && (
              <Text mt={2} fontSize="sm" color="gray.600">
                Uploading and finding recommendations. This can take a few seconds.
              </Text>
            )}
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}