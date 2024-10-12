"use client";

import Loader from "@/components/Loader.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Card } from "@/components/ui/card.jsx";
import axios from "axios";

import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { PiTrashSimpleFill } from "react-icons/pi";

const page = ({ params: { id } }) => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [contentEditable, setContentEditable] = useState(true);
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
          {/* i wanna hide the slider of this div  */}
          <div className=" h-[80%] scrollbar-hidden  overflow-auto w-[85%] ">
            <h1
              contentEditable={contentEditable}
              onDoubleClick={() => setContentEditable(!contentEditable)}
              suppressContentEditableWarning
              className=" font-roboto_mono  md:text-2xl font-bold text-xl lg:text-3xl outline-none  "
            >
              {note.title}
            </h1>
            <h1
              onDoubleClick={() => setContentEditable(!contentEditable)}
              contentEditable={contentEditable}
              suppressContentEditableWarning
              className=" mt-4 outline-none  md:text-base text-xm lg:text-base font-roboto_mono "
            >
              {note.content}
            </h1>
          </div>
          <div className=" ml-6 h-[80%] flex justify-end items-center flex-col ">
            {contentEditable && (
              <Button className=" mt-5 font-roboto_mono  font-bold" size="icon">
                <FaSave size={20} />
              </Button>
            )}
            <Button
              onClick={() => setContentEditable(!contentEditable)}
              className=" mt-5 font-roboto_mono  font-bold"
              variant="outline"
              size="icon"
            >
              <MdModeEditOutline size={20} />
            </Button>
            <Button
              className=" mt-5 font-roboto_mono  font-bold"
              variant="outline"
              size="icon"
            >
              <PiTrashSimpleFill size={20} />
            </Button>
          </div>
        </Card>
      </div>
    )
  );
};

export default page;
