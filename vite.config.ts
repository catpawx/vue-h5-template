import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "@vant/auto-import-resolver";
import UnoCSS from "unocss/vite";
import { loadEnv } from "vite";

// 当前执行node命令时文件夹的地址(工作目录)
const root = process.cwd();

// https://vite.dev/config/

export default defineConfig(({ command, mode }) => {
  let env = {} as any;
  const isBuild = command === "build";
  if (!isBuild) {
    env = loadEnv(process.argv[3] === "--mode" ? process.argv[4] : process.argv[3], root);
  } else {
    env = loadEnv(mode, root);
  }
  console.log("env", env);
  return {
    plugins: [
      vue(),
      UnoCSS(),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        imports: ["vue", "vue-router"],
        dirs: ["src/hooks"],
        dts: "src/types/auto-imports.d.ts",
        resolvers: [VantResolver()],
      }),
      Components({
        dts: "src/types/components.d.ts",
        resolvers: [VantResolver()],
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: env.VITE_OUT_DIR || "dist",
    },
    server: {
      host: true,
      port: env.VITE_PORT,
    },
  };
});
