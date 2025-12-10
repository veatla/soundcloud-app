import { API, type PlaylistsArrayResponse } from "../../types/api";
import { VirtualList } from "../VirtualList/VirtualList";
import PlaylistListItem from "./PlaylistItem";

const PlaylistList: React.FC = async function PlaylistList() {
  const data = await API.GET("/me/playlists", {}).then(
    (res) => res.data! as PlaylistsArrayResponse
  );

  return (
    <VirtualList
      items={data ?? []}
      totalCount={data?.length ?? 0}
      itemHeight={72}
      ItemComponent={PlaylistListItem}
    />
  );
};

export default PlaylistList;
