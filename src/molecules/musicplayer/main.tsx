import { Slider } from "@/components/ui/slider";
import AudioPlayer from "./components/AudioPlayer";
import { useRef, useState, useEffect, useContext } from "react";
import { PlaylistContext } from "@/contexts/Playlist";
import { SongContext } from "@/contexts/Song";
import { Song } from "@/utils/types/song";
import { imageBase } from "@/utils/constants/main";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const [playlist, setPlaylist] = useState<Song[] | null>(null);
  const { songs } = useContext(PlaylistContext) ?? {};
  const { song, setSong } = useContext(SongContext) || {};
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (songs !== undefined) {
      setPlaylist(songs);
    }
  }, [songs]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleLoadedMetadata = () => setDuration(audio.duration);
      const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("timeupdate", handleTimeUpdate);
      return () => {
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, []);


  useEffect(() => {
    if (song !== null && audioRef?.current?.src !== song?.url) {
      const audio = audioRef.current;
      if (audio && song && !isPlaying) {
        audio.src = song.url;
        audio.pause();
        audio.load();
        audio.currentTime = 0;
        setIsPlaying(true);
        //audio.play().catch((err) => console.error("Audio playback failed:", err));
      }
    }
  }, [song,isPlaying,setIsPlaying]);

  const handleSliderChange = (value: number[]) => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = value[0];
      setTimeout(() => {
        audio
          .play()
          .catch((err) => console.error("Audio playback failed:", err));
      }, 1000);
    }
  };

  const handleNext = () => {
    const currentIndex = playlist?.findIndex((temp) => temp.id === song?.id);
    if (
      currentIndex !== undefined &&
      currentIndex !== -1 &&
      currentIndex + 1 < (playlist?.length ?? 0)
    ) {
      const nextSong = playlist && playlist[currentIndex + 1];
      if (setSong) setSong(nextSong);
    } else {
      toast("No more songs in the playlist", {
        description:
          "You have reached the end of the playlist. You can't go further.",
        action: {
          label: "Okay",
          onClick: () => console.log("Okay"),
        },
      });
    }
  };

  const handlePrev = () => {
    const currentIndex = playlist?.findIndex((temp) => temp.id === song?.id);
    if (
      currentIndex !== undefined &&
      currentIndex !== -1 &&
      currentIndex - 1 >= 0
    ) {
      const prevSong = playlist?.[currentIndex - 1] || null;
      if (setSong) setSong(prevSong);
    } else {
      toast("No more songs in the playlist", {
        description:
          "You have reached the beginning of the playlist. You can't go further.",
        action: {
          label: "Okay",
          onClick: () => console.log("Okay"),
        },
      });
    }
  };

  return (
    <ScrollArea className="h-[88vh] w-full">
    <div className="w-full lg:h-[100vh] lg:pt-8 lg:pl-8 flex justify-center items-center bg-transparent">
      <div className="lg:h-[78%] w-[88%] lg:w-[64%] flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <p className="font-bold text-[28px] lg:text-[32px] text-white">
            {song?.name}
          </p>
          <p className="font-normal text-[14px] lg:text-[16px] text-white opacity-[0.6]">
            {song?.artist}
          </p>
        </div>
        <div className="banner w-full flex flex-col gap-6">
          <img
            src={imageBase + song?.cover}
            alt={`${song?.name} banner`}
            className="w-full h-[40vh] lg:h-[40vh] object-cover rounded-md"
          />
          <Slider
            defaultValue={[0]}
            value={[currentTime]}
            max={duration}
            step={1}
            className="w-full"
            onValueChange={handleSliderChange}
          />
        </div>
        <div className="controls h-[100px] mb-5">
          <audio ref={audioRef}>
            <source src={song?.url} type="audio/mpeg" />
          </audio>
          <AudioPlayer
            isPlaying={!audioRef.current?.paused}
            onPause={() => {
              if (audioRef.current) {
                if (!audioRef.current.paused) {
                  audioRef.current.pause();
                  setIsPlaying(false);
                } else {
                  audioRef.current.play();
                  setIsPlaying(true);
                }
              }
            }}
            onClickNext={handleNext}
            onClickPrev={handlePrev}
          />
        </div>
      </div>
    </div>
    </ScrollArea>
  );
};

export default MusicPlayer;
