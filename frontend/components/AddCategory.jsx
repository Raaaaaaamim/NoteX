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

import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Button } from "./ui/button.jsx";
import { Input } from "./ui/input.jsx";
const AddCategory = () => {
  const [addCategory, setAddCategory] = useState(true);
  return (
    <div className=" flex ml-4 justify-start w-full items-center  ">
      {addCategory ? (
        <>
          <Select className=" ">
            <SelectTrigger className="w-[75%] lg:w-[85%] ">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
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
            placeholder="Enter Category"
            className="w-[75%] lg:w-[85%] "
          />
          <Button
            onClick={() => setAddCategory(!addCategory)}
            size="icon"
            className=" ml-4  "
          >
            <MdOutlineFileDownloadDone size={20} />
          </Button>
        </>
      )}
    </div>
  );
};

export default AddCategory;
