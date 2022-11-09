module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "quill-grey": "#DCD4D4",
        "secondary-blue": "#1A237E",
        "primary": "#B80041",
      },
    },
  },
  // add daisyUI plugin
  plugins: [
    require("daisyui"),
    require('@tailwindcss/line-clamp'),
  ],

  // daisyUI config (optional)
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "light",
  },
}