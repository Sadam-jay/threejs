export default {
  root: "src/",
  publicDir: "../static/",
  base: "./",
  build: {
    outDir: "../dist", // ← this is the key change
    emptyOutDir: true, // optional: cleans dist before build
  },
};
