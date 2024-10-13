"use client";

import { Button } from "@/components/ui/button.jsx";
import { Card } from "@/components/ui/card.jsx";
import { Skeleton } from "@/components/ui/skeleton.jsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.jsx";
import { useToast } from "@/hooks/use-toast.js";
import axios from "axios";

import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { PiTrashSimpleFill } from "react-icons/pi";

const page = ({ params: { id } }) => {
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

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
        setTitle(data.title);
        setContent(data.content);

        setLoading(false);
        console.log(data);
      } catch (err) {
        setLoading(false);
        toast({
          title: "Error while fetching note",
          description: err.message,
        });
        console.log(err.message);
      }
    };

    fetchNote();
  }, []);
  const deleteNote = async () => {
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `http://localhost:5000/api/notes/${id}`,
        {
          withCredentials: true,
        }
      );
      setNote(data);
      setLoading(false);
      toast({
        title: "Note Deleted",
        description: data.message,
      });
      console.log(data);
    } catch (err) {
      setLoading(false);
      toast({
        title: "Error while deleting note",
        description: err.message,
      });
      console.log(err.message);
    }
  };
  const saveNote = async () => {
    try {
      setUpdateLoading(true);
      const { data } = await axios.put(
        `http://localhost:5000/api/notes/${id}`,
        {
          title,
          content,
        },
        {
          withCredentials: true,
        }
      );
      setNote(data);
      console.log(data);

      setUpdateLoading(false);
      setTitle(data.title);
      setContent(data.content);
      toast({
        title: "Note Updated",
        description: data.message,
      });
      console.log(data);
    } catch (err) {
      setUpdateLoading(false);
      toast({
        title: "Error while updating note",
        description: err.message,
      });
      console.log(err.message);
    }
  };

  return loading ? (
    <div className=" flex w-[100%] items-center justify-center lg:w-[80%] h-[90vh]  lg:ml-[20%]  ">
      <Skeleton className=" mt-[20vh]  rounded-md lg:w-[80%] h-[80%] w-[90%]" />
    </div>
  ) : (
    note && (
      <div className=" flex w-[100%] items-center justify-center lg:w-[80%] h-[90vh]  lg:ml-[20%]  ">
        <Card className=" mt-[20vh]  flex justify-center items-center lg:w-[80%] h-[80%] w-[90%] ">
          {/* i wanna hide the slider of this div  */}
          <div className=" h-[80%] scrollbar-hidden flex flex-col gap-3  overflow-auto w-[85%] ">
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              suppressContentEditableWarning
              className="font-roboto_mono scrollbar-hidden md:text-2xl font-bold text-xl h-auto resize-none lg:text-3xl outline-none focus:outline-none focus:ring-0 bg-transparent focus:border-transparent"
            />

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              suppressContentEditableWarning
              className="mt-4 font-roboto_mono scrollbar-hidden md:text-base text-xm h-[70%] lg:text-base outline-none focus:outline-none resize-none focus:ring-0 bg-transparent focus:border-transparent"
            />
          </div>
          <div className=" ml-6 h-[80%] flex justify-end items-center flex-col ">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    onClick={saveNote}
                    className=" mt-5 font-roboto_mono  font-bold"
                    size="icon"
                  >
                    <FaSave size={20} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Save</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button
              onClick={deleteNote}
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
