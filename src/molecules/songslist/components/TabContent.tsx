import { TabsContent } from "@/components/ui/tabs";
import TrackCard from "./TrackCard";
import { Song } from "@/utils/types/song";
import TrackCardSkelton from "./TrackCardSkelton";
import { useContext } from "react";
import { SongContext } from "@/contexts/Song";

const CustomTabContent = ({
  data,
  attr,
  loading,
  search,
}: {
  data: Song[];
  attr: string;
  loading: boolean;
  search: string;
}) => {
  const { setSong } = useContext(SongContext) ?? {};
  const filteredData =
    search.trim() === ""
      ? data
      : data.filter((track) => {
          return (
            track.name.toLowerCase().includes(search.toLowerCase()) ||
            track.artist.toLowerCase().includes(search.toLowerCase())
          );
        });
  return (
    <TabsContent value={attr} className="max-h-full">
      {loading == false &&
        filteredData.map((track) => (
          <TrackCard
            key={track.id}
            id={track.id}
            name={track.name}
            artist={track.artist}
            duration={"2:20"}
            cover={track.cover}
            onClick={() => {
              if (setSong !== undefined) {
                window.scrollTo(0, 0);
                setSong(track);
              }
            }}
          />
        ))}
      {loading &&
        Array.from({ length: 10 }).map((_, index) => (
          <TrackCardSkelton key={index} />
        ))}
    </TabsContent>
  );
};

export default CustomTabContent;
