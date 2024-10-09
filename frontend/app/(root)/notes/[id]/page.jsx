"use client";

import Loader from "@/components/Loader.jsx";
import { Card } from "@/components/ui/card.jsx";
import axios from "axios";
import { useEffect, useState } from "react";

const page = ({ params: { id } }) => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:5000/api/notes/${id}`,
          {
            withCredentials: true,
          }
        );
        setNote(data);
        setLoading(false);
        console.log(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchNote();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    note && (
      <div className=" flex w-[100%] items-center justify-center lg:w-[80%] h-[90vh]  lg:ml-[20%]  ">
        <Card className=" mt-[20vh]  flex justify-center items-center lg:w-[80%] h-[80%] w-[90%] ">
          <div className=" h-[80%] w-[85%] ">
            <h1 className=" font-roboto_mono md:text-2xl font-bold text-xl lg:text-3xl ">
              {note.title}
            </h1>
            <h1 className=" mt-4 md:text-base text-xm lg:text-base font-roboto_mono ">
              {note.content}
            </h1>
          </div>
        </Card>
      </div>
    )
  );
};

export default page;
