"use client";
import { Anton, Roboto, Roboto_Mono } from "next/font/google";

import { formatDateTime } from "@/lib/utils.js";
import { PiTrashSimpleFill } from "react-icons/pi";
import { Badge } from "./ui/badge.jsx";

import Link from "next/link.js";
import { Button } from "./ui/button.jsx";
import { Card } from "./ui/card.jsx";
const anton = Anton({ subsets: ["latin"], weight: ["400"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });

const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: ["400", "600"] });
const NoteCard = ({ note, id, date, category, title }) => {
  const formattedDate = formatDateTime(date);
  return (
    <Link href={`/notes/${id}`}>
      <Card className="  flex flex-col justify-center items-center lg:w-[330px] w-[340px] h-56 ">
        <div className=" w-[90%] cursor-pointer h-[20%] flex justify-between items-center ">
          <span className="  font-roboto_mono text-base ">
            {title.length > 18 ? title.slice(0, 18) + "..." : title}
          </span>

          <Badge className={" justify-center items-center flex "}>
            <span>{category}</span>
          </Badge>
        </div>
        <h2 className=" h-[60%] overflow-hidden text-sm w-[90%] ">{note}</h2>
        <div className=" h-[20%] w-[90%] flex justify-between items-center ">
          <span className=" font-roboto_mono font-[500] text-xs  ">
            {formattedDate.date}
          </span>
          <Button className="  p-1 rounded-full w-fit h-fit cursor-pointer  ">
            <PiTrashSimpleFill size={16} />
          </Button>
        </div>
      </Card>
    </Link>
  );
};

export default NoteCard;
