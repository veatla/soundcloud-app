import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { API, type ObtainTokenResponse } from "../../../src/types/api";
import { ENV } from "../../../src/env";

export async function GET(request: NextRequest) {
  const cookie = request.cookies;
  const refresh_token = cookie.get("refresh_token");
  console.log(`refresh_token`, refresh_token);

  if (!refresh_token) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  if (!cookie.get("access_token")) {
    await refreshToken(refresh_token.value);
  }

  console.log(`Fetched`);
  const data = await API.GET("/me/playlists", {
    headers: { Authorization: `Bearer ${cookie.get("access_token")!.value}` },
  }).then((r) => r.data);
  console.log(`Fetched`, data);
  return NextResponse.json(data);
}

const refreshToken = async function refreshToken(refresh_token: string) {
  const cookie = await cookies();
  const params = new URLSearchParams();

  params.append("grant_type", "refresh_token");
  params.append("client_id", ENV.VITE_APP_SOUNDCLOUD_CLIENT_ID);
  params.append("client_secret", ENV.VITE_APP_SOUNDCLOUD_CLIENT_SECRET);
  params.append("refresh_token", refresh_token);

  const result = await fetch("https://secure.soundcloud.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });
  const body: ObtainTokenResponse = await result.json();

  if (body.token_type !== "Bearer") {
    throw new Error("Expected Bearer token from Soundcloud but got " + body.token_type);
  }
  cookie.set("access_token", body.access_token, {
    // current time + expire time(it's an 1 hour) - 5 min.
    expires: new Date(new Date().getTime() + body.expires_in * 1000 - 5 * 60000),
    path: "/",
  });
  cookie.set("refresh_token", body.refresh_token, {
    expires: new Date(new Date().setDate(new Date().getDate() + 7)),
    path: "/",
  });
  return body;
};
