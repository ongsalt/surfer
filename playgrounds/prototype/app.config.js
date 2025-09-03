import { svelte } from "@sveltejs/vite-plugin-svelte";
import { createApp } from "vinxi";

const app = createApp({
  routers: [
    {
      name: "public",
      type: "static",
      dir: "./public",
    },
    {
      name: "client",
      type: "client",
      handler: "./src/core/vinxi/client.ts",
      // handler: "./index.html",
      target: "browser",
      plugins: () => [svelte()],
      base: "/_build",
    },
    {
      name: "ssr",
      type: "http",
      handler: "./src/core/vinxi/server.ts",
      plugins: () => [
        svelte({})
      ],
      target: "server",
    },
  ],
});

// console.log(app)

export default app;
