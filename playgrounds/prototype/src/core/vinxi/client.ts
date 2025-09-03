import { hydrate } from "svelte";
import SsrShell from "./ssr-shell.svelte";
import { getManifest } from "vinxi/manifest";
import Counter from "../../counter.svelte";

console.log("gaythai")
const clientManifest = getManifest("client");
const handler = await clientManifest.inputs[clientManifest.handler];
const assets = await handler?.assets();

hydrate(SsrShell, {
  target: document.body,
  props: {
    assets,
    child: Counter
  }
});


if (import.meta.hot) {
	import.meta.hot.accept((mod) => {
		if (mod) {
      console.log(mod)
    }
	});
}


console.log("ksdjfhgufsjm")
