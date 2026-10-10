import { useState } from "react";
import { Box, Button, Heading, Input, Link, Stack, Text } from "@chakra-ui/react";
import { api } from "../api.js";

export default function AuthForm({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const payload =
        mode === "login" ? { email: form.email, password: form.password } : form;
      const data = await api(`/api/auth/${mode}`, { method: "POST", body: payload });
      onAuth(data.token, data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box maxW="420px" mx="auto" mt={16} p={8} bg="white" borderRadius="lg" shadow="md">
      <Heading size="xl" mb={1}>
        {mode === "login" ? "Welcome back" : "Create account"}
      </Heading>
      <Text color="gray.600" mb={6}>
        {mode === "login"
          ? "Log in to see your images."
          : "Sign up to start uploading images."}
      </Text>

      <Box as="form" onSubmit={submit}>
        <Stack gap={4}>
          {mode === "register" && (
            <Input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={change}
              required
            />
          )}
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={change}
            required
          />
          <Input
            name="password"
            type="password"
            placeholder="Password (min 6 characters)"
            value={form.password}
            onChange={change}
            required
            minLength={6}
          />

          {error && <Text color="red.600">{error}</Text>}

          <Button type="submit" colorPalette="blue" loading={busy}>
            {mode === "login" ? "Log in" : "Sign up"}
          </Button>
        </Stack>
      </Box>

      <Text mt={5} fontSize="sm" color="gray.600">
        {mode === "login" ? "No account yet? " : "Already registered? "}
        <Link
          as="button"
          color="blue.600"
          onClick={() => {
            setError("");
            setMode(mode === "login" ? "register" : "login");
          }}
        >
          {mode === "login" ? "Sign up" : "Log in"}
        </Link>
      </Text>
    </Box>
  );
}