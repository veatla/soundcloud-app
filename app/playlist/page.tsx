import { Suspense } from "react";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

import PlaylistList from "../../src/widgets/Playlist/PlaylistList";
import { API, type PlaylistsArrayResponse } from "../../src/types/api";
export async function getServerSideProps() {
  const data = await API.GET("/me/playlists", {}).then(
    (res) => res.data! as PlaylistsArrayResponse
  );
  return {
    props: { data }, // will be passed to the page component as props
  };
}

const Dashboard: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> =
  function Dashboard({ data }) {
    console.log(data);
    return (
      <div className="h-full flex">
        <div>
          <Suspense>
            <div className="bg-surface-color scrollable flex flex-col h-full">
              <div className="mx-2 relative h-full">
                <PlaylistList playlist={data} />
              </div>
            </div>
          </Suspense>
        </div>
        {/* <div className="flex-1">{profile.username}</div> */}
      </div>
    );
  };

export default Dashboard;
