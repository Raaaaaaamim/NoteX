"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MdOutlineFileDownloadDone } from "react-icons/md";

import { groupState } from "@/app/(states)/groupState.js";
import { useToast } from "@/hooks/use-toast.js";
import axios from "axios";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useRecoilState } from "recoil";
import { Button } from "./ui/button.jsx";
import { Input } from "./ui/input.jsx";
const AddCategory = () => {
  const [addCategory, setAddCategory] = useState(true);
  const [group, setGroup] = useRecoilState(groupState);
  const [loading, setLoading] = useState(false);
  const [groupName, setGroupName] = useState(null);

  const [groups, setGroups] = useState(null);
  const { toast } = useToast();
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "http://localhost:5000/api/notes/groups/all",
          {
            withCredentials: true,
          }
        );
        console.log(data);
        setLoading(false);
        setGroups(data);
      } catch (err) {
        setLoading(false);
        toast({
          title: "Error while fetching groups",
          description: err.message,
        });
        console.log(err.message);
      }
    };

    fetchGroups();
  }, []);
  console.log(groups);

  return (
    <div className=" flex ml-4 justify-start w-full items-center  ">
      {addCategory ? (
        <>
          <Select
            onValueChange={(value) => setGroup(value)}
            className=" "
            defaultValue={group}
          >
            <SelectTrigger className="w-[75%] lg:w-[85%] ">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Groups</SelectLabel>
                {loading ? (
                  <Loader />
                ) : (
                  groups &&
                  groups.map(
                    ({ name }, i) =>
                      name ? ( // Ensure name is not empty
                        <SelectItem key={i} value={name}>
                          {name}
                        </SelectItem>
                      ) : null // Skip rendering if name is empty
                  )
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            onClick={() => setAddCategory(!addCategory)}
            size="icon"
            className=" ml-4 "
          >
            <FaPlus />
          </Button>
        </>
      ) : (
        <>
          <Input
            type="text"
            placeholder="Enter Group Name"
            className="w-[75%] lg:w-[85%] "
            onChange={(e) => setGroupName(e.target.value)}
          />
          <Button
            onClick={() => {
              if (groups) {
                groups.forEach((group) => {
                  if (group.name === groupName) {
                    toast({
                      title: "Group already exists",
                      description: "Please select a different group name",
                    });
                    return;
                  }
                });
                setGroups([...groups, { name: groupName }]);
                setAddCategory(!addCategory);
              }
            }}
            size="icon"
            className=" ml-4"
          >
            <MdOutlineFileDownloadDone size={20} />
          </Button>
        </>
      )}
    </div>
  );
};

export default AddCategory;
