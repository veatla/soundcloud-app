"use client";

import { Suspense, useEffect, useState } from "react";
import PlaylistList from "../../src/widgets/Playlist/PlaylistList";

const Dashboard = function Dashboard() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ method: "GET", path: "me/playlists" }),
      });
      const data = await res.json();
      setPlaylists(data);
    };

    fetchData();
  }, []); // <- пустой массив, чтобы вызвать только один раз

  return (
    <div className="h-full flex">
      <div>
        <Suspense>
          <div className="bg-surface-color scrollable flex flex-col h-full">
            <div className="mx-2 relative h-full">
              <PlaylistList playlist={playlists} />
            </div>
          </div>
        </Suspense>
      </div>
      {/* <div className="flex-1">{profile.username}</div> */}
    </div>
  );
};

export default Dashboard;
