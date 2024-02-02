import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "lib/index.js",
      format: "es",
    },
    {
      file: "lib/cjs/index.js",
      format: "cjs",
    },
  ],
  plugins: [typescript(), terser()],
};
