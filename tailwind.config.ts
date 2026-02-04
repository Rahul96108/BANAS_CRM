import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F9FAFB", // Off-White (Gray-50)
        "banas-blue": {
          DEFAULT: "#1E40AF", // Standard Blue (Blue-800)
          hover: "#1E3A8A",   // Darker Blue (Blue-900)
          light: "#DBEAFE",   // Light Blue (Blue-100)
        }
      },
    },
  },
  plugins: [],
};
export default config;
