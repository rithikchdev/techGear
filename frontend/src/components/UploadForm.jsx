import { useState, useEffect } from "react";
import { Box, Button, Heading, Image, Input, Stack, Text } from "@chakra-ui/react";
import { colors, panelProps, inputProps, primaryBtn } from "../ui.js";

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
    <Box p={6} mb={12} {...panelProps}>
      <Text color={colors.accent} fontSize="sm" mb={1}>
        $ upload --image
      </Text>
      <Heading size="lg" mb={5} color={colors.text}>
        Add an image
      </Heading>

      <Box as="form" onSubmit={submit}>
        <Stack gap={4}>
          <input
            key={inputKey}
            type="file"
            accept="image/*"
            style={{ color: colors.muted, fontSize: "14px" }}
            onChange={(e) => setFile(e.target.files[0] || null)}
          />
          <Input
            placeholder="title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxW="400px"
            {...inputProps}
          />
          {preview && (
            <Image
              src={preview}
              alt="Preview"
              maxH="200px"
              maxW="300px"
              objectFit="cover"
              borderRadius="sm"
              borderWidth="1px"
              borderColor={colors.border}
            />
          )}
          {error && (
            <Text color={colors.danger} fontSize="sm">
              ! {error}
            </Text>
          )}
          <Box>
            <Button type="submit" loading={uploading} {...primaryBtn}>
              Upload
            </Button>
            {uploading && (
              <Text mt={2} fontSize="xs" color={colors.muted}>
                Uploading and finding recommendations. This can take a few seconds.
              </Text>
            )}
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}