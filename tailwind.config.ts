import {nextui} from "@nextui-org/react";
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  themes: {
    "dark":{
    extend: {
      background: '#0D001A',
    },
    darkMode: "class",
  },
    "light":{
    extend: {
      background: '#F5F5F5',
    },
    }
  },
  plugins: [nextui()],
}
export default config
