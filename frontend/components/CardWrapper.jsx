"use client";
import { notesState } from "@/app/(states)/notesState.js";
import { useToast } from "@/hooks/use-toast.js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Loader from "./Loader.jsx";
import NoteCard from "./NoteCard.jsx";

const CardWrapper = () => {
  const [notes, setNotes] = useRecoilState(notesState);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "http://localhost:5000/api/notes/all",
          {
            withCredentials: true,
          }
        );
        setLoading(false);
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

  return (
    <div className=" lg:w-[80%] overflow-x-hidden w-[100%] flex justify-center items-start -z-10 min-h-[90vh] top-[10vh] absolute right-0 ">
      <div className=" flex mt-8 mb-8 flex-wrap gap-4 items-center justify-center lg:justify-start  w-[95%]  ">
        {loading ? (
          <div className=" w-[100%] h-[100vh] flex justify-center items-center ">
            <Loader />
          </div>
        ) : (
          <>
            {!notes ? (
              <div>No Notes</div>
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
