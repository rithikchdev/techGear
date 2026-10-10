import { useState, useEffect, useCallback } from "react";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { api } from "../api.js";
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
      <Flex justify="space-between" align="center" mb={8}>
        <Box>
          <Heading size="2xl">My Images</Heading>
          <Text color="gray.600">Signed in as {user?.name}</Text>
        </Box>
        <Button variant="outline" onClick={onLogout}>
          Log out
        </Button>
      </Flex>

      {error && (
        <Text color="red.600" mb={4}>
          {error}
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
    </Box>
  );
}