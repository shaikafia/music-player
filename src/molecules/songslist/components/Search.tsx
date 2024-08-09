import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const CustomSearch = ({
  search,
  setSearch,
}:{
  search: string;
  setSearch: (search: string) => void;
}) => {
  return (
    <div className="relative w-[95%] h-12 mx-auto mt-6 rounded-[8px] shadow-md">
      <Input
        className="pr-9 bg-white bg-opacity-[0.08] h-full border-none outline-none text-white"
        placeholder="Search Song, Artist"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Search className="absolute right-0 top-0 m-4 h-4 w-4 text-muted-foreground" />
    </div>
  );
};

export default CustomSearch;
