import { Skeleton } from "@/components/ui/skeleton";

const TrackCardSkelton = () => {
  return (
    <div
      className="w-full h-20 flex flex-row items-center justify-between py-4 pl-2 pr-2"
    >
      <div className="min-w-[80%] flex flex-row gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div>
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 mt-2 w-[200px]" />
        </div>
      </div>
      <div>
        <Skeleton className="h-4 w-[50px]" />
      </div>
    </div>
  );
};

export default TrackCardSkelton;
