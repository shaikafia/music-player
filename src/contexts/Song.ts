import { Song } from "@/utils/types/song";
import { createContext } from "react";

interface SongContextType {
    song: Song | null;
    setSong: React.Dispatch<React.SetStateAction<Song | null>>;
  }

export const SongContext = createContext<SongContextType | undefined>(undefined)