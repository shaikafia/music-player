import { Song } from "@/utils/types/song";
import { createContext } from "react";

interface PlaylistContextType {
    songs: Song[] | null;
    setPlaylist: React.Dispatch<React.SetStateAction<Song[] | null>>;
  }

export const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined)