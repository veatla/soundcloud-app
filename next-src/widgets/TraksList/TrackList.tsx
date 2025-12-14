import { type PlaylistResponse } from "../../types/api";
import { VirtualList } from "../VirtualList/VirtualList";
import TrackListItem from "./TrackListItem";

const TracksList: React.FC<PlaylistResponse & { index: number }> = (props) => {
  return (
    <div key={props.permalink_url} className="relative w-full h-full max-w-[420px]">
      <VirtualList
        items={props.tracks ?? []}
        totalCount={props.track_count ?? 1}
        itemHeight={72}
        ItemComponent={TrackListItem}
      />
    </div>
  );
};

export default TracksList;
