import { useEffect, useRef, useState } from "react";
import { API, type PlaylistsArrayResponse } from "../../types/api";
import { VirtualList } from "../VirtualList/VirtualList";
import PlaylistListItem from "./PlaylistItem";

const PlaylistList: React.FC = function PlaylistList() {
  const [data, setData] = useState<PlaylistsArrayResponse>([]);

  const isFetching = useRef(false);

  useEffect(() => {
    const loader = async () => {
      if (isFetching.current) return;
      const data: PlaylistsArrayResponse = await API.GET("/me/playlists", {}).then(
        (res) => res.data! as PlaylistsArrayResponse
      );
      isFetching.current = true;
      setData(data);
    };
    loader();
  }, []);

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
