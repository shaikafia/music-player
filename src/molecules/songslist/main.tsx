import { Tabs, TabsList } from "@/components/ui/tabs";
import CustomTabTrigger from "./components/Tabtrigger";
import CustomSearch from "./components/Search";
import CustomTabContent from "./components/TabContent";
import { Song } from "@/utils/types/song";
import useFetch from "./hooks/useFetch";
import { toast } from "sonner";
import { useContext, useEffect, useState } from "react";
import { PlaylistContext } from "@/contexts/Playlist";
import { ScrollArea } from "@/components/ui/scroll-area";

const SongsList = () => {
  const { data, loading, error } = useFetch(
    "https://cms.samespace.com/items/songs"
  );
  const [search, setSearch] = useState<string>("");
  const top_tracks = data?.filter((song: Song) => song.top_track === true);
  const { setPlaylist } = useContext(PlaylistContext) ?? {};
  useEffect(() => {
    if (error) {
      toast("Please try again later", {
        description:
          "Something went wrong while fetching data. Please try again later.",
        action: {
          label: "Okay",
          onClick: () => console.log("Okay"),
        },
      });
    }
  }, [error]);

  useEffect(() => {
    if (setPlaylist !== undefined) {
      setPlaylist(data);
    }
  }, [data, setPlaylist]);
  return (
    <div className="w-[90%] lg:w-full max-h-[100vh] pb-10 lg:pt-10 lg:pl-10 lg:pr-10 bg-transparent">
      <div className="w-full h-full flex flex-col justify-between">
        <Tabs
          defaultValue="for_you"
          className="w-full lg:min-w-[400px] flex-grow items-start flex flex-col"
          onValueChange={(e) => {
            if (setPlaylist === undefined) return;
            if (e === "for_you") {
              setPlaylist(data);
            } else {
              setPlaylist(top_tracks);
            }
          }}
        >
          <TabsList className="bg-transparent h-8 gap-10">
            <CustomTabTrigger value="for_you" title="For You" />
            <CustomTabTrigger value="top_tracks" title="Top Tracks" />
          </TabsList>
          <CustomSearch search={search} setSearch={setSearch} />
          <ScrollArea className="container-height w-full">
          <div className="w-full flex-grow mt-4 mx-auto">
            <CustomTabContent
              loading={loading}
              data={data}
              attr="for_you"
              search={search}
            />
            <CustomTabContent
              loading={loading}
              data={top_tracks}
              attr="top_tracks"
              search={search}
            />
          </div>
          </ScrollArea>
        </Tabs>
      </div>
    </div>
  );
};

export default SongsList;
