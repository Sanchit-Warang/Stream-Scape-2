import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'borderr' : 'rgba(var(--borderr))',
        'copy-light': 'rgba(var(--copy-light))',
        'copy-lighter': 'rgba(var(--copy-lighter))',
        temp: 'rgba(var(--card-background))',
        'card-background': 'rgba(var(--card-background))',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            background: '#15191e',
            primary: {
              DEFAULT: '#006de9',
              foreground: '#e9f3ff',
            },
            secondary: {
              DEFAULT: '#e900e1',
              foreground: '#ffe9fe',
            },
            foreground: '#fbfbfc',
          },
        },
      },
    }),
    require('tailwind-scrollbar'),
  ],
}
export default config
