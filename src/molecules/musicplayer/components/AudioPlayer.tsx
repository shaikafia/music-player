import {
  Ellipsis,
  FastForward,
  Pause,
  Play,
  Rewind,
  Volume2,
} from "lucide-react";

const AudioPlayer = ({
  isPlaying,
  onClickNext,
  onClickPrev,
  onPause
}: {
    isPlaying: boolean;
    onClickNext: () => void;
    onClickPrev: () => void;
    onPause: () => void;
}) => {
  return (
    <div className="w-full h-[60px] flex flex-row justify-between">
      <div onClick={()=>{
        window.scrollTo(0,document.body.scrollHeight);
      }} className="w-12 h-12 rounded-full cursor-pointer bg-white bg-opacity-10 flex justify-center items-center mt-auto">
        <Ellipsis className="text-white" />
      </div>
      <div className="w-[35%] h-12 flex flex-row justify-between mt-auto">
        <div onClick={onClickPrev} className="h-4 cursor-pointer my-auto">
          <Rewind
            fill="white"
            fillOpacity={0.6}
            className="text-white opacity-60"
          />
        </div>
        <div
          onClick={onPause}
          className="w-12 h-12 cursor-pointer rounded-full bg-white flex justify-center items-center mt-auto"
        >
          {isPlaying === false && (
            <Play fill="black" className="text-black" />
          )}
          {isPlaying === true && (
            <Pause fill="black" className="text-black" />
          )}
        </div>
        <div onClick={onClickNext} className="h-4 cursor-pointer my-auto">
          <FastForward
            fill="white"
            fillOpacity={0.6}
            className="text-white opacity-60"
          />
        </div>
      </div>
      <div className="w-12 h-12 rounded-full cursor-pointer bg-white bg-opacity-10 flex justify-center items-center mt-auto">
        <Volume2 className="text-white" />
      </div>
    </div>
  );
};

export default AudioPlayer;
