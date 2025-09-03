import { render } from "svelte/server";
import { eventHandler } from "vinxi/http";
import { getManifest } from "vinxi/manifest";
import SsrShell from "./ssr-shell.svelte";
import indexHtml from "../../index.html?raw";
import Counter from "../../counter.svelte";

function replaceContent(head: string, body: string) {
  return indexHtml
    .replace("%surfer.head%", head)
    .replace("%surfer.body%", body);
}

export default eventHandler({
  handler: async (event) => {
    const clientManifest = getManifest("client");
    const handler = await clientManifest.inputs[clientManifest.handler];
    const assets = await handler?.assets();
    // console.log(assets)

    const clientScript = handler?.output.path;

    const renderOutput = render(SsrShell, {
      props: {
        assets,
        clientScript,
        child: Counter
      }
    });


    const html = replaceContent(renderOutput.head, renderOutput.body);

    return html;
  }
});