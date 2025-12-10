import { cookies } from "next/headers";
import { ENV } from "../../../../src/env";

function base64url(buf: ArrayBuffer) {
  return Buffer.from(buf)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

export async function GET() {
  const verifier = base64url(crypto.getRandomValues(new Uint8Array(32)).buffer);
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier));
  const challenge = base64url(hash);

  const cookie = await cookies();
  cookie.set("pkce_code_verifier", verifier, {
    httpOnly: true,
    secure: true,
    path: "/",
  });

  const state = crypto.randomUUID();
  cookie.set("pkce_state", state, {
    httpOnly: true,
    secure: true,
    path: "/",
  });

  const url = new URL("https://secure.soundcloud.com/authorize");
  url.searchParams.set("client_id", ENV.VITE_APP_SOUNDCLOUD_CLIENT_ID!);
  url.searchParams.set("redirect_uri", ENV.VITE_APP_SOUNDCLOUD_REDIRECT_URL!);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("state", state);
  url.searchParams.set("code_challenge", challenge);
  url.searchParams.set("code_challenge_method", "S256");

  return Response.redirect(url.toString());
}
