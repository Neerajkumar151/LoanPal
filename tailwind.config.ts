import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["'DM Sans'", "system-ui", "sans-serif"],
        display: ["'Space Grotesk'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      fontSize: {
        'display-xl': ['5.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '700' }],
        'display-lg': ['4rem', { lineHeight: '1.08', letterSpacing: '-0.025em', fontWeight: '700' }],
        'display-md': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-sm': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.015em', fontWeight: '600' }],
        'heading': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7', letterSpacing: '-0.01em' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'caption': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        'overline': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.12em', fontWeight: '600' }],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: "hsl(var(--surface))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        "chat-user": "hsl(var(--chat-user))",
        "chat-ai": "hsl(var(--chat-ai))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "typing": {
          "0%, 60%, 100%": { opacity: "0.3" },
          "30%": { opacity: "1" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "glow": {
          "0%, 100%": { boxShadow: "0 0 12px hsl(var(--primary) / 0.2)" },
          "50%": { boxShadow: "0 0 24px hsl(var(--primary) / 0.35)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "typing": "typing 1.4s infinite",
        "float": "float 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "slide-up": "slide-up 0.4s ease-out",
        "glow": "glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
