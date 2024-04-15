import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const isAuthPage = req.nextUrl.pathname.startsWith("/sign-in");
    if (isAuthPage) {
      if (req.nextauth.token) {
        return NextResponse.redirect(new URL("/mind", req.url));
      }

      return null;
    }

    if (!req.nextauth.token) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/sign-in", "/mind"],
};
