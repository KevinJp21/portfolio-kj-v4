"use client";

import { TextReveal } from "@/components";

type ArticleTitleProps = {
  title: string;
};

export function ArticleTitle({ title }: ArticleTitleProps) {
  return (
    <h1 className="font-display text-[clamp(2.75rem,10vw,7rem)] leading-[0.9] text-bone-100">
      <TextReveal as="span" trigger="mount">
        {title}
      </TextReveal>
    </h1>
  );
}

export default ArticleTitle;