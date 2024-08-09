import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SongContext } from "@/contexts/Song";
import { imageBase } from "@/utils/constants/main";
import { useContext, useEffect, useState } from "react";

const TrackCard = (
    {
        name,
        id,
        artist,
        duration="2:20",
        cover,
        onClick,
    }:{
        name: string;
        id: number;
        artist: string;
        duration: string;
        cover: string;
        onClick: () => void;
    }
) => {
  const [isActive, setIsActive] = useState(false);
  const banner = imageBase+cover;
  const fallBack = name.split(" ").map((n) => n[0]).join("");
  const { song } = useContext(SongContext) || {};
  useEffect(() => {
    setIsActive(song?.id === id);
  }, [song, id]);
  return (
    <div onClick={onClick} className={`w-full h-20 cursor-pointer flex flex-row items-center justify-between py-4 pl-2 pr-2 rounded-[8px] ${isActive && 'bg-white bg-opacity-[0.08]'}`} key={cover}>
      <div className="min-w-[80%] flex flex-row gap-4">
        <Avatar className="bg-white w-12 h-12">
          <AvatarImage src={banner} />
          <AvatarFallback>{fallBack}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-white font-normal text-lg">{name}</p>
          <p className="text-white opacity-60 text-sm font-normal">
            {artist}
          </p>
        </div>
      </div>
      <div>
        <p className="text-white opacity-60 text-lg font-normal">{duration}</p>
      </div>
    </div>
  );
};

export default TrackCard;