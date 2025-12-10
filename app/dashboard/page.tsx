import { Suspense } from "react";
// import PlaylistList from "../../src/widgets/Playlist/PlaylistList";

const Dashboard: React.FC = function Dashboard() {
  return (
    <div className="h-full flex">
      <div>
        <Suspense>
          <div className="bg-surface-color scrollable flex flex-col h-full">
            <div className="mx-2 relative h-full">{/* <PlaylistList /> */}</div>
          </div>
        </Suspense>
      </div>
      {/* <div className="flex-1">{profile.username}</div> */}
    </div>
  );
};

export default Dashboard;
