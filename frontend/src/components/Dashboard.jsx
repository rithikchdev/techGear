import { useState, useEffect, useCallback } from "react";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { api } from "../api.js";
import { colors, ghostBtn } from "../ui.js";
import UploadForm from "./UploadForm.jsx";
import ImageGallery from "./ImageGallery.jsx";
import Recommendations from "./Recommendations.jsx";

export default function Dashboard({ token, user, onLogout }) {
  const [images, setImages] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleError = useCallback(
    (err) => {
      if (err.status === 401) onLogout();
      else setError(err.message);
    },
    [onLogout]
  );

  useEffect(() => {
    api("/api/images", { token })
      .then(setImages)
      .catch(handleError)
      .finally(() => setLoading(false));
  }, [token, handleError]);

  const uploadImage = async (file, title) => {
    const fd = new FormData();
    fd.append("image", file);
    if (title) fd.append("title", title);

    try {
      const img = await api("/api/images", {
        method: "POST",
        token,
        body: fd,
        isForm: true,
      });
      setImages((prev) => [img, ...prev]);
      setSelectedId(img._id);
    } catch (err) {
      if (err.status === 401) {
        onLogout();
        return;
      }
      throw err;
    }
  };

  const deleteImage = async (id) => {
    if (!window.confirm("Delete this image?")) return;
    try {
      await api(`/api/images/${id}`, { method: "DELETE", token });
      setImages((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      handleError(err);
    }
  };

  const selected = images.find((i) => i._id === selectedId) || images[0];

  return (
    <Box maxW="1100px" mx="auto" px={4} py={8}>
      <Flex
        justify="space-between"
        align="center"
        mb={10}
        pb={4}
        borderBottomWidth="1px"
        borderColor={colors.border}
      >
        <Box>
          <Heading size="2xl" color={colors.text}>
            <Text as="span" color={colors.accent}>
              &gt;{" "}
            </Text>
            my_images
          </Heading>
          <Text color={colors.muted} fontSize="sm" mt={1}>
            <Text as="span" color="#4ade80">
              ●
            </Text>{" "}
            signed in as {user?.name}
          </Text>
        </Box>
        <Button onClick={onLogout} {...ghostBtn}>
          Log out
        </Button>
      </Flex>

      {error && (
        <Text color={colors.danger} mb={4}>
          ! {error}
        </Text>
      )}

      <UploadForm onUpload={uploadImage} />

      <ImageGallery
        images={images}
        loading={loading}
        selectedId={selected?._id}
        onSelect={setSelectedId}
        onDelete={deleteImage}
      />

      <Recommendations image={selected} />

      <Text mt={16} fontSize="xs" color={colors.muted} textAlign="center">
        Recommendation links open Amazon search results.
      </Text>
    </Box>
  );
}