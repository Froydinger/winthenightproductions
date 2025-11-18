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
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
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
        neon: {
          blue: "hsl(var(--neon-blue))",
          dim: "hsl(var(--neon-blue-dim))",
        },
        charcoal: "hsl(var(--charcoal))",
        glass: "hsl(var(--glass))",
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
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "glow-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 15px hsl(var(--neon-blue) / 0.3), 0 0 30px hsl(var(--neon-blue) / 0.2)",
          },
          "50%": {
            boxShadow: "0 0 20px hsl(var(--neon-blue) / 0.4), 0 0 40px hsl(var(--neon-blue) / 0.3)",
          },
        },
        "gradient-shift": {
          "0%, 100%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
        },
        "float": {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
        "breathe": {
          "0%, 100%": {
            transform: "scale(1)",
            opacity: "0.95",
          },
          "50%": {
            transform: "scale(1.02)",
            opacity: "1",
          },
        },
        "wiggle": {
          "0%, 100%": {
            transform: "rotate(-1deg)",
          },
          "50%": {
            transform: "rotate(1deg)",
          },
        },
        "blink": {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.3",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        "glow-pulse": "glow-pulse 30s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "float": "float 6s ease-in-out infinite",
        "breathe": "breathe 400s ease-in-out infinite",
        "wiggle": "wiggle 3s ease-in-out infinite",
        "blink": "blink 3s ease-in-out infinite",
      },
      boxShadow: {
        "neon": "0 0 20px hsl(var(--neon-blue) / 0.5), 0 0 40px hsl(var(--neon-blue) / 0.3)",
        "neon-strong": "0 0 30px hsl(var(--neon-blue) / 0.7), 0 0 60px hsl(var(--neon-blue) / 0.5), 0 0 100px hsl(var(--neon-blue) / 0.3)",
        "glass": "0 8px 32px 0 rgba(0, 217, 255, 0.15)",
      },
      backdropBlur: {
        "glass": "12px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
