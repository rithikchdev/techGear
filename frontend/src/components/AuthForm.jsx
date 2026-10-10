import { useState } from "react";
import { Box, Button, Heading, Input, Link, Stack, Text } from "@chakra-ui/react";
import { api } from "../api.js";
import { colors, panelProps, inputProps, primaryBtn } from "../ui.js";

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
    <Box
      maxW="420px"
      mx="auto"
      mt={{ base: 12, md: 24 }}
      p={8}
      {...panelProps}
      boxShadow="0 0 40px rgba(34, 211, 238, 0.08)"
    >
      <Text color={colors.accent} fontSize="sm" mb={3}>
        {mode === "login" ? "$ auth --login" : "$ auth --register"}
      </Text>
      <Heading size="xl" mb={1} color={colors.text}>
        {mode === "login" ? "Welcome back" : "Create account"}
      </Heading>
      <Text color={colors.muted} fontSize="sm" mb={6}>
        {mode === "login"
          ? "Authenticate to access your images."
          : "Register to start uploading images."}
      </Text>

      <Box as="form" onSubmit={submit}>
        <Stack gap={4}>
          {mode === "register" && (
            <Input
              name="name"
              placeholder="name"
              value={form.name}
              onChange={change}
              required
              {...inputProps}
            />
          )}
          <Input
            name="email"
            type="email"
            placeholder="email"
            value={form.email}
            onChange={change}
            required
            {...inputProps}
          />
          <Input
            name="password"
            type="password"
            placeholder="password (min 6 characters)"
            value={form.password}
            onChange={change}
            required
            minLength={6}
            {...inputProps}
          />

          {error && (
            <Text color={colors.danger} fontSize="sm">
              ! {error}
            </Text>
          )}

          <Button type="submit" loading={busy} {...primaryBtn}>
            {mode === "login" ? "Log in" : "Sign up"}
          </Button>

          {busy && (
            <Text fontSize="xs" color={colors.muted}>
              The server may be waking up. The first request can take up to a minute.
            </Text>
          )}
        </Stack>
      </Box>

      <Text mt={6} fontSize="sm" color={colors.muted}>
        {mode === "login" ? "No account yet? " : "Already registered? "}
        <Link
          as="button"
          color={colors.accent}
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