"use client";
import { notesState } from "@/app/(states)/notesState.js";
import { useToast } from "@/hooks/use-toast.js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import NoteCard from "./NoteCard.jsx";
import { NotesSkeleton } from "./NotesSkeleton.jsx";

const CardWrapper = () => {
  const [notes, setNotes] = useRecoilState(notesState);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/notes/all`,
          {
            withCredentials: true,
          }
        );
        setLoading(false);
        console.log(data);
        console.log(data);

        setNotes(data);
      } catch (err) {
        setLoading(false);
        toast({
          title: "Error while fetching notes",
          description: err.message,
        });
        console.log(err.message);
      }
    };
    fetchNotes();
  }, []);
  const skeletonsArr = Array(9).fill(0);
  return (
    <div className=" lg:w-[80%] overflow-x-hidden w-[100%] flex justify-center items-start -z-10 min-h-[90vh] top-[10vh] absolute right-0 ">
      <div className=" flex mt-8 mb-8 flex-wrap gap-4 items-center justify-center lg:justify-start  w-[95%]  ">
        {loading ? (
          <>
            {skeletonsArr.map((_, index) => (
              <NotesSkeleton key={index} />
            ))}
          </>
        ) : (
          <>
            {!notes || notes?.length === 0 ? (
              <div
                className=" font-roboto_mono text-2xl
               font-[500]  "
              >
                No Notes
              </div>
            ) : (
              notes.map((note) => (
                <>
                  <NoteCard
                    key={note._id}
                    id={note._id}
                    date={note.createdAt}
                    title={note.title}
                    category={note.group}
                    note={note.content}
                  />
                </>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CardWrapper;
