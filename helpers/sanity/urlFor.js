import client from "./client";
import createImageUrlBuilder from "@sanity/image-url";

const builder = createImageUrlBuilder(client);

const urlFor = (source) => builder.image(source);

export default urlFor;
