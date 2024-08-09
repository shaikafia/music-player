import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "./components/logo";

const SideNav = ({
  avatar = "https://i.imgur.com/A9i5bWj.jpeg",
  avatarFallback = "HK",
}: {
  avatar: string;
  avatarFallback: string;
}) => {
  return (
    <div className="w-full h-full p-8 bg-transparent">
      <div className="w-full h-full flex flex-row lg:flex-col justify-between">
        <Logo />
        <Avatar className="bg-white">
          <AvatarImage src={avatar} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default SideNav;
