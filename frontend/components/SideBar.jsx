import { cn } from "@/lib/utils.js";
import SideBtn from "./sidebar-button.jsx";

const SideBar = ({ className }) => {
  return (
    <div
      className={cn(
        " hidden w-[20%] fixed left-0 top-[10%] border-r-[1px] border-border lg:flex  items-center flex-col gap-0 h-[90vh]",
        className
      )}
    >
      <SideBtn text={"Notes"} itemsCount={7} />
      <SideBtn text={" Tasks"} itemsCount={8} />
      <SideBtn text={"Anime's"} itemsCount={93} />
    </div>
  );
};

export default SideBar;
