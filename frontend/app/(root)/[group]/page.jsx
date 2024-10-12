"use client";

import { groupNotes } from "@/app/(states)/groupNotes.js";
import Loader from "@/components/Loader.jsx";
import NoteCard from "@/components/NoteCard.jsx";
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
          `http://localhost:5000/api/notes/groups/${group}`,
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
  console.log(notes, loading);

  return (
    <div className=" lg:w-[80%] overflow-x-hidden w-[100%] flex justify-center items-start -z-10 min-h-[90vh] top-[10vh] absolute right-0 ">
      <div className=" flex mt-8 mb-8 flex-wrap gap-4 items-center justify-center lg:justify-start  w-[95%]  ">
        {loading ? (
          <Loader />
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
