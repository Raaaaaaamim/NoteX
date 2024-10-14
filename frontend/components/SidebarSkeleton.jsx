import { Skeleton } from "./ui/skeleton.jsx";

const SidebarSkeleton = () => {
  return (
    <div className="  flex border-b-[1px] border-border gap-2 justify-between items-center  h-14 flex-shrink-0  cursor-pointer w-full">
      <div className=" flex ml-2 gap-2 justify-center items-center ">
        <Skeleton className="  w-4 h-4 rounded-full " />

        <Skeleton className=" w-40 h-5 rounded-md " />
      </div>
      <Skeleton className=" w-11 mr-2 h-9 rounded-md px-3 " />
    </div>
  );
};

export default SidebarSkeleton;
