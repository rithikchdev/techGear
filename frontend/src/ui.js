export const colors = {
  panel: "rgba(12, 17, 24, 0.78)",
  border: "#1c2733",
  accent: "#22d3ee",
  accentSoft: "#67e8f9",
  text: "#e6edf3",
  muted: "#8b98a5",
  danger: "#f87171",
};

export const panelProps = {
  bg: colors.panel,
  borderWidth: "1px",
  borderColor: colors.border,
  borderRadius: "md",
  backdropFilter: "blur(6px)",
};

export const inputProps = {
  bg: "#0a0f16",
  color: colors.text,
  borderColor: colors.border,
  borderRadius: "sm",
  _placeholder: { color: colors.muted },
  _focusVisible: {
    borderColor: colors.accent,
    boxShadow: `0 0 0 1px ${colors.accent}`,
    outline: "none",
  },
};

export const primaryBtn = {
  bg: colors.accent,
  color: "#001015",
  fontWeight: "bold",
  borderRadius: "sm",
  _hover: { bg: colors.accentSoft },
};

export const ghostBtn = {
  variant: "outline",
  color: colors.accent,
  borderColor: colors.accent,
  borderRadius: "sm",
  _hover: { bg: "rgba(34, 211, 238, 0.1)" },
};

export const dangerBtn = {
  variant: "outline",
  color: colors.danger,
  borderColor: colors.danger,
  borderRadius: "sm",
  _hover: { bg: "rgba(248, 113, 113, 0.1)" },
};