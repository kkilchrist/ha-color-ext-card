import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";

const isRelease = process.env.RELEASE === "true";

export default {
  input: "src/input-color-card.ts",
  output: {
    file: "dist/input-color-card.js",
    format: "es",
    sourcemap: isRelease ? true : "inline",
  },
  plugins: [
    resolve(),
    typescript({
      tsconfig: "./tsconfig.json",
      sourceMap: true,
      inlineSources: !isRelease,
    }),
    ...(isRelease ? [terser({ format: { comments: false } })] : []),
  ],
};
