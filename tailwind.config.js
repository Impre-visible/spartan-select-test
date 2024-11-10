/** @type {import('tailwindcss').Config} */
import hlmTailwindPreset from '@spartan-ng/ui-core/hlm-tailwind-preset';


module.exports = {
  presets: [hlmTailwindPreset],
  content: [
    "./src/**/*.{html,ts}",
    "./lib/ui/**/*"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

