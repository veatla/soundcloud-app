import { useEffect, useRef } from "react";
import { useAppStore } from "../store";
import { getCookie } from "../utils/cookie";
import { API } from "../types/api";

const Authorization: React.FC = function Authorization() {
  const isFetched = useRef(false);
  const setProfile = useAppStore((store) => store.setProfile);

  useEffect(() => {
    if (isFetched.current) return;
    const refreshToken = getCookie("refresh_token");
    if (refreshToken) {
      API.GET("/me")
        .then((res) => {
          if (res.data) setProfile(res.data);
        })
        .finally(() => (isFetched.current = true));
    } else isFetched.current = true;
  }, [setProfile]);

  return (
    <div>
      <a href={"/api/auth/soundcloud"}>Authorize With SoundCloud</a>
    </div>
  );
};

export default Authorization;
