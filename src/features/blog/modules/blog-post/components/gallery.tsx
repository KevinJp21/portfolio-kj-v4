import dynamic from "next/dynamic";
import { resolveGalleryImages, GalleryProps } from "../lib";

const ArticleGallery = dynamic(() =>
  import("./article/article-gallery").then((mod) => mod.ArticleGallery),
);

export function Gallery({ children, images, ...props }: GalleryProps) {
  const resolvedImages = resolveGalleryImages(images, children);

  if (resolvedImages.length === 0) return null;

  return <ArticleGallery images={resolvedImages} {...props} />;
}
