import { reloadState } from "@/app/(states)/reloadState.js";
import { useToast } from "@/hooks/use-toast.js";
import axios from "axios";
import Link from "next/link.js";
import { useState } from "react";
import { PiTrashSimpleFill } from "react-icons/pi";
import { useRecoilState } from "recoil";
import { Button } from "./ui/button.jsx";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog.jsx";

const SideBtn = ({ className, text, itemsCount }) => {
  const [show, setShow] = useState(false);
  const [reload, setReload] = useRecoilState(reloadState);

  const { toast } = useToast();
  const deleteGroup = async () => {
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_API}/notes/groups/${text}`,
        {
          withCredentials: true,
        }
      );
      console.log(data);

      setReload(!reload);
      toast({
        title: "Group Deleted",
        description: data.message,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err?.response?.data?.message || err.message,
      });
      console.log(err.message);
    }
  };
  return (
    <Link
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      className="  hover:bg-border ease-in duration-100 group border-b-[1px] flex gap-2 justify-between items-center border-border h-14 font-[500] cursor-pointer flex-shrink-0 w-full"
      href={`/${text}`}
    >
      <div className=" flex ml-2 gap-2 justify-center items-center ">
        <div className=" ease-in duration-100 group-hover:border-foreground border-border border-[1px] w-4 h-4 rounded-full "></div>
        <span>{text}</span>
      </div>
      {!show ? (
        <Button className=" mr-2 font-bold " variant="outline" size="sm">
          {itemsCount > 9 ? `9+` : `0${itemsCount}`}
        </Button>
      ) : (
        <Dialog>
          <DialogTrigger>
            <Button
              className=" mr-2 hover:bg-border ease-in duration-100 group-hover:border-foreground border-border border-[1px] font-bold "
              variant="outline"
              size="icon"
            >
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
                deleteGroup();
                setShow(!show);
              }}
              className="cursor-pointer  "
            >
              Yes
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </Link>
  );
};

export default SideBtn;
