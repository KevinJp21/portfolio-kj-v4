"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import {
  ColumnsPhotoAlbum,
  MasonryPhotoAlbum,
  RowsPhotoAlbum,
  type Photo,
  type RenderImageContext,
  type RenderImageProps,
} from "react-photo-album";
import "react-photo-album/rows.css";
import "react-photo-album/columns.css";
import "react-photo-album/masonry.css";
import "yet-another-react-lightbox/styles.css";

import { ScopeFrame } from "@/components";
import { cn } from "@/lib/utils";
import type { GalleryImageProps, GalleryProps } from "../../lib";

const albumSizes = {
  size: "1168px",
  sizes: [{ viewport: "(max-width: 1200px)", size: "calc(100vw - 32px)" }],
} as const;

const renderNextImage = ({ alt = "", title, sizes }: RenderImageProps, { photo, width, height }: RenderImageContext,) => {
  return (
    <div
      className="relative w-full overflow-hidden rounded-lg"
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <Image
        fill
        src={photo.src}
        alt={alt}
        title={title}
        sizes={sizes}
        className="object-cover transition-transform duration-500 hover:scale-[1.02]"
      />
    </div>
  );
}

export const ArticleGallery = ({
  images,
  layout = "rows",
  targetRowHeight = 280,
  columns = 3,
  className,
}: Omit<GalleryProps, "children"> & { images: GalleryImageProps[] }) => {
  const [index, setIndex] = useState(-1);

  const photos = useMemo<Photo[]>(
    () =>
      images.map((image) => ({
        src: image.src,
        alt: image.alt,
        title: image.title,
        width: image.width,
        height: image.height,
      })),
    [images],
  );

  const slides = useMemo(
    () =>
      images.map((image) => ({
        src: image.src,
        alt: image.alt,
        title: image.title,
      })),
    [images],
  );

  if (images.length === 0) return null;

  const sharedProps = {
    photos,
    spacing: 8,
    padding: 0,
    defaultContainerWidth: 1200,
    sizes: albumSizes,
    onClick: ({ index: photoIndex }: { index: number }) =>
      setIndex(photoIndex),
    render: { image: renderNextImage },
  };

  return (
    <figure data-fade className={cn("not-prose my-10", className)}>
      <ScopeFrame className="overflow-hidden rounded-2xl border border-rule bg-ink-850/60 p-3 sm:p-4">
        <div className="blog-gallery [&_.react-photo-album--button]:rounded-lg [&_.react-photo-album--button]:cursor-zoom-in">
          {layout === "columns" ? (
            <ColumnsPhotoAlbum {...sharedProps} columns={columns} />
          ) : layout === "masonry" ? (
            <MasonryPhotoAlbum {...sharedProps} columns={columns} />
          ) : (
            <RowsPhotoAlbum
              {...sharedProps}
              targetRowHeight={targetRowHeight}
            />
          )}
        </div>
      </ScopeFrame>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Zoom]}
        styles={{
          container: { backgroundColor: "rgba(4, 6, 10, 0.96)" },
        }}
        controller={{ closeOnBackdropClick: true }}
      />
    </figure>
  );
}

export default ArticleGallery;