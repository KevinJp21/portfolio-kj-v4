import type { Metadata } from "next";
import { AboutTemplate } from "@/features";

export const metadata: Metadata = {
  title: "About · Kevin Julio Pineda",
  description:
    "Short story of a creative engineer — chapters, beliefs and things beyond the screen.",
};

export default function AboutPage() {
  return <AboutTemplate/>
}
