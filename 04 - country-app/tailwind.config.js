import daisyui from "daisyui";

export default {
  content: ["./src/**/*.{html,ts}"],
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe"],
  },
};