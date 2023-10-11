import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green: "#46783E",
        gold: "#CCB801",
      }
    },
  },
  plugins: [],
} satisfies Config;
