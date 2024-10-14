"use client";

import { formatDateTime } from "@/lib/utils.js";
import { PiTrashSimpleFill } from "react-icons/pi";
import { Badge } from "./ui/badge.jsx";

import { groupNotes } from "@/app/(states)/groupNotes.js";
import { notesState } from "@/app/(states)/notesState.js";
import Link from "next/link.js";
import { useRecoilState } from "recoil";
import DeleteConfirmation from "./DeleteConfirmation.jsx";
import { Button } from "./ui/button.jsx";
import { Card } from "./ui/card.jsx";
const NoteCard = ({ note, id, date, category, title }) => {
  console.log(id);

  const formattedDate = formatDateTime(date);
  const [notes, setNotes] = useRecoilState(notesState);
  const [groupNotesData, setGroupNotesData] = useRecoilState(groupNotes);

  return (
    <Card className="  flex flex-col justify-center items-center lg:w-[330px] w-[340px] h-56 ">
      <div className=" w-[90%] cursor-pointer h-[20%] flex justify-between items-center ">
        <Link
          href={`/notes/${id}`}
          className=" cursor-pointer font-bold font-roboto_mono text-base "
        >
          {title.length > 18 ? title.slice(0, 18) + ".." : title}
        </Link>

        <Badge className={" justify-center items-center flex "}>
          <span>
            {category.length > 7 ? category.slice(0, 7) + ".." : category}
          </span>
        </Badge>
      </div>

      <h2 className=" h-[60%] font-roboto_mono overflow-hidden text-sm w-[90%] ">
        {note}
      </h2>

      <div className=" h-[20%] w-[90%] flex justify-between items-center ">
        <span className=" font-roboto_mono font-[500] text-xs  ">
          {formattedDate.date}
        </span>
        <DeleteConfirmation id={id}>
          <Button className="  p-1 rounded-full w-fit h-fit cursor-pointer  ">
            <PiTrashSimpleFill size={16} />
          </Button>
        </DeleteConfirmation>
      </div>
    </Card>
  );
};

export default NoteCard;
