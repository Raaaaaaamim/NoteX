"use client";

import { formatDateTime } from "@/lib/utils.js";
import { PiTrashSimpleFill } from "react-icons/pi";
import { Badge } from "./ui/badge.jsx";

import { groupNotes } from "@/app/(states)/groupNotes.js";
import { notesState } from "@/app/(states)/notesState.js";
import { useToast } from "@/hooks/use-toast.js";
import axios from "axios";
import Link from "next/link.js";
import { useRecoilState } from "recoil";
import { Button } from "./ui/button.jsx";
import { Card } from "./ui/card.jsx";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog.jsx";
const NoteCard = ({ note, id, date, category, title }) => {
  console.log(id);

  const formattedDate = formatDateTime(date);
  const [notes, setNotes] = useRecoilState(notesState);
  const [groupNotesData, setGroupNotesData] = useRecoilState(groupNotes);

  const { toast } = useToast();

  const deleteNote = async () => {
    try {
      const { data } = await axios.delete(
        ` http://localhost:5000/api/notes/${id}`,
        {
          withCredentials: true,
        }
      );
      if (notes) {
        setNotes(notes.filter((note) => note._id !== data.id));
      }

      if (groupNotesData) {
        setGroupNotesData(
          groupNotesData.filter((note) => note._id !== data.id)
        );
      }
      console.log(data.id);

      toast({
        title: "Note Deleted",
        description: data.message,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Card className="  flex flex-col justify-center items-center lg:w-[330px] w-[340px] h-56 ">
      <div className=" w-[90%] cursor-pointer h-[20%] flex justify-between items-center ">
        <Link
          href={`/notes/${id}`}
          className=" cursor-pointer font-bold font-roboto_mono text-base "
        >
          {title.length > 18 ? title.slice(0, 18) + "..." : title}
        </Link>

        <Badge className={" justify-center items-center flex "}>
          <span>{category}</span>
        </Badge>
      </div>

      <h2 className=" h-[60%] font-roboto_mono overflow-hidden text-sm w-[90%] ">
        {note}
      </h2>

      <div className=" h-[20%] w-[90%] flex justify-between items-center ">
        <span className=" font-roboto_mono font-[500] text-xs  ">
          {formattedDate.date}
        </span>
        <Dialog>
          <DialogTrigger>
            <Button className="  p-1 rounded-full w-fit h-fit cursor-pointer  ">
              <PiTrashSimpleFill size={16} />
            </Button>
          </DialogTrigger>
          <DialogContent className=" overflow-hidden w-[400px] lg:w-full rounded-md ">
            <div className=" flex flex-col justify-center items-center">
              <h1 className=" text-center  font-roboto_mono font-[600]">
                Are you sure you want to delete this note?
              </h1>
            </div>
            <Button
              onClick={() => {
                deleteNote();
              }}
              className="cursor-pointer  "
            >
              Yes
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
};

export default NoteCard;
