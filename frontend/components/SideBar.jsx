"use client";
import { cn } from "@/lib/utils.js";
import axios from "axios";
import { useEffect, useState } from "react";
import SideBtn from "./sidebar-button.jsx";

const SideBar = ({ className }) => {
  const [groups, setGroups] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await axios.get(
        "http://localhost:5000/api/notes/groups/all",
        {
          withCredentials: true,
        }
      );

      setGroups(data);

      setLoading(false);
      console.log(data);
    };

    fetchData();
  }, []);
  console.log(loading, groups);

  return (
    <div
      className={cn(
        " hidden w-[20%] fixed left-0 top-[10%] border-r-[1px] border-border lg:flex  items-center flex-col gap-0 h-[90vh]",
        className
      )}
    >
      {loading ? (
        <p>Loading...</p>
      ) : (
        groups?.map((group) => (
          <SideBtn
            key={group.name}
            text={group.name}
            itemsCount={group.itemsCount}
          />
        ))
      )}
    </div>
  );
};

export default SideBar;
