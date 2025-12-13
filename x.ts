import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { API } from "./src/types/api";

export async function proxy(req: NextRequest) {
  const refresh = req.cookies.get("refresh_token")?.value;
  console.log(refresh);
  if (!refresh) {
    return NextResponse.redirect(new URL("/api/auth/soundcloud", req.url));
  }

  try {
    await API.GET("/me");
    return NextResponse.next();
  } catch (err) {
    console.log(`refreshrefresh`, err);
    return NextResponse.redirect(new URL("/api/auth/soundcloud", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"], // какие страницы защищены
};
