import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
        'cosmic-dark': 'var(--cosmic-dark)',
        'cosmic-blue': 'var(--cosmic-blue)',
        'shadow-purple': 'var(--shadow-purple)',
        'deep-purple': 'var(--deep-purple)',
        'celestial-black': 'var(--celestial-black)',
        'silver-star': 'var(--silver-star)',
        'golden-rune': 'var(--golden-rune)',
        'ethereal-white': 'var(--ethereal-white)',
        'void-black': 'var(--void-black)',
        'midnight-purple': 'var(--midnight-purple)',
      },
      fontFamily: {
        sans: ["var(--font-body)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
        gothic: ["var(--font-gothic)"],
        body: ["var(--font-body)"],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "cosmic-breath": {
          "0%, 100%": {
            transform: "scale(1) translateY(0px)",
            opacity: "0.7",
            textShadow: "0 0 20px hsl(43, 74%, 49%, 0.3)",
          },
          "50%": {
            transform: "scale(1.02) translateY(-2px)",
            opacity: "1",
            textShadow: "0 0 30px hsl(43, 74%, 49%, 0.6), 0 0 50px hsl(214, 32%, 81%, 0.3)",
          },
        },
        "starlight-pulse": {
          "0%": { opacity: "0.4", transform: "scale(1)" },
          "100%": { opacity: "1", transform: "scale(1.1)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
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
        "mystical-glow": {
          "0%, 100%": {
            boxShadow: "0 0 20px hsl(43, 74%, 49%, 0.3), inset 0 0 20px hsl(259, 46%, 22%, 0.5)",
          },
          "50%": {
            boxShadow: "0 0 40px hsl(43, 74%, 49%, 0.6), inset 0 0 30px hsl(259, 46%, 22%, 0.7)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "cosmic-breath": "cosmic-breath 4s ease-in-out infinite",
        "starlight-pulse": "starlight-pulse 2s ease-in-out infinite alternate",
        "float": "float 6s ease-in-out infinite",
        "fade-in-up": "fade-in-up 1s ease-out",
        "mystical-glow": "mystical-glow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
