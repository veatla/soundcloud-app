// import { useEffect } from "react";
// import { ENV } from "./env";
// import { type ObtainTokenResponse } from "./types/api";
// import { setCookie } from "./utils/cookie";
// import { redirect } from "react-router";

// const finishRequest = async () => {
//   const url = new URL(window.location.href);
//   const verifier = localStorage.getItem("pkce_code_verifier");
//   const state = localStorage.getItem("state");

//   if (!verifier) throw new Error("Please use same browser to finish authorization");

//   const params = new URLSearchParams();
//   params.append("grant_type", "authorization_code");
//   params.append("client_id", ENV.VITE_APP_SOUNDCLOUD_CLIENT_ID);
//   params.append("client_secret", ENV.VITE_APP_SOUNDCLOUD_CLIENT_SECRET);
//   params.append("redirect_uri", ENV.VITE_APP_SOUNDCLOUD_REDIRECT_URL);
//   params.append("code_verifier", verifier);
//   params.append("code", url.searchParams.get("code")!);

//   const result = await fetch("https://secure.soundcloud.com/oauth/token", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: params.toString(),
//   });

//   const body: ObtainTokenResponse = await result.json();
//   if (body.token_type !== "Bearer") {
//     throw new Error("Expected Bearer token from Soundcloud but got " + body.token_type);
//   }
//   setCookie(
//     "access_token",
//     body.access_token,
//     // current time + expire time(it's an 1 hour) - 5 min.
//     new Date(new Date().getTime() + body.expires_in * 1000),
//     "/"
//   );

//   setCookie(
//     "refresh_token",
//     body.refresh_token,
//     new Date(new Date().setDate(new Date().getDate() + 7)),
//     "/"
//   );
// };

// const OAuth: React.FC = function OAuth() {
//   useEffect(() => {
//     finishRequest();
//     redirect("/");
//   }, []);

//   return (
//     <div>
//       <h1>Loading...</h1>
//     </div>
//   );
// };

// export default OAuth;
