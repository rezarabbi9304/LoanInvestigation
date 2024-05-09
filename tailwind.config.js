/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--theme-background)",
        backgroundVariant: "var(--theme-backgroundVariant)",
        onBackground: "var(--theme-on-background)",
        onBackgroundVariant: "var(--theme-on-backgroundVariant)",
        primary: "var(--theme-primary)",
        primaryVariant: "var(--theme-primaryVariant)",
        onPrimary: "var(--theme-on-primary)",
        onPrimaryVariant: "var(--theme-on-primaryVariant)",
        secondary: "var(--theme-secondary)",
        onSecondary: "var(--theme-on-secondary)",
        secondaryVariant: "var(--theme-secondary-variant)",
        surface: "var(--theme-surface)",
        surfaceFocus: "var(--theme-surfaceFocus)",
        onSurface: "var(--theme-on-surface)",
        onSurfaceVariant: "var(--theme-on-surfaceVariant)",
        error: "var(--theme-error)",
        onError: "var(--theme-on-error)",
        success: "var(--theme-success)",
        onSuccess: "var(--theme-on-success)",
      },
    },
  },
  plugins: [],
};
