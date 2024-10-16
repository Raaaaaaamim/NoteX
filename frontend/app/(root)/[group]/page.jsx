"use client";

import { groupNotes } from "@/app/(states)/groupNotes.js";
import NoteCard from "@/components/NoteCard.jsx";
import { NotesSkeleton } from "@/components/NotesSkeleton.jsx";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const page = ({ params: { group } }) => {
  const [notes, setNotes] = useRecoilState(groupNotes);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/notes/groups/${group}`,
          {},
          {
            withCredentials: true,
          }
        );
        setLoading(false);

        setNotes(data);
      } catch (err) {
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
            {notes &&
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
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default page;
