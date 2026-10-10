import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  globalCss: {
    html: { bg: "#05070a" },
    body: {
      bg: "#05070a",
      color: "#e6edf3",
      backgroundImage: "radial-gradient(ellipse at top, #0b1a26 0%, #05070a 60%)",
      backgroundAttachment: "fixed",
    },
    "input[type='file']::file-selector-button": {
      background: "#0a0f16",
      color: "#22d3ee",
      border: "1px solid #1c2733",
      padding: "6px 12px",
      marginRight: "12px",
      borderRadius: "2px",
      cursor: "pointer",
      fontFamily: "inherit",
    },
  },
  theme: {
    tokens: {
      fonts: {
        heading: { value: "'JetBrains Mono', ui-monospace, Menlo, monospace" },
        body: { value: "'JetBrains Mono', ui-monospace, Menlo, monospace" },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);