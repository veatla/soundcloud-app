import { Suspense } from "react";
import TracksList from "../../../src/widgets/TraksList/TrackList";
import { API } from "../../../src/types/api";
import { redirect } from "next/navigation";
type Playlist = {
  params: Promise<{ slug: string }>;
};
const Dashboard: React.FC<Playlist> = async function Dashboard(props) {
  const params = await props.params;

  const { data } = await API.GET("/playlists/{playlist_urn}", {
    params: { path: { playlist_urn: decodeURIComponent(params.slug) } },
  });
  if (!data) throw redirect("/dashboard");

  console.log(data, decodeURIComponent(params.slug));
  return (
    <div className="h-full flex">
      <div>
        <Suspense>
          <div className="bg-surface-color scrollable flex flex-col h-full">
            <div className="mx-2 relative h-full">
              <TracksList {...data} index={0} />
            </div>
          </div>
        </Suspense>
      </div>
      {/* <div className="flex-1">{profile.username}</div> */}
    </div>
  );
};

export default Dashboard;
