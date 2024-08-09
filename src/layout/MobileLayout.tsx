import { SongContext } from "@/contexts/Song";
import MusicPlayer from "@/molecules/musicplayer/main";
import SideNav from "@/molecules/sidenav/main";
import SongsList from "@/molecules/songslist/main";
import { Song } from "@/utils/types/song";
import { useContext, useEffect, useState } from "react";
import { Avatar, AvatarFallback, toColorCode } from "@/utils/constants/main";

const MobileLayout = () => {
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
            className={`w-full min-h-full flex flex-col gap-1 bg-gradient-to-br transition-colors duration-500`}
          >
            <div className="flex justify-center items-center">
              <SideNav avatar={Avatar} avatarFallback={AvatarFallback} />
            </div>
            <div>
              {song && (
                <MusicPlayer />
              )}
            </div>
            <div className="flex justify-center items-center">
              <SongsList />
            </div>
          </div>
        )
}

export default MobileLayout;