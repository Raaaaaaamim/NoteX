"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import NoteCard from "./NoteCard.jsx";

const CardWrapper = () => {
  const [notes, setNotes] = useState(false);
  useEffect(() => {
    const fetchNotes = async () => {
      const { data } = await axios.get("http://localhost:5000/api/notes/all", {
        withCredentials: true,
      });
      console.log(data);
    };
    fetchNotes();
  }, []);

  return (
    <div className=" lg:w-[80%] overflow-x-hidden w-[100%] flex justify-center items-start -z-10 min-h-[90vh] top-[10vh] absolute right-0 ">
      <div className=" flex mt-8 mb-8 flex-wrap gap-4 items-center justify-center lg:justify-start  w-[95%]  ">
        <NoteCard
          title={"Note Title"}
          category="personal"
          note="Cows are domesticated mammals that are commonly raised for their milk,
  meat, and hides. They are known for their distinctive appearance, with
  their large bodies, long tails, and floppy ears."
        />
        <NoteCard
          title={"Naruto the last ninja"}
          category="anime"
          note="Cows are domesticated mammals that are commonly raised for their milk,
  meat, and hides. They are known for their distinctive appearance, with
  their large bodies, long tails, and floppy ears."
        />
      </div>
    </div>
  );
};

export default CardWrapper;
