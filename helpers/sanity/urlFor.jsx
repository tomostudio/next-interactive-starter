import imageUrlBuilder from "@sanity/image-url";
import { config } from "./client";

const builder = imageUrlBuilder(config);

const urlFor = (source) => builder.image(source);

export default urlFor;
