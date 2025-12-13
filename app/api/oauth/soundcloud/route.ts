import { cookies } from "next/headers";
import { ENV } from "../../../../src/env";
import type { ObtainTokenResponse } from "../../../../src/types/api";
import { NextResponse, type NextRequest } from "next/server";
function base64url(buf: ArrayBuffer) {
  return Buffer.from(buf)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);

  const res = NextResponse.redirect(new URL("/dashboard", request.url));

  const cookieStore = request.cookies;
  const challenge = cookieStore.get("pkce_code_verifier")?.value;
  const state = cookieStore.get("pkce_state")?.value;

  if (!challenge) throw new Error("Please use same browser to finish authorization");

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("client_id", ENV.VITE_APP_SOUNDCLOUD_CLIENT_ID);
  params.append("client_secret", ENV.VITE_APP_SOUNDCLOUD_CLIENT_SECRET);
  params.append("redirect_uri", ENV.VITE_APP_SOUNDCLOUD_REDIRECT_URL);
  params.append("code_verifier", challenge);
  params.append("code", url.searchParams.get("code")!);

  const result = await fetch("https://secure.soundcloud.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  const body: ObtainTokenResponse = await result.json();

  if (body.token_type !== "Bearer") {
    throw new Error("Expected Bearer token from Soundcloud but got " + body.token_type);
  }

  // выставляем cookie через NextResponse
  res.cookies.set("access_token", body.access_token, {
    path: "/",
    expires: new Date(Date.now() + body.expires_in * 1000),
    httpOnly: true,
  });

  res.cookies.set("refresh_token", body.refresh_token, {
    path: "/",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  });

  return res;
}
