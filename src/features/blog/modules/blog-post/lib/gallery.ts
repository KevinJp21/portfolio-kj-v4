import {
  Children,
  Fragment,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

export type GalleryImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  title?: string;
};

export type GalleryLayout = "rows" | "columns" | "masonry";

export type GalleryProps = {
  images?: GalleryImageProps[];
  children?: ReactNode;
  layout?: GalleryLayout;
  targetRowHeight?: number;
  columns?: number;
  className?: string;
};

function isGalleryImageProps(props: unknown): props is GalleryImageProps {
  if (!props || typeof props !== "object") return false;

  const candidate = props as Record<string, unknown>;
  const width = candidate.width;
  const height = candidate.height;

  return (
    typeof candidate.src === "string" &&
    typeof candidate.alt === "string" &&
    (typeof width === "number" || typeof width === "string") &&
    (typeof height === "number" || typeof height === "string")
  );
}

export function normalizeGalleryImage(
  props: GalleryImageProps,
): GalleryImageProps {
  return {
    ...props,
    width: Number(props.width),
    height: Number(props.height),
  };
}

export function collectGalleryImages(nodes: ReactNode): GalleryImageProps[] {
  const items: GalleryImageProps[] = [];

  Children.forEach(nodes, (child) => {
    if (!isValidElement(child)) return;

    if (child.type === Fragment) {
      items.push(
        ...collectGalleryImages(
          (child as ReactElement<{ children?: ReactNode }>).props.children,
        ),
      );
      return;
    }

    if (isGalleryImageProps(child.props)) {
      items.push(normalizeGalleryImage(child.props as GalleryImageProps));
    }
  });

  return items;
}

export function resolveGalleryImages(
  images: GalleryImageProps[] | undefined,
  children: ReactNode,
): GalleryImageProps[] {
  if (images?.length) return images.map(normalizeGalleryImage);
  return collectGalleryImages(children);
}
