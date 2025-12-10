import { cookies } from "next/headers";
import { ENV } from "../../../../src/env";
import type { ObtainTokenResponse } from "../../../../src/types/api";
import type { NextRequest } from "next/server";
function base64url(buf: ArrayBuffer) {
  return Buffer.from(buf)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

export async function GET(request: NextRequest) {
  console.log(`11111111111111`, request.url);
  const url = new URL(request.url);
  // сохраняем verifier в httpOnly cookie (клиент его не видит)
  const cookie = await cookies();
  const challenge = cookie.get("pkce_code_verifier");
  const state = cookie.get("pkce_state");

  //

  if (!challenge) throw new Error("Please use same browser to finish authorization");
  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("client_id", ENV.VITE_APP_SOUNDCLOUD_CLIENT_ID);
  params.append("client_secret", ENV.VITE_APP_SOUNDCLOUD_CLIENT_SECRET);
  params.append("redirect_uri", ENV.VITE_APP_SOUNDCLOUD_REDIRECT_URL);
  params.append("code_verifier", challenge.value);
  params.append("code", url.searchParams.get("code")!);

  const result = await fetch("https://secure.soundcloud.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  const body: ObtainTokenResponse = await result.json();

  console.log(`RESRESRSE`, body);

  if (body.token_type !== "Bearer") {
    throw new Error("Expected Bearer token from Soundcloud but got " + body.token_type);
  }

  cookie.set("access_token", body.access_token, {
    // current time + expire time(it's an 1 hour) - 5 min.
    expires: new Date(new Date().getTime() + body.expires_in * 1000),
    path: "/",
  });

  cookie.set("refresh_token", body.refresh_token, {
    expires: new Date(new Date().setDate(new Date().getDate() + 7)),
    path: "/",
  });

  return Response.redirect(new URL("/dashboard", request.url));
}
