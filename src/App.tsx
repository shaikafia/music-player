import { useState } from "react";
import MobileLayout from "./layout/MobileLayout";
import WebLayout from "./layout/WebLayout";
import { Toaster } from "@/components/ui/sonner";
import { Song } from "./utils/types/song";
import { SongContext } from "./contexts/Song";
import { PlaylistContext } from "./contexts/Playlist";

function App() {
  const [song, setSong] = useState<Song | null>(null);
  const [playlist, setPlaylist] = useState<Song[] | null>(null);

  return (
    <PlaylistContext.Provider value={{ songs: playlist, setPlaylist }}>
      <SongContext.Provider value={{ song, setSong }}>
        <Toaster />
        <div className="w-0 h-0 hidden lg:w-full lg:h-[100vh] lg:flex">
          <WebLayout />
        </div>
        <div className="w-[100vw] bg-red-500 min-h-[100vh] flex lg:w-0 lg:h-0 lg:hidden">
          <MobileLayout />
        </div>
      </SongContext.Provider>
    </PlaylistContext.Provider>
  );
}

export default App;
