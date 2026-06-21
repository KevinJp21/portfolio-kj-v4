import Image from "next/image";
import { AVATAR_URL } from "@/const";

export const PortraitArtwork = () => {
  return (
    <div className="relative h-full w-full overflow-hidden bg-ink-900">
      <Image
        src={AVATAR_URL}
        alt="Kevin Julio Pineda — retrato"
        fill
        sizes="(max-width: 768px) 80vw, 480px"
        className="object-cover object-[50%_22%]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-ink-900/75 to-transparent"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-linear-to-b from-ink-900/40 to-transparent"
      />
      <svg
        viewBox="0 0 300 400"
        className="pointer-events-none absolute inset-0 h-full w-full mix-blend-screen"
        aria-hidden
      >
        <g fill="#f4efe6" fontFamily="ui-monospace, monospace" fontSize="9" opacity="0.85">
          <text x="14" y="22">KJP / portfolio</text>
          <text x="218" y="22">PORTRAIT</text>
          <text x="14" y="388">REV / 04 · 26</text>
          <text x="208" y="388">BAQ · Colombia</text>
        </g>
      </svg>
    </div>
  );
}

export default PortraitArtwork;