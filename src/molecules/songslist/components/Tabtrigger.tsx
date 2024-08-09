import { TabsTrigger } from "@/components/ui/tabs";

const CustomTabTrigger = ({
  value,
  title,
}: {
  value: string;
  title: string;
}) => {
  return (
    <TabsTrigger
      value={value}
      className="text-2xl bg-transparent font-bold data-[state=active]:text-white data-[state=active]:bg-transparent data-[state=inactive]:opacity-50 data-[state-inactive]:text-white"
    >
      {title}
    </TabsTrigger>
  );
};

export default CustomTabTrigger;
