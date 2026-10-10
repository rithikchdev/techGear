import { useState, useCallback } from "react";
import { Box } from "@chakra-ui/react";
import StarBackground from "./components/StarBackground.jsx";
import AuthForm from "./components/AuthForm.jsx";
import Dashboard from "./components/Dashboard.jsx";

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  const handleAuth = (newToken, newUser) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }, []);

  return (
    <Box minH="100vh" position="relative">
      <StarBackground />
      <Box position="relative" zIndex={1}>
        {token ? (
          <Dashboard token={token} user={user} onLogout={logout} />
        ) : (
          <AuthForm onAuth={handleAuth} />
        )}
      </Box>
    </Box>
  );
}