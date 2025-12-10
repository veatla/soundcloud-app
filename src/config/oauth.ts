import { ENV } from "../env";

function base64URLEncode(buffer: Uint8Array<ArrayBuffer> | ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

async function generatePkcePair(): Promise<{ codeVerifier: string; codeChallenge: string }> {
  const buffer = new Uint8Array(32);
  const codeVerifier = base64URLEncode(crypto.getRandomValues(buffer));
  const sha256Hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(codeVerifier));
  const codeChallenge = base64URLEncode(sha256Hash);
  return { codeVerifier, codeChallenge };
}

export default async function AuthorizeSoundCloud() {
  const { codeVerifier, codeChallenge } = await generatePkcePair();
  // Store codeVerifier securely for later use (e.g., in localStorage or session storage)
  localStorage.setItem("pkce_code_verifier", codeVerifier);
  const state = crypto.randomUUID();
  localStorage.setItem("pkce_state", state);

  const authUrl = new URL("http://localhost:3000/api/oauth/soundcloud");
  authUrl.searchParams.append("client_id", ENV.VITE_APP_SOUNDCLOUD_CLIENT_ID);
  authUrl.searchParams.append("redirect_uri", ENV.VITE_APP_SOUNDCLOUD_REDIRECT_URL);
  authUrl.searchParams.append("response_type", "code");
  authUrl.searchParams.append("state", state);
  authUrl.searchParams.append("code_challenge", codeChallenge);
  authUrl.searchParams.append("code_challenge_method", "S256");

  window.location.assign(authUrl.toString());
}
