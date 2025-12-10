import { useCallback, useEffect, useState, type ComponentType } from "react";
import type { PlaylistResponse, TrackResponse } from "../../types/api";
import "./list-items.css";

export interface VirtualListProps<T extends PlaylistResponse | TrackResponse> {
  items: T[];
  totalCount: number;
  itemHeight?: number;
  ItemComponent: ComponentType<T & { index: number }>;
}

export function VirtualList<T extends PlaylistResponse | TrackResponse>({
  items,
  totalCount,
  itemHeight = 72,
  ItemComponent,
}: VirtualListProps<T>) {
  const [limit, setLimit] = useState(10);
  const [visibleOffset, setVisibleOffset] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const update = () => {
        setLimit(Math.round(window.innerHeight / itemHeight) + 6);
      };
      update();
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }
  }, [itemHeight]);

  const handleScroll: React.UIEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      const y = e.currentTarget.scrollTop;
      setVisibleOffset(Math.max(Math.round(y / itemHeight) - 2, 0));
    },
    [itemHeight]
  );

  return (
    <div className="overlay-scroll bg-surface-color flex flex-col h-full" onScroll={handleScroll}>
      <div
        className="mx-2 relative overflow-y-visible block shrink-0"
        style={{ minHeight: `${totalCount * itemHeight}px` }}
      >
        {items.slice(visibleOffset, visibleOffset + limit).map((item, index) => (
          <ItemComponent
            key={item["permalink_url"] ?? index}
            {...item}
            index={index + visibleOffset}
          />
        ))}
      </div>
    </div>
  );
}
