import { cookies } from "next/headers";
import { API } from "../../src/types/api";

export default async function Authorization() {
  const cookieStore = await cookies();
  const refresh = cookieStore.get("refresh_token");

  let profile = null;

  if (refresh) {
    try {
      const res = await API.GET("/me");
      profile = res.data ?? null;
    } catch {
      profile = null;
    }
  }

  return (
    <div>
      {profile ? (
        <div>Logged in as: {profile.username}</div>
      ) : (
        <a href="/api/auth/soundcloud">Authorize With SoundCloud</a>
      )}
    </div>
  );
}
