import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { API, type ObtainTokenResponse } from "../../../src/types/api";
import { ENV } from "../../../src/env";
import z from "zod";
const schema = z.object({
  method: z.union([z.literal("GET"), z.literal("POST"), z.literal("DELETE"), z.literal("PUT")]),
  path: z.string(),
  body: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { body, method, path } = await schema.parseAsync(data);

    const cookies = req.cookies;
    const refresh_token = cookies.get("refresh_token")?.value;
    const access_token = cookies.get("access_token")?.value;

    console.log("refresh_token", refresh_token, "access_token", access_token);

    if (!refresh_token) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    let token = access_token;

    const res = NextResponse.next(); // создаем объект ответа, чтобы выставлять cookie

    if (!token) {
      const newTokens = await refreshToken(refresh_token, res);
      token = newTokens.access_token;
    }

    if (!token) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const apiResponse = await fetch(
      new URL(path.replace(/^\\/, ""), "https://api.soundcloud.com/"),
      {
        method,
        body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await apiResponse.json();
    return NextResponse.json(result, { status: apiResponse.status, headers: res.headers });
  } catch (err: any) {
    console.error("Proxy error:", err?.message);
    return NextResponse.json({ error: "proxy_failed" }, { status: 500 });
  }
}

// теперь refreshToken принимает NextResponse, чтобы ставить cookie
const refreshToken = async function refreshToken(refresh_token: string, res: NextResponse) {
  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("client_id", ENV.VITE_APP_SOUNDCLOUD_CLIENT_ID);
  params.append("client_secret", ENV.VITE_APP_SOUNDCLOUD_CLIENT_SECRET);
  params.append("refresh_token", refresh_token);

  const result = await fetch("https://secure.soundcloud.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  const body: ObtainTokenResponse = await result.json();

  if (body.token_type !== "Bearer") {
    throw new Error("Expected Bearer token from Soundcloud but got " + body.token_type);
  }

  res.cookies.set("access_token", body.access_token, {
    path: "/",
    expires: new Date(Date.now() + body.expires_in * 1000 - 5 * 60000),
    httpOnly: true,
  });

  res.cookies.set("refresh_token", body.refresh_token, {
    path: "/",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  });

  return body;
};
