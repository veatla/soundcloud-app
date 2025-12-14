import { type PlaylistsArrayResponse } from "../../types/api";
import { VirtualList } from "../VirtualList/VirtualList";
import PlaylistListItem from "./PlaylistItem";

const PlaylistList: React.FC<{ playlist: PlaylistsArrayResponse }> = async function PlaylistList({
  playlist,
}) {
  return (
    <VirtualList
      items={playlist ?? []}
      totalCount={playlist?.length ?? 0}
      itemHeight={72}
      ItemComponent={PlaylistListItem}
    />
  );
};

export default PlaylistList;
