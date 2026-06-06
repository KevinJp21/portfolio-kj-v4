import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // "/" must be listed explicitly — the catch-all regex does not match the root path.
  matcher: ["/", "/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
