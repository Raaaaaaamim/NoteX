"use client";
import { reloadState } from "@/app/(states)/reloadState.js";
import { useToast } from "@/hooks/use-toast.js";
import { cn } from "@/lib/utils.js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import SideBtn from "./sidebar-button.jsx";
import SidebarSkeleton from "./SidebarSkeleton.jsx";

const SideBar = ({ className }) => {
  const [groups, setGroups] = useState(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const reload = useRecoilValue(reloadState);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "http://localhost:5000/api/notes/groups/all",
          {
            withCredentials: true,
          }
        );

        setGroups(data);

        setLoading(false);
      } catch (err) {
        setLoading(false);
        toast({
          title: "Error while fetching groups",
          description: err?.response?.data?.message || err.message,
        });
        console.log(err);
      }
    };

    fetchData();
  }, [reload]);
  const skeletonCount = Array(29).fill(0);
  return (
    <div
      className={cn(
        " hidden w-[20%] fixed  left-0 top-[10%] border-r-[1px] border-border   lg:flex  items-center flex-col gap-0 h-[90vh]",
        className
      )}
    >
      <div className="  w-full relative overflow-auto scrollbar-hidden h-full  lg:flex  items-center flex-col gap-0 ">
        {loading
          ? skeletonCount.map(() => <SidebarSkeleton />)
          : groups?.map((group) => (
              <SideBtn
                key={group.name}
                text={group.name}
                itemsCount={group.itemsCount}
              />
            ))}
      </div>
    </div>
  );
};

export default SideBar;
