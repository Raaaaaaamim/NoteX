"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import NoteCard from "./NoteCard.jsx";

const CardWrapper = () => {
  const [notes, setNotes] = useState(false);
  const [loading, setLoading] = useState(false);
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

        setNotes(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className=" lg:w-[80%] overflow-x-hidden w-[100%] flex justify-center items-start -z-10 min-h-[90vh] top-[10vh] absolute right-0 ">
      <div className=" flex mt-8 mb-8 flex-wrap gap-4 items-center justify-center lg:justify-start  w-[95%]  ">
        {loading ? (
          <div>Loading</div>
        ) : (
          <>
            {notes[0] &&
              notes.map((note) => (
                <>
                  <NoteCard
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

export default CardWrapper;
