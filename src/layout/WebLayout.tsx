import { SongContext } from "@/contexts/Song";
import MusicPlayer from "@/molecules/musicplayer/main";
import SideNav from "@/molecules/sidenav/main";
import SongsList from "@/molecules/songslist/main";
import { Avatar, AvatarFallback, toColorCode } from "@/utils/constants/main";
import { Song } from "@/utils/types/song";
import { useContext, useEffect, useState } from "react";

const WebLayout = () => {
  const [fromColorCode, setFromColorCode] = useState("#000000");
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const { song } = useContext(SongContext) || {};
  useEffect(() => {
    setCurrentSong(song || null);
    setFromColorCode(song?.accent || "#01293d");
  }, [currentSong, song]);
  return (
    <div
        style={{
            background: `linear-gradient(135deg, ${fromColorCode}, ${toColorCode})`,
            transition: 'background 4s ease-in-out',
        }} 
      className={`w-full h-full grid grid-cols-12 bg-gradient-to-br transition-colors duration-500`}
    >
      <div className="col-span-2 flex justify-center items-center">
        <SideNav avatar={Avatar} avatarFallback={AvatarFallback} />
      </div>
      <div className="col-span-4 flex justify-center items-center">
        <SongsList />
      </div>
      <div className="col-span-6 flex justify-center items-center">
        {song && (
          <MusicPlayer />
        )}
      </div>
    </div>
  );
};

export default WebLayout;
