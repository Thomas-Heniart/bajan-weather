import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "path";

const main = async () => {
  // The composition you want to render
  const compositionId = "Barbados";

  // You only have to create a bundle once, and you may reuse it
  // for multiple renders that you can parametrize using input props.
  const bundleLocation = await bundle({
    entryPoint: path.resolve("./src/index.ts"),
    // If you have a webpack override in remotion.config.ts, pass it here as well.
    webpackOverride: (config) => config,
  });

  // Parametrize the video by passing props to your component.
  const inputProps = {
    foo: "bar",
  };

  // Get the composition you want to render. Pass `inputProps` if you
  // want to customize the duration or other metadata.
  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: compositionId,
    inputProps,
  });

  // Render the video. Pass the same `inputProps` again
  // if your video is parametrized with data.
  await renderMedia({
    composition,
    serveUrl: bundleLocation,
    codec: "h264",
    outputLocation: `out/${compositionId}.mp4`,
    inputProps,
  });
};

main()
  .then(() => {
    console.log("Render done!");
  })
  .catch((e) => {
    console.error("An error occurred", e);
    process.exit(1);
  });